# Scheduling Task Management API Server

## Run the Application

```bash
docker compose up --build
```

The terminal should output something like following:

```
[nodemon] 3.1.0
express_container   | [nodemon] to restart at any time, enter `rs`
express_container   | [nodemon] watching path(s): *.*
express_container   | [nodemon] watching extensions: ts,json
express_container   | [nodemon] starting `ts-node src/index.ts`
express_container   | [2024-04-28T12:04:19.711Z] [info] [index.ts]: [server]: Server is running at http://localhost:3001
```

You can use postman to GET /v1/schedules, it will return [] with 200 status code.
