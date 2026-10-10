import { createFileRoute } from "@tanstack/react-router";
import { ChatWindow } from "@/components/chat/ChatWindow";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "आशा साथी — ASHA Saathi (AI कार्य सहाय्यक)" },
      {
        name: "description",
        content:
          "ASHA Saathi is an AI assistant supporting ASHA workers with maternal care, child health, vaccination, danger signs, nutrition, and daily fieldwork guidance.",
      },
      { property: "og:title", content: "आशा साथी — ASHA Saathi" },
      {
        property: "og:description",
        content:
          "AI assistant for ASHA workers in Marathi, Hindi, and English.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  return <ChatWindow />;
}
