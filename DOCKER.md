# Docker Setup (TaskIQ)

## Services
- `mongo`: MongoDB database
- `backend`: Express API on port `5000`
- `frontend`: Vite preview serving React build on port `5173`

## Run everything
```bash
docker compose up --build
```

Then open:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api-v1

## Stop
```bash
docker compose down
```

## Reset database volume
```bash
docker compose down -v
```

## Notes
- Frontend calls backend directly using `VITE_API_URL=http://localhost:5000/api-v1`.
- Backend uses Docker env values from `docker-compose.yml`.
- Mongo data persists in named volume `mongo_data`.
