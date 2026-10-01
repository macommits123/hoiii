"use client";

import { useState } from "react";
import Header from "@/components/Header";
import {
  User,
  Shield,
  Cloud,
  Bell,
  Palette,
  HardDrive,
  LogOut,
  ChevronRight,
  ChevronDown,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  Download,
  Trash2,
  Moon,
  Sun,
  Monitor,
  Copy,
  HardDriveDownload,
} from "lucide-react";

// ---------- Toggle Component ----------
function Toggle({
  enabled,
  onChange,
  disabled = false,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        enabled ? "bg-primary" : "bg-zinc-600"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ---------- Section Wrapper ----------
function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 hover:bg-card-hover transition"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        {open ? (
          <ChevronDown className="h-4 w-4 text-muted" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted" />
        )}
      </button>
      {open && <div className="border-t border-border">{children}</div>}
    </section>
  );
}

// ---------- Row helpers ----------
function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-card-hover/50 transition">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-xs text-muted mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function ActionRow({
  label,
  description,
  onClick,
  danger = false,
  icon: Icon,
}: {
  label: string;
  description?: string;
  onClick: () => void;
  danger?: boolean;
  icon?: React.ElementType;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition hover:bg-card-hover/50 ${
        danger ? "text-danger" : ""
      }`}
    >
      <div className="min-w-0 flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 shrink-0 opacity-70" />}
        <div>
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <p className="text-xs text-muted mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted shrink-0" />
    </button>
  );
}

// ---------- Main Page ----------
export default function SettingsPage() {
  // Account
  const [name, setName] = useState("Mahendra Thapa");
  const [email, setEmail] = useState("mahendra@example.com");
  const [editingProfile, setEditingProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(true);
  const [passkeys, setPasskeys] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(true);
  const [appleConnected, setAppleConnected] = useState(false);

  // Security
  const [appLock, setAppLock] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [secureFolder, setSecureFolder] = useState(true);
  const [encryption, setEncryption] = useState(true);
  const [showDevices, setShowDevices] = useState(false);

  // Cloud
  const [cloudSync, setCloudSync] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [googleDrive, setGoogleDrive] = useState(false);
  const [dropbox, setDropbox] = useState(false);
  const [oneDrive, setOneDrive] = useState(false);

  // Notifications
  const [expiryReminders, setExpiryReminders] = useState(true);
  const [sharingAlerts, setSharingAlerts] = useState(true);
  const [signatureRequests, setSignatureRequests] = useState(true);
  const [storageWarnings, setStorageWarnings] = useState(true);

  // Appearance
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [language, setLanguage] = useState("English");
  const [defaultScanMode, setDefaultScanMode] = useState("Document");

  // Storage
  const usedGB = 2.4;
  const totalGB = 10;
  const percent = Math.round((usedGB / totalGB) * 100);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSaveProfile = () => {
    setEditingProfile(false);
    showToast("Profile updated successfully");
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      showToast("Please fill all fields correctly");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showToast("Password changed successfully");
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header
        title="Settings"
        subtitle="Account, security, cloud & preferences"
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      <div className="flex-1 space-y-5 p-6 max-w-3xl">
        {/* ========== ACCOUNT ========== */}
        <Section title="Account" icon={User}>
          {/* Profile */}
          <div className="px-5 py-4 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-lg font-bold text-white">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                {editingProfile ? (
                  <div className="space-y-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      placeholder="Full name"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      placeholder="Email"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-hover"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-muted">{email}</p>
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="mt-1 text-xs text-primary hover:underline"
                    >
                      Edit profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Email & Password */}
          <div className="px-5 py-4 border-b border-border space-y-3">
            <p className="text-sm font-medium flex items-center gap-2">
              <Key className="h-4 w-4 text-muted" /> Change Password
            </p>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={handleChangePassword}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-primary-hover"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Connected Accounts */}
          <SettingRow
            label="Google"
            description={googleConnected ? "Connected" : "Not connected"}
          >
            <button
              onClick={() => {
                setGoogleConnected(!googleConnected);
                showToast(
                  googleConnected
                    ? "Google disconnected"
                    : "Google connected"
                );
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                googleConnected
                  ? "border border-border text-muted hover:text-foreground"
                  : "bg-primary text-white hover:bg-primary-hover"
              }`}
            >
              {googleConnected ? "Disconnect" : "Connect"}
            </button>
          </SettingRow>
          <SettingRow
            label="Apple"
            description={appleConnected ? "Connected" : "Not connected"}
          >
            <button
              onClick={() => {
                setAppleConnected(!appleConnected);
                showToast(
                  appleConnected ? "Apple disconnected" : "Apple connected"
                );
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                appleConnected
                  ? "border border-border text-muted hover:text-foreground"
                  : "bg-primary text-white hover:bg-primary-hover"
              }`}
            >
              {appleConnected ? "Disconnect" : "Connect"}
            </button>
          </SettingRow>

          {/* 2FA */}
          <SettingRow
            label="Two-factor authentication"
            description="Extra security for your account"
          >
            <Toggle
              enabled={twoFactor}
              onChange={(v) => {
                setTwoFactor(v);
                showToast(v ? "2FA enabled" : "2FA disabled");
              }}
            />
          </SettingRow>

          {/* Passkeys */}
          <SettingRow label="Passkeys" description="Passwordless sign-in">
            <Toggle
              enabled={passkeys}
              onChange={(v) => {
                setPasskeys(v);
                showToast(v ? "Passkeys enabled" : "Passkeys disabled");
              }}
            />
          </SettingRow>
        </Section>

        {/* ========== SECURITY & PRIVACY ========== */}
        <Section title="Security & Privacy" icon={Shield}>
          <SettingRow
            label="App lock (PIN)"
            description="Require PIN to open the app"
          >
            <Toggle
              enabled={appLock}
              onChange={(v) => {
                setAppLock(v);
                showToast(v ? "App lock enabled" : "App lock disabled");
              }}
            />
          </SettingRow>
          <SettingRow
            label="Biometric unlock"
            description="Use fingerprint / Face ID"
          >
            <Toggle
              enabled={biometric}
              onChange={(v) => {
                setBiometric(v);
                showToast(v ? "Biometric enabled" : "Biometric disabled");
              }}
            />
          </SettingRow>
          <SettingRow
            label="Secure folder / Private vault"
            description="Hide sensitive documents"
          >
            <Toggle
              enabled={secureFolder}
              onChange={(v) => {
                setSecureFolder(v);
                showToast(
                  v ? "Secure folder enabled" : "Secure folder disabled"
                );
              }}
            />
          </SettingRow>
          <SettingRow
            label="Encryption at rest"
            description="Documents encrypted on device & cloud"
          >
            <Toggle
              enabled={encryption}
              onChange={(v) => {
                setEncryption(v);
                showToast(v ? "Encryption enabled" : "Encryption disabled");
              }}
            />
          </SettingRow>

          {/* Devices */}
          <div className="px-5 py-3.5 border-t border-border">
            <button
              onClick={() => setShowDevices(!showDevices)}
              className="flex w-full items-center justify-between text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-muted" />
                Session & device management
              </span>
              {showDevices ? (
                <ChevronDown className="h-4 w-4 text-muted" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted" />
              )}
            </button>
            {showDevices && (
              <div className="mt-3 space-y-2">
                {[
                  {
                    name: "Windows PC",
                    detail: "Kathmandu • Active now",
                    current: true,
                  },
                  {
                    name: "iPhone 15",
                    detail: "Kathmandu • 2 hours ago",
                    current: false,
                  },
                  {
                    name: "Chrome on Mac",
                    detail: "Pokhara • 3 days ago",
                    current: false,
                  },
                ].map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {d.name}{" "}
                        {d.current && (
                          <span className="text-xs text-success">
                            (This device)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted">{d.detail}</p>
                    </div>
                    {!d.current && (
                      <button
                        onClick={() =>
                          showToast(`Signed out from ${d.name}`)
                        }
                        className="text-xs text-danger hover:underline"
                      >
                        Sign out
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <ActionRow
            label="Export my data"
            description="Download all your documents & data"
            icon={Download}
            onClick={() => showToast("Data export started...")}
          />
          <ActionRow
            label="Delete account"
            description="Permanently delete your account and data"
            icon={Trash2}
            danger
            onClick={() =>
              showToast("Account deletion requires confirmation")
            }
          />
        </Section>

        {/* ========== CLOUD & SYNC ========== */}
        <Section title="Cloud & Sync" icon={Cloud}>
          <SettingRow
            label="Grok Scanner Cloud"
            description="Sync documents across devices"
          >
            <Toggle
              enabled={cloudSync}
              onChange={(v) => {
                setCloudSync(v);
                showToast(v ? "Cloud sync on" : "Cloud sync off");
              }}
            />
          </SettingRow>
          <SettingRow
            label="Automatic backup"
            description="Backup documents automatically"
          >
            <Toggle
              enabled={autoBackup}
              onChange={(v) => {
                setAutoBackup(v);
                showToast(v ? "Auto backup on" : "Auto backup off");
              }}
            />
          </SettingRow>
          <SettingRow
            label="Offline mode"
            description="Work without internet, sync later"
          >
            <Toggle
              enabled={offlineMode}
              onChange={(v) => {
                setOfflineMode(v);
                showToast(v ? "Offline mode on" : "Offline mode off");
              }}
            />
          </SettingRow>

          <div className="border-t border-border px-5 py-3">
            <p className="text-xs font-medium text-muted mb-2 uppercase tracking-wide">
              External Cloud
            </p>
          </div>
          <SettingRow label="Google Drive">
            <Toggle
              enabled={googleDrive}
              onChange={(v) => {
                setGoogleDrive(v);
                showToast(
                  v ? "Google Drive connected" : "Google Drive disconnected"
                );
              }}
            />
          </SettingRow>
          <SettingRow label="Dropbox">
            <Toggle
              enabled={dropbox}
              onChange={(v) => {
                setDropbox(v);
                showToast(v ? "Dropbox connected" : "Dropbox disconnected");
              }}
            />
          </SettingRow>
          <SettingRow label="OneDrive">
            <Toggle
              enabled={oneDrive}
              onChange={(v) => {
                setOneDrive(v);
                showToast(
                  v ? "OneDrive connected" : "OneDrive disconnected"
                );
              }}
            />
          </SettingRow>
        </Section>

        {/* ========== NOTIFICATIONS ========== */}
        <Section title="Notifications" icon={Bell}>
          <SettingRow
            label="Expiry date reminders"
            description="Passport, license, certificates..."
          >
            <Toggle
              enabled={expiryReminders}
              onChange={(v) => {
                setExpiryReminders(v);
                showToast(v ? "Reminders on" : "Reminders off");
              }}
            />
          </SettingRow>
          <SettingRow
            label="Sharing & approval alerts"
            description="When someone shares or requests approval"
          >
            <Toggle
              enabled={sharingAlerts}
              onChange={(v) => {
                setSharingAlerts(v);
                showToast(v ? "Sharing alerts on" : "Sharing alerts off");
              }}
            />
          </SettingRow>
          <SettingRow
            label="Signature requests"
            description="When someone asks you to sign"
          >
            <Toggle
              enabled={signatureRequests}
              onChange={(v) => {
                setSignatureRequests(v);
                showToast(
                  v ? "Signature alerts on" : "Signature alerts off"
                );
              }}
            />
          </SettingRow>
          <SettingRow
            label="Storage warnings"
            description="When storage is almost full"
          >
            <Toggle
              enabled={storageWarnings}
              onChange={(v) => {
                setStorageWarnings(v);
                showToast(
                  v ? "Storage warnings on" : "Storage warnings off"
                );
              }}
            />
          </SettingRow>
        </Section>

        {/* ========== APPEARANCE ========== */}
        <Section title="Appearance" icon={Palette}>
          <div className="px-5 py-4">
            <p className="text-sm font-medium mb-3">Theme</p>
            <div className="flex gap-2">
              {(
                [
                  { id: "dark", label: "Dark", icon: Moon },
                  { id: "light", label: "Light", icon: Sun },
                  { id: "system", label: "System", icon: Monitor },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    showToast(`Theme set to ${t.label}`);
                  }}
                  className={`flex flex-1 flex-col items-center gap-1.5 rounded-lg border py-3 text-xs font-medium transition ${
                    theme === t.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted hover:border-zinc-500 hover:text-foreground"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <SettingRow label="Language" description={language}>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                showToast(`Language set to ${e.target.value}`);
              }}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-primary"
            >
              <option>English</option>
              <option>नेपाली</option>
              <option>हिन्दी</option>
              <option>中文</option>
              <option>日本語</option>
              <option>한국어</option>
              <option>العربية</option>
            </select>
          </SettingRow>

          <SettingRow label="Default scan mode">
            <select
              value={defaultScanMode}
              onChange={(e) => {
                setDefaultScanMode(e.target.value);
                showToast(`Default mode: ${e.target.value}`);
              }}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-primary"
            >
              <option>Document</option>
              <option>ID Card</option>
              <option>Passport</option>
              <option>Receipt</option>
              <option>Invoice</option>
              <option>Business Card</option>
              <option>Book</option>
              <option>Whiteboard</option>
              <option>Photo</option>
            </select>
          </SettingRow>
        </Section>

        {/* ========== STORAGE ========== */}
        <Section title="Storage" icon={HardDrive}>
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">
                {usedGB} GB used of {totalGB} GB
              </p>
              <p className="text-xs text-muted">{percent}%</p>
            </div>
            <div className="h-2.5 w-full rounded-full bg-zinc-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-background border border-border py-2">
                <p className="text-xs text-muted">Documents</p>
                <p className="text-sm font-semibold">1.8 GB</p>
              </div>
              <div className="rounded-lg bg-background border border-border py-2">
                <p className="text-xs text-muted">Trash</p>
                <p className="text-sm font-semibold">0.3 GB</p>
              </div>
              <div className="rounded-lg bg-background border border-border py-2">
                <p className="text-xs text-muted">Other</p>
                <p className="text-sm font-semibold">0.3 GB</p>
              </div>
            </div>
          </div>

          <ActionRow
            label="Find duplicates"
            description="3 potential duplicates found"
            icon={Copy}
            onClick={() => showToast("Scanning for duplicates...")}
          />
          <ActionRow
            label="Clear trash"
            description="0.3 GB will be freed"
            icon={Trash2}
            onClick={() => showToast("Trash cleared")}
          />
          <ActionRow
            label="Compress large files"
            description="Reduce size of big PDFs"
            icon={HardDriveDownload}
            onClick={() => showToast("Compression started...")}
          />
        </Section>

        {/* Sign out */}
        <button
          onClick={() => showToast("Signed out successfully")}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-danger/30 bg-danger/10 py-3.5 text-sm font-medium text-danger transition hover:bg-danger/20"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
