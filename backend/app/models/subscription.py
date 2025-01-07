from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, Integer
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    stripe_subscription_id = Column(String, unique=True)
    plan = Column(String)  # 'free', 'pro', 'influence'
    status = Column(String)  # 'active', 'canceled', 'past_due'
    current_period_start = Column(DateTime)
    current_period_end = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    canceled_at = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)

    # Relations
    user = relationship("User", back_populates="subscription")