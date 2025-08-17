import bcrypt

def hash_password(password: str) -> str:
    satsalt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), satsalt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))