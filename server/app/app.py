from app import note
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(note.router, tags=['Notes'], prefix='/api/notes')


@app.get("/api/healthchecker")
def root():
    return {"message": "Welcome to FastAPI with Pymongo"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)