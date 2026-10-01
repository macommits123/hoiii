"use client";

import Header from "@/components/Header";
import DocumentCard from "@/components/DocumentCard";
import { documents, folders } from "@/data/mock";
import { Search, Filter, Grid3X3, List, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DocumentsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");

  const filtered = documents.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      (d.ocrPreview && d.ocrPreview.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Documents" subtitle={`${documents.length} documents in your library`} />

      <div className="flex-1 p-6">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by name, OCR text, tags, amounts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-muted hover:text-foreground">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <div className="flex rounded-lg border border-border bg-card">
            <button
              onClick={() => setView("grid")}
              className={cn("p-2.5", view === "grid" ? "text-primary" : "text-muted")}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn("p-2.5", view === "list" ? "text-primary" : "text-muted")}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Folder chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
            All
          </button>
          {folders.map((f) => (
            <button
              key={f.id}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted hover:text-foreground"
            >
              {f.name} ({f.count})
            </button>
          ))}
        </div>

        {/* Grid */}
        {view === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition hover:bg-card-hover"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl"
                  style={{ background: `${doc.thumbnailColor}22` }}
                >
                  📄
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{doc.name}</p>
                  <p className="truncate text-xs text-muted">{doc.ocrPreview}</p>
                </div>
                <span className="text-xs text-muted">{doc.pages}p</span>
                <span className="text-xs text-muted">{doc.size}</span>
                <span className="text-xs text-muted">{doc.date}</span>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted">No documents match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
