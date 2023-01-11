# Python server and two ReactJS Clients - Demo

## What will you learn with this demo ?
- How to build a python API server using FastAPI
- How to create CRUD operations using mongodb as storage
- How to configure a docker-compose to pull and running the mongodb docker container
- How to use uvicorn to launch python server
- How to read deltas of data offering a pagination service capability
- How to ensure only allowed origins of clients can access to the server
- How to create a web client using reactJS for CRUD operations plus pagination
- How to create a web cleint using reactJS and Typecript  for CRUD operations plus pagination

# Requirements
## Server
- Pyhton 3.11.1+
- Pip 22.3.1+ (for python modules)
- Uvicorn (pip install uvicorn)

## Client 
- NodeJS 8.19.2
- Yarn 1.22.19 (only for ReactJSTypescript)

# How to run 
# Server - python
Under the server directory run the following commands:
- docker-compose up
- uvicorn app.app:app --reload

# Client - ReactJS
Under the client/ReactJS run the following commands
- npm install
- npm start

# Client - ReactJS&Typescript
Under the client/ReactJSTypescript run the following commands
- npm install
- yarn dev

# How to access it
# Server
- http://127.0.0.1:8000/api/notes
# Client ReactJS
- http://localhost:3000/
# Client ReactJS&Typescript
- http://localhost:3001/
