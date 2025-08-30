import cloudinary.uploader
from fastapi import UploadFile

def upload_image(file: UploadFile) -> str:
    result = cloudinary.uploader.upload(file.file, folder="fastapi_posts")
    return result["secure_url"]
