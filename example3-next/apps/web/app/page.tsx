import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import { Chat } from "./chat";

import { SocketProvider } from "./contexts/SocketProvider";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <SocketProvider>
        <Chat />
      </SocketProvider>
    </main>
  );
}
