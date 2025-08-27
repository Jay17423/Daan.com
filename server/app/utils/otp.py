import random, string

def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))
