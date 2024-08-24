import { Chat } from "./chat";
import { SocketProvider } from "./contexts/SocketProvider";

export default async function Home() {
  return (
    <main className="flex min-h-screen items-center w-full justify-center">
      <SocketProvider>
        <Chat />
      </SocketProvider>
    </main>
  );
}
