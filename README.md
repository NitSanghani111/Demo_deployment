# Task Manager - Simple Demo App

A simplified full-stack demo application using React (Vite), FastAPI, and MySQL.

## Architecture

- **Frontend**: React + Vite (Port 3000)
- **Backend**: FastAPI (Port 8000)
- **Database**: MySQL 8 (Internal)

## Quick Start

1.  **Run the Application**:
    ```bash
    docker-compose up --build -d
    ```

2.  **Access the App**:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## Project Structure

- `frontend/`: React source code.
- `backend/`: FastAPI source code.
- `docker-compose.yml`: Orchestration.
- `.env`: Environment settings.
