

from dotenv import load_dotenv
load_dotenv()

from Crypto.Cipher import AES

import os
import base64
SECRET_KEY = os.getenv("SECRET_KEY") 
if SECRET_KEY is None:
    raise ValueError("SECRET_KEY not set in .env")
SECRET_KEY = SECRET_KEY.encode()

def decriptingPasswords(ciphertext_b64, iv_b64):
    iv = base64.b64decode(iv_b64)
    ciphertext = base64.b64decode(ciphertext_b64)

    cipher = AES.new(SECRET_KEY, AES.MODE_CBC, iv)
    decrypted = cipher.decrypt(ciphertext)
    
    padding_len = decrypted[-1]
    return decrypted[:-padding_len].decode("utf-8")