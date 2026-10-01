"use client";

import Header from "@/components/Header";
import { scanModes } from "@/data/mock";
import {
  Camera,
  Upload,
  Image as ImageIcon,
  FileText,
  CreditCard,
  BookOpen,
  Car,
  Contact,
  Receipt,
  FileSpreadsheet,
  Book,
  NotebookPen,
  Presentation,
  ClipboardList,
  Award,
  QrCode,
  Ruler,
  Monitor,
  Check,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  FileText,
  CreditCard,
  BookOpen,
  Car,
  Contact,
  Receipt,
  FileSpreadsheet,
  Book,
  NotebookPen,
  Presentation,
  ClipboardList,
  Award,
  QrCode,
  Image: ImageIcon,
  Ruler,
  Monitor,
};

export default function ScanPage() {
  const [selected, setSelected] = useState("document");

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Scan Document" subtitle="Choose a mode and start scanning" />

      <div className="flex-1 p-6">
        {/* Capture options */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <button className="flex flex-col items-center gap-3 rounded-2xl border-2 border-primary/40 bg-primary/10 p-6 transition hover:bg-primary/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
              <Camera className="h-7 w-7" />
            </div>
            <span className="font-semibold">Camera</span>
            <span className="text-xs text-muted">Live capture with auto-detect</span>
          </button>
          <button className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:bg-card-hover">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-border text-muted">
              <Upload className="h-7 w-7" />
            </div>
            <span className="font-semibold">Upload Files</span>
            <span className="text-xs text-muted">PDF, JPG, PNG from device</span>
          </button>
          <button className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:bg-card-hover">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-border text-muted">
              <ImageIcon className="h-7 w-7" />
            </div>
            <span className="font-semibold">Gallery</span>
            <span className="text-xs text-muted">Import from photo library</span>
          </button>
        </div>

        {/* Scan modes */}
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Scan Modes
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {scanModes.map((mode) => {
            const Icon = iconMap[mode.icon] || FileText;
            const isSelected = selected === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setSelected(mode.id)}
                className={cn(
                  "relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/30 hover:bg-card-hover"
                )}
              >
                {isSelected && (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    isSelected ? "bg-primary text-white" : "bg-border text-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">{mode.name}</span>
                <span className="text-[10px] text-muted line-clamp-1">{mode.description}</span>
              </button>
            );
          })}
        </div>

        {/* Enhancement preview mock */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold">Image Enhancement Preview</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Original",
              "Auto",
              "HD",
              "B&W",
              "Grayscale",
              "Magic Color",
              "Text Enhance",
              "Shadow Remove",
              "Glare Remove",
              "Sharpen",
            ].map((mode, i) => (
              <button
                key={mode}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  i === 1
                    ? "bg-primary text-white"
                    : "border border-border bg-background text-muted hover:text-foreground"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            Selected mode: <span className="text-foreground font-medium">{scanModes.find(m => m.id === selected)?.name}</span> — 
            AI will auto-detect edges, correct perspective, and apply optimal enhancement.
          </p>
        </div>
      </div>
    </div>
  );
}
