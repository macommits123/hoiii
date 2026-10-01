export type DocumentType =
  | "passport"
  | "id"
  | "invoice"
  | "receipt"
  | "certificate"
  | "contract"
  | "business_card"
  | "notes"
  | "form"
  | "other";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  pages: number;
  size: string;
  date: string;
  tags: string[];
  folder: string;
  favorite: boolean;
  thumbnailColor: string;
  ocrPreview?: string;
}

export interface Folder {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export const folders: Folder[] = [
  { id: "personal", name: "Personal", icon: "User", count: 24, color: "#6366f1" },
  { id: "business", name: "Business", icon: "Briefcase", count: 41, color: "#22d3ee" },
  { id: "education", name: "Education", icon: "GraduationCap", count: 12, color: "#a78bfa" },
  { id: "finance", name: "Finance", icon: "Wallet", count: 58, color: "#22c55e" },
  { id: "legal", name: "Legal", icon: "Scale", count: 9, color: "#f59e0b" },
  { id: "travel", name: "Travel", icon: "Plane", count: 7, color: "#ec4899" },
  { id: "medical", name: "Medical", icon: "HeartPulse", count: 5, color: "#ef4444" },
  { id: "projects", name: "Projects", icon: "FolderKanban", count: 15, color: "#14b8a6" },
];

export const documents: Document[] = [
  {
    id: "1",
    name: "Nepal Passport 2024.pdf",
    type: "passport",
    pages: 2,
    size: "1.2 MB",
    date: "2026-09-15",
    tags: ["Identity", "Travel"],
    folder: "personal",
    favorite: true,
    thumbnailColor: "#6366f1",
    ocrPreview: "Passport No: PA1234567 • Expiry: 2034-03-12",
  },
  {
    id: "2",
    name: "Invoice_ABC_1023.pdf",
    type: "invoice",
    pages: 1,
    size: "340 KB",
    date: "2026-09-14",
    tags: ["Finance", "Invoice"],
    folder: "finance",
    favorite: false,
    thumbnailColor: "#22c55e",
    ocrPreview: "ABC Company • Total: NPR 50,000 • Due: 2026-09-30",
  },
  {
    id: "3",
    name: "Bachelor_Certificate_2026.pdf",
    type: "certificate",
    pages: 1,
    size: "890 KB",
    date: "2026-09-12",
    tags: ["Education", "Important"],
    folder: "education",
    favorite: true,
    thumbnailColor: "#a78bfa",
    ocrPreview: "Tribhuvan University • Bachelor of Science",
  },
  {
    id: "4",
    name: "Driving_License_Front.pdf",
    type: "id",
    pages: 1,
    size: "520 KB",
    date: "2026-09-10",
    tags: ["Identity"],
    folder: "personal",
    favorite: false,
    thumbnailColor: "#f59e0b",
    ocrPreview: "License No: 12-34-5678 • Expiry: 2029-05-20",
  },
  {
    id: "5",
    name: "Receipt_Daraz_Sep.pdf",
    type: "receipt",
    pages: 1,
    size: "180 KB",
    date: "2026-09-08",
    tags: ["Finance", "Receipt"],
    folder: "finance",
    favorite: false,
    thumbnailColor: "#22d3ee",
    ocrPreview: "Daraz • NPR 4,250 • 2026-09-08",
  },
  {
    id: "6",
    name: "Service_Agreement_v2.pdf",
    type: "contract",
    pages: 8,
    size: "2.1 MB",
    date: "2026-09-05",
    tags: ["Legal", "Contract"],
    folder: "legal",
    favorite: true,
    thumbnailColor: "#ef4444",
    ocrPreview: "Service Agreement between Grok Labs and Client",
  },
  {
    id: "7",
    name: "Business_Card_Ramesh.pdf",
    type: "business_card",
    pages: 1,
    size: "95 KB",
    date: "2026-09-03",
    tags: ["Contacts"],
    folder: "business",
    favorite: false,
    thumbnailColor: "#14b8a6",
    ocrPreview: "Ramesh Sharma • CEO • +977-98XXXXXXXX",
  },
  {
    id: "8",
    name: "Meeting_Notes_Q3.pdf",
    type: "notes",
    pages: 3,
    size: "410 KB",
    date: "2026-09-01",
    tags: ["Work", "Notes"],
    folder: "projects",
    favorite: false,
    thumbnailColor: "#ec4899",
    ocrPreview: "Q3 Planning Notes • Action items: 7",
  },
];

export const scanModes = [
  { id: "document", name: "Document", icon: "FileText", description: "General documents" },
  { id: "id", name: "ID Card", icon: "CreditCard", description: "National ID & cards" },
  { id: "passport", name: "Passport", icon: "BookOpen", description: "Passport with MRZ" },
  { id: "license", name: "Driving License", icon: "Car", description: "Driving license" },
  { id: "business_card", name: "Business Card", icon: "Contact", description: "Extract contacts" },
  { id: "receipt", name: "Receipt", icon: "Receipt", description: "Expense receipts" },
  { id: "invoice", name: "Invoice", icon: "FileSpreadsheet", description: "Invoices & bills" },
  { id: "book", name: "Book", icon: "Book", description: "Multi-page books" },
  { id: "notes", name: "Notes", icon: "NotebookPen", description: "Handwritten notes" },
  { id: "whiteboard", name: "Whiteboard", icon: "Presentation", description: "Whiteboard capture" },
  { id: "form", name: "Form", icon: "ClipboardList", description: "Forms & applications" },
  { id: "certificate", name: "Certificate", icon: "Award", description: "Certificates" },
  { id: "qr", name: "QR / Barcode", icon: "QrCode", description: "Scan codes" },
  { id: "photo", name: "Photo", icon: "Image", description: "Old photographs" },
  { id: "blueprint", name: "Blueprint", icon: "Ruler", description: "Plans & drawings" },
  { id: "screenshot", name: "Screenshot", icon: "Monitor", description: "Screen captures" },
];

export const tools = [
  { id: "ocr", name: "OCR", icon: "ScanText", description: "Extract text", href: "/documents" },
  { id: "pdf", name: "PDF Tools", icon: "FileStack", description: "Merge, split, convert", href: "/pdf-tools" },
  { id: "ai", name: "AI Assistant", icon: "Sparkles", description: "Ask anything", href: "/ai" },
  { id: "sign", name: "Sign PDF", icon: "PenLine", description: "Digital signature", href: "/pdf-tools" },
  { id: "id", name: "Scan ID", icon: "IdCard", description: "Identity documents", href: "/scan" },
  { id: "receipt", name: "Scan Receipt", icon: "Receipt", description: "Expense tracking", href: "/scan" },
];

export const storage = {
  used: 2.4,
  total: 10,
  unit: "GB",
};
