## backend

- インストール

```bash
cd backend
pnpm install
```

- 起動

```bash
docker-compose up
```

- Redis のデータ確認

```bash
docker exec -i -t redis /bin/bash
redis-cli
LRANGE chat_messages 0 -1
```

## frontend

- インストール

```bash
cd frontend
pnpm install
```

- 起動

```bash
pnpm dev
```
