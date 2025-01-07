from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, Subscription
from ..config import settings
import stripe
from datetime import datetime

router = APIRouter()

# Configuration Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

@router.post("/create-subscription")
async def create_subscription(
    plan_type: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Vérifier si l'utilisateur a déjà un abonnement actif
        existing_sub = db.query(Subscription).filter(
            Subscription.user_id == current_user.id,
            Subscription.status == "active"
        ).first()
        
        if existing_sub:
            raise HTTPException(status_code=400, detail="Vous avez déjà un abonnement actif")

        # Créer ou récupérer le client Stripe
        if not current_user.stripe_customer_id:
            customer = stripe.Customer.create(
                email=current_user.email,
                metadata={"user_id": current_user.id}
            )
            current_user.stripe_customer_id = customer.id
            db.commit()
        
        # Sélectionner le bon prix selon le plan
        price_id = None
        if plan_type == "pro":
            price_id = settings.STRIPE_PRICE_ID_PRO
        elif plan_type == "influence":
            price_id = settings.STRIPE_PRICE_ID_INFLUENCE
        else:
            raise HTTPException(status_code=400, detail="Plan invalide")

        # Créer la session de paiement
        session = stripe.checkout.Session.create(
            customer=current_user.stripe_customer_id,
            payment_method_types=["card"],
            line_items=[{"price": price_id, "quantity": 1}],
            mode="subscription",
            success_url=f"{settings.FRONTEND_URL}/dashboard?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{settings.FRONTEND_URL}/pricing",
        )

        return {"session_id": session.id}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    try:
        # Récupérer le payload et vérifier la signature
        payload = await request.body()
        sig_header = request.headers.get("stripe-signature")
        
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except stripe.error.SignatureVerificationError:
            raise HTTPException(status_code=400, detail="Signature invalide")

        # Gérer les événements
        if event.type == "customer.subscription.created":
            subscription = event.data.object
            # Créer l'abonnement dans notre base
            db_sub = Subscription(
                user_id=subscription.metadata.user_id,
                stripe_customer_id=subscription.customer,
                stripe_subscription_id=subscription.id,
                plan_type=subscription.items.data[0].price.metadata.plan_type,
                status="active",
                current_period_start=datetime.fromtimestamp(subscription.current_period_start),
                current_period_end=datetime.fromtimestamp(subscription.current_period_end)
            )
            db.add(db_sub)
            db.commit()

        elif event.type == "customer.subscription.updated":
            subscription = event.data.object
            # Mettre à jour l'abonnement
            db_sub = db.query(Subscription).filter(
                Subscription.stripe_subscription_id == subscription.id
            ).first()
            if db_sub:
                db_sub.status = subscription.status
                db_sub.current_period_end = datetime.fromtimestamp(subscription.current_period_end)
                db_sub.cancel_at_period_end = subscription.cancel_at_period_end
                db.commit()

        return {"status": "success"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/cancel-subscription")
async def cancel_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Trouver l'abonnement actif
        subscription = db.query(Subscription).filter(
            Subscription.user_id == current_user.id,
            Subscription.status == "active"
        ).first()

        if not subscription:
            raise HTTPException(status_code=404, detail="Aucun abonnement actif trouvé")

        # Annuler l'abonnement dans Stripe
        stripe.Subscription.modify(
            subscription.stripe_subscription_id,
            cancel_at_period_end=True
        )

        # Mettre à jour notre base
        subscription.cancel_at_period_end = True
        db.commit()

        return {"status": "success", "message": "Abonnement annulé à la fin de la période"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 