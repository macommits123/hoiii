import Header from "@/components/Header";
import DocumentCard from "@/components/DocumentCard";
import { documents, folders, tools, storage } from "@/data/mock";
import Link from "next/link";
import {
  ScanLine,
  Sparkles,
  FileStack,
  Folder,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function Dashboard() {
  const recent = documents.slice(0, 6);
  const usedPercent = Math.round((storage.used / storage.total) * 100);

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Dashboard" subtitle="Welcome back to Grok Scanner" />

      <div className="flex-1 space-y-8 p-6">
        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-indigo-500/10 via-card to-cyan-500/10 p-8">
          <div className="relative z-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight">
                Scan smarter with <span className="gradient-text">AI</span>
              </h2>
              <p className="max-w-md text-sm text-muted">
                Auto-detect edges, enhance images, extract text in multiple languages,
                and organize everything automatically.
              </p>
            </div>
            <Link
              href="/scan"
              className="scan-pulse relative flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-primary-hover"
            >
              <ScanLine className="h-6 w-6" />
              Scan Document
            </Link>
          </div>
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Quick Tools</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {tools.map((tool) => {
              const Icon =
                tool.id === "ocr"
                  ? Zap
                  : tool.id === "pdf"
                  ? FileStack
                  : tool.id === "ai"
                  ? Sparkles
                  : ScanLine;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition hover:border-primary/40 hover:bg-card-hover"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">{tool.name}</span>
                  <span className="text-[10px] text-muted">{tool.description}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Recent</h3>
            <Link
              href="/documents"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recent.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Folders</h3>
              <Link href="/documents" className="text-xs text-primary hover:underline">
                Manage
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {folders.map((folder) => (
                <Link
                  key={folder.id}
                  href={`/documents?folder=${folder.id}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition hover:border-primary/30 hover:bg-card-hover"
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${folder.color}22` }}
                  >
                    <Folder className="h-4 w-4" style={{ color: folder.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{folder.name}</p>
                    <p className="text-[11px] text-muted">{folder.count} docs</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">Storage</h3>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold tracking-tight">
                    {storage.used}
                    <span className="text-lg font-normal text-muted"> / {storage.total} GB</span>
                  </p>
                  <p className="text-xs text-muted">{usedPercent}% used</p>
                </div>
              </div>
              <div className="mb-4 h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  style={{ width: `${usedPercent}%` }}
                />
              </div>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex justify-between">
                  <span>Documents</span>
                  <span className="text-foreground">1.8 GB</span>
                </li>
                <li className="flex justify-between">
                  <span>Images</span>
                  <span className="text-foreground">0.4 GB</span>
                </li>
                <li className="flex justify-between">
                  <span>Trash</span>
                  <span className="text-foreground">0.2 GB</span>
                </li>
              </ul>
              <button className="mt-4 w-full rounded-lg border border-border py-2 text-xs font-medium transition hover:bg-card-hover">
                Manage storage
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
