"use client";

import { FileText, Star, MoreVertical } from "lucide-react";
import { Document } from "@/data/mock";


const typeIcons: Record<string, string> = {
  passport: "🛂",
  id: "🪪",
  invoice: "🧾",
  receipt: "🧾",
  certificate: "🎓",
  contract: "📜",
  business_card: "💼",
  notes: "📝",
  form: "📋",
  other: "📄",
};

export default function DocumentCard({ doc }: { doc: Document }) {
  return (
    <div className="doc-card group relative flex flex-col rounded-xl border border-border bg-card p-4 cursor-pointer">
      {/* Thumbnail */}
      <div
        className="mb-3 flex h-28 items-center justify-center rounded-lg"
        style={{ background: `linear-gradient(135deg, ${doc.thumbnailColor}22, ${doc.thumbnailColor}11)` }}
      >
        <span className="text-4xl">{typeIcons[doc.type] || "📄"}</span>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-medium leading-tight">{doc.name}</h3>
          {doc.favorite && <Star className="h-3.5 w-3.5 shrink-0 fill-warning text-warning" />}
        </div>
        {doc.ocrPreview && (
          <p className="mb-2 line-clamp-1 text-[11px] text-muted">{doc.ocrPreview}</p>
        )}
        <div className="flex flex-wrap gap-1">
          {doc.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-border/60 px-1.5 py-0.5 text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[11px] text-muted">
        <span className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          {doc.pages} page{doc.pages > 1 ? "s" : ""}
        </span>
        <span>{doc.size}</span>
        <span>{doc.date}</span>
      </div>

      {/* Hover actions */}
      <button className="absolute right-2 top-2 rounded-md bg-background/80 p-1 opacity-0 transition group-hover:opacity-100">
        <MoreVertical className="h-4 w-4 text-muted" />
      </button>
    </div>
  );
}
