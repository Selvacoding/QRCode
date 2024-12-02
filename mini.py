from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import qrcode
import os
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL, you can use ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)



@app.post("/generate_qr/")
async def generate_qr(text: str = Form(...)):
    # Generate QR code
    img = qrcode.make(text)
    file_path = Path("generated_qr.png")
    img.save(file_path)

    # Return the QR code image as a response
    return FileResponse(path=file_path, filename="generated_qr.png")

@app.get("/")
def read_root():
    return {"message": "QR Code Generator API"}

