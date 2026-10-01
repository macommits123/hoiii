"use client";

import Header from "@/components/Header";
import { documents } from "@/data/mock";
import {
  Sparkles,
  Send,
  FileText,
  Bot,
  User,
  Paperclip,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Summarize this document",
  "Extract all dates and amounts",
  "Find the expiry date",
  "Translate to Nepali",
  "Compare with previous version",
  "Generate an email based on this",
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Hello! I'm your AI Document Assistant. Upload or select a document and ask me anything — summaries, extractions, translations, comparisons, and more. All answers are grounded in your documents.",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      let reply = "";
      const lower = content.toLowerCase();
      if (lower.includes("summar")) {
        reply = `**Summary of ${selectedDoc.name}:**\n\nThis document is a ${selectedDoc.type.replace("_", " ")} containing key information extracted via OCR.\n\n• ${selectedDoc.ocrPreview}\n• Pages: ${selectedDoc.pages}\n• Tags: ${selectedDoc.tags.join(", ")}\n\nI can dive deeper into any section if you'd like.`;
      } else if (lower.includes("expir") || lower.includes("date")) {
        reply = `From the OCR analysis of **${selectedDoc.name}**:\n\n${selectedDoc.ocrPreview}\n\nI detected relevant date fields. Would you like me to set an expiry reminder?`;
      } else if (lower.includes("translat")) {
        reply = `I can translate the full document or selected text. Supported: English ↔ Nepali, Hindi, Chinese, Japanese, Korean, Arabic, and major European languages.\n\nPlease specify the target language.`;
      } else if (lower.includes("extract") || lower.includes("amount") || lower.includes("name")) {
        reply = `Extracted entities from **${selectedDoc.name}**:\n\n${selectedDoc.ocrPreview}\n\nAdditional fields detected via AI classification:\n• Document type: ${selectedDoc.type}\n• Folder: ${selectedDoc.folder}\n• Language: Auto-detected`;
      } else {
        reply = `Based on **${selectedDoc.name}**, here's what I found related to your question:\n\n"${content}"\n\n${selectedDoc.ocrPreview}\n\nFeel free to ask for a summary, specific extractions, translation, or comparison with another document.`;
      }
      setMessages((m) => [
        ...m,
        { id: (Date.now() + 1).toString(), role: "assistant", content: reply },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header title="AI Assistant" subtitle="Ask anything about your documents" />

      <div className="flex flex-1 overflow-hidden">
        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "border border-border bg-card"
                  )}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-border">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 border-t border-border px-6 py-3">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted transition hover:border-primary/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
              <button className="rounded-lg p-2 text-muted hover:text-foreground">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about your documents..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <button
                onClick={() => send()}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-hover"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Document context sidebar */}
        <aside className="hidden w-72 shrink-0 border-l border-border bg-sidebar p-4 lg:block">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <Sparkles className="h-3.5 w-3.5" />
            Context Document
          </h3>
          <div className="space-y-2">
            {documents.slice(0, 5).map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={cn(
                  "flex w-full items-start gap-2 rounded-lg border p-2.5 text-left transition",
                  selectedDoc.id === doc.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:bg-card-hover"
                )}
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{doc.name}</p>
                  <p className="truncate text-[10px] text-muted">{doc.type}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-muted">
            AI answers are grounded in the selected document. Select another to change context.
          </p>
        </aside>
      </div>
    </div>
  );
}
