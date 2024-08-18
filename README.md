## backend

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

```bash
pnpm install
pnpm dev
```
