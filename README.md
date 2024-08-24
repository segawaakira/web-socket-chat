## 概要

- Web Socket と Redis を利用した、チャットアプリ
- リアルタイムにメッセージのやり取りができて、入力中のユーザー名が表示されます

---

## スクリーンショット

---

## 使用技術

- TypeScript
- Next.js
- shadcn/ui
- Web Socket
- Redis
- Docker
- express

---

## インストール 〜 起動

### backend

- インストール

```bash
cd backend
pnpm install
```

- 起動

```bash
docker-compose up
```

- URL
  http://localhost:3000/

- Redis のデータ確認

```bash
docker exec -i -t redis /bin/bash
redis-cli
LRANGE chat_messages 0 -1
```

### frontend

- インストール

```bash
cd frontend
pnpm install
```

- 起動

```bash
pnpm dev
```

- URL
  http://localhost:3333/
