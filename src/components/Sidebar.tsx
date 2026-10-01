"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ScanLine,
  FolderOpen,
  Sparkles,
  FileStack,
  Settings,
  Search,
  Star,
  Clock,
  Cloud,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { storage } from "@/data/mock";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/scan", label: "Scan", icon: ScanLine },
  { href: "/documents", label: "Documents", icon: FolderOpen },
  { href: "/ai", label: "AI Assistant", icon: Sparkles },
  { href: "/pdf-tools", label: "PDF Tools", icon: FileStack },
];

const secondaryItems = [
  { href: "/documents?filter=favorites", label: "Favorites", icon: Star },
  { href: "/documents?filter=recent", label: "Recent", icon: Clock },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const usedPercent = (storage.used / storage.total) * 100;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400">
          <ScanLine className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">Grok Scanner</span>
            <span className="text-[10px] text-muted">AI Document Platform</span>
          </div>
        )}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 pt-4">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted">
            <Search className="h-4 w-4 shrink-0" />
            <span>Search documents...</span>
            <kbd className="ml-auto rounded border border-border bg-background px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </div>
        </div>
      )}

      {/* Main Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className={cn("mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted", collapsed && "text-center")}>
          {collapsed ? "•" : "Main"}
        </p>
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted hover:bg-card hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("h-5 w-5 shrink-0", active && "text-primary")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        <p className={cn("mb-2 mt-6 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted", collapsed && "text-center")}>
          {collapsed ? "•" : "Library"}
        </p>
        {secondaryItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted hover:bg-card hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Storage */}
      <div className="border-t border-border p-3">
        {!collapsed ? (
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted">
                <Cloud className="h-3.5 w-3.5" />
                Storage
              </span>
              <span className="font-medium">
                {storage.used} / {storage.total} {storage.unit}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                style={{ width: `${usedPercent}%` }}
              />
            </div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-muted">
              <Shield className="h-3 w-3" />
              Encrypted • Private
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Cloud className="h-5 w-5 text-muted" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs text-muted hover:bg-card hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /> Collapse</>}
        </button>
      </div>
    </aside>
  );
}
