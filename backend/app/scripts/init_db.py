from datetime import datetime
from uuid import uuid4
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from ..models.models import Base, User

# Récupérer l'URL de la base de données depuis les variables d'environnement
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/football_db")

def init_db():
    # Créer le moteur de base de données
    engine = create_engine(DATABASE_URL)
    
    # Créer toutes les tables
    Base.metadata.create_all(bind=engine)
    
    # Créer une session
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        # Vérifier si l'utilisateur root existe déjà
        root_user = db.query(User).filter(User.email == "root@admin.fr").first()
        
        if not root_user:
            # Créer l'utilisateur root
            root_user = User(
                id=str(uuid4()),
                email="root@admin.fr",
                hashed_password=User.get_password_hash("root"),
                is_active=True,
                is_superuser=True,
                created_at=datetime.utcnow()
            )
            db.add(root_user)
            db.commit()
            print("Utilisateur root créé avec succès")
        else:
            print("L'utilisateur root existe déjà")
            
    except Exception as e:
        print(f"Erreur lors de l'initialisation de la base de données: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Initialisation de la base de données...")
    init_db()
    print("Initialisation terminée") 