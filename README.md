## 概要

- Web Socket と Redis を利用した、チャットアプリ
- リアルタイムにメッセージのやり取りができて、入力中のユーザー名が表示されます

---

## スクリーンショット

- ログイン画面
    <img width="1632" alt="スクリーンショット 2024-08-24 17 18 55" src="https://github.com/user-attachments/assets/9f15c284-d6af-47a4-b2e7-c4af7a3d4d78">
- チャット画面
    異なるブラウザ間で、入力中のユーザー名が表示され、リアルタイムにメッセージのやり取りが可能。
    ![gif](https://github.com/user-attachments/assets/44260173-95a6-4b34-8594-534522262aa9)

- データはRedisに保存されています
    <img width="1070" alt="スクリーンショット 2024-08-24 17 25 05" src="https://github.com/user-attachments/assets/4b680d08-0572-4ca5-b814-280a12edd4fb">

---

## 主な使用技術

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
