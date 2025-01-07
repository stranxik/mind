from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base, User
from app.config import settings

# Create database engine
engine = create_engine(settings.DATABASE_URL)

# Create all tables
Base.metadata.create_all(engine)

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

def init_db():
    try:
        # Check if root user exists
        root_user = db.query(User).filter(User.email == "root@admin.fr").first()
        
        if not root_user:
            # Create root user if it doesn't exist
            root_user = User(
                email="root@admin.fr",
                nickname="Admin",
                hashed_password=User.get_password_hash("root"),  # Utilisation de la méthode de hachage
                is_active=True,
                is_superuser=True
            )
            db.add(root_user)
            db.commit()
            print("Root user created successfully")
        else:
            # Update existing root user password and nickname
            root_user.hashed_password = User.get_password_hash("root")
            root_user.nickname = "Admin"
            db.commit()
            print("Root user updated")
            
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db() 