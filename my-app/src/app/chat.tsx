"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSocket } from "./contexts/SocketProvider";
import { Login } from "./login";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib";

const schema = z.object({
  message: z.string().min(1, { message: "1文字以上入力してください" }),
});

type FormData = z.infer<typeof schema>;

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export const Chat = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { timestamp: string; name: string; message: string }[]
  >([]);
  const [typings, setTypings] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const socket = useSocket();

  useEffect(() => {
    setName(getCookie("name"));
  }, []);
  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "typing") {
        setTypings((prevTypings) => [...prevTypings, message.name]);
        setTimeout(() => {
          setTypings((prevTypings) =>
            prevTypings.filter((typingName) => typingName !== message.name)
          );
        }, 1000);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            timestamp: message.timestamp,
            name: message.name,
            message: message.message,
          },
        ]);
        form.reset();
      }
    };

    return () => {
      socket.close();
    };
  }, [socket]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({ type: "message", name, message: data.message })
      );
    }
  };

  const handleTyping = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "typing", name }));
    }
  };

  const handleLogout = () => {
    document.cookie = "name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.reload();
  };

  useEffect(() => {
    if (!isTyping) {
      setIsTyping(true);
      handleTyping();
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  }, [form.watch("message")]);

  return loading ? (
    <p>Loading...</p>
  ) : !name ? (
    <Login />
  ) : (
    <div className="flex flex-col justify-between min-h-screen h-screen p-4 w-full max-w-96 relative">
      <Button
        type="button"
        variant="ghost"
        className="mb-4"
        onClick={handleLogout}
      >
        ログアウト
      </Button>
      <div className="w-full h-full overflow-scroll mb-32">
        <ul className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <li key={index}>
              <p className="text-xs">
                {new Date(msg.timestamp).toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-xs">{msg.name}</p>
              <p className="text-sm">{msg.message}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 p-4 left-0 w-full">
        <p className={cn("py-2", typings.length > 0 ? "visible" : "invisible")}>
          入力中: {typings.join(", ")}
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 items-end w-full justify-between"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormMessage />
                  <FormControl>
                    <Textarea placeholder="メッセージを入力" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">送信</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
