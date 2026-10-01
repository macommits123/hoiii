import Header from "@/components/Header";
import {
  Merge,
  Split,
  RotateCw,
  Trash2,
  FileOutput,
  Compress,
  FileImage,
  FileType,
  FileSpreadsheet,
  Presentation,
  PenLine,
  Lock,
  Stamp,
  Highlighter,
  Type,
} from "lucide-react";

const operations = [
  { name: "Merge PDF", icon: Merge, desc: "Combine multiple PDFs into one" },
  { name: "Split PDF", icon: Split, desc: "Extract pages or split by range" },
  { name: "Reorder Pages", icon: RotateCw, desc: "Drag & drop page order" },
  { name: "Delete Pages", icon: Trash2, desc: "Remove unwanted pages" },
  { name: "Extract Pages", icon: FileOutput, desc: "Save selected pages" },
  { name: "Compress PDF", icon: Compress, desc: "Reduce file size" },
  { name: "Rotate Pages", icon: RotateCw, desc: "Rotate 90° / 180° / 270°" },
  { name: "Repair PDF", icon: FileType, desc: "Fix corrupted files" },
];

const conversions = [
  { name: "PDF → JPG", icon: FileImage },
  { name: "PDF → PNG", icon: FileImage },
  { name: "PDF → TXT", icon: FileType },
  { name: "PDF → DOCX", icon: FileType },
  { name: "PDF → XLSX", icon: FileSpreadsheet },
  { name: "PDF → PPTX", icon: Presentation },
  { name: "DOCX → PDF", icon: FileType },
  { name: "Images → PDF", icon: FileImage },
];

const editTools = [
  { name: "Add Text", icon: Type },
  { name: "Highlight", icon: Highlighter },
  { name: "Draw / Pen", icon: PenLine },
  { name: "Add Stamp", icon: Stamp },
  { name: "Watermark", icon: Stamp },
  { name: "Digital Sign", icon: PenLine },
  { name: "Password Protect", icon: Lock },
  { name: "Form Fill", icon: Type },
];

export default function PDFToolsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="PDF Tools" subtitle="Edit, convert, secure & organize PDFs" />

      <div className="flex-1 space-y-10 p-6">
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            PDF Operations
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {operations.map((op) => {
              const Icon = op.icon;
              return (
                <button
                  key={op.name}
                  className="flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-4 text-left transition hover:border-primary/40 hover:bg-card-hover"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{op.name}</span>
                  <span className="text-[11px] text-muted">{op.desc}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Conversion
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {conversions.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.name}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:bg-card-hover"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-center">{c.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Edit & Annotate
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {editTools.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:bg-card-hover"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{t.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="mb-2 text-sm font-medium">Drop PDF files here</p>
          <p className="text-xs text-muted">or click to browse • Supports batch processing</p>
          <button className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-hover">
            Choose files
          </button>
        </section>
      </div>
    </div>
  );
}
