import { History, MessageSquare, PlusCircle, Trash2, X } from "lucide-react";
import type { ChatConversation, SupportedLanguage } from "@/types/chat";
import { getChatTranslation } from "@/i18n";

export function ChatHistoryDrawer({
  isOpen,
  onClose,
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  language,
}: {
  isOpen: boolean;
  onClose: () => void;
  conversations: ChatConversation[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  language: SupportedLanguage;
}) {
  if (!isOpen) return null;

  const t = getChatTranslation(language);

  // Group conversations by Today, Yesterday, and Older
  const now = new Date();
  const todayStr = now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  const groups: {
    today: ChatConversation[];
    yesterday: ChatConversation[];
    older: ChatConversation[];
  } = {
    today: [],
    yesterday: [],
    older: [],
  };

  conversations.forEach((c) => {
    const d = new Date(c.updatedAt || c.createdAt).toDateString();
    if (d === todayStr) {
      groups.today.push(c);
    } else if (d === yesterdayStr) {
      groups.yesterday.push(c);
    } else {
      groups.older.push(c);
    }
  });

  const renderGroup = (title: string, list: ChatConversation[]) => {
    if (list.length === 0) return null;

    return (
      <div className="space-y-1.5 mb-4">
        <p className="px-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        {list.map((conv) => {
          const isActive = conv.id === activeId;
          return (
            <div
              key={conv.id}
              className={`group flex items-center justify-between gap-2 rounded-2xl p-2.5 transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground font-black shadow-xs"
                  : "bg-background hover:bg-secondary border border-border text-foreground font-semibold"
              }`}
              onClick={() => {
                onSelectConversation(conv.id);
                onClose();
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MessageSquare className="size-4 shrink-0 opacity-70" />
                <span className="truncate text-xs sm:text-sm">{conv.title}</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conv.id);
                }}
                className={`opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-opacity hover:bg-destructive/20 text-destructive ${
                  isActive ? "text-primary-foreground hover:bg-black/20" : ""
                }`}
                title={t.deleteChat}
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-card border-l-2 border-border p-4 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="border-b pb-3 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-lg text-foreground">
            <History className="size-5 text-primary" />
            <span>{t.chatHistory}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border p-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Action: New Chat */}
        <button
          type="button"
          onClick={() => {
            onNewChat();
            onClose();
          }}
          className="mb-4 w-full rounded-2xl bg-primary py-2.5 px-4 text-sm font-black text-primary-foreground shadow-xs hover:bg-primary/95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlusCircle className="size-4" />
          <span>{t.newChat}</span>
        </button>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto pr-1">
          {conversations.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground font-medium">
              {t.noHistory}
            </div>
          ) : (
            <>
              {renderGroup(t.today, groups.today)}
              {renderGroup(t.yesterday, groups.yesterday)}
              {renderGroup(t.older, groups.older)}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t text-center text-xs text-muted-foreground">
          ASHA Saathi • Local Offline Memory
        </div>
      </div>
    </>
  );
}
