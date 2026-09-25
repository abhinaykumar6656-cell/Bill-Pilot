"use client";

import {
  AlertTriangle,
  ArrowRight,
  Brain,
  ChevronRight,
  FileText,
  Lightbulb,
  Settings,
  TrendingUp,
  Upload,
  WalletCards,
  Waves,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  DragEvent,
  ChangeEvent,
  useRef,
  useState,
} from "react";

import { uploadBill } from "@/lib/api";


export default function HomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(
    null,
  );
  const [uploadError, setUploadError] = useState<string | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);

  // -------------------------------------------------------
  // File validation
  // -------------------------------------------------------

  function isValidFile(file: File): boolean {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    return allowedTypes.includes(file.type);
  }

  // -------------------------------------------------------
  // Upload file
  // -------------------------------------------------------

  async function processFile(file: File) {
    setUploadResult(null);
    setUploadError(null);

    if (!isValidFile(file)) {
      setUploadError(
        "Unsupported file. Please upload a PDF, JPG or PNG.",
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError(
        "File is too large. Maximum size is 10 MB.",
      );
      return;
    }

    setUploading(true);

    try {
      const result = await uploadBill(file);

      if (result.success) {
        setUploadResult(
          `Bill uploaded successfully. ID: ${result.bill_id}`,
        );
      } else {
        setUploadError(
          result.message || "Bill upload failed.",
        );
      }
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading the bill.",
      );
    } finally {
      setUploading(false);
    }
  }

  // -------------------------------------------------------
  // File picker
  // -------------------------------------------------------

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (file) {
      void processFile(file);
    }

    // Allow selecting the same file again.
    event.target.value = "";
  }

  // -------------------------------------------------------
  // Drag and drop
  // -------------------------------------------------------

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      void processFile(file);
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="fixed left-0 top-0 z-40 flex h-screen w-[230px] flex-col border-r border-zinc-800 bg-[#0c0d0f]">
        {/* Logo */}

        <div className="flex h-[105px] items-center border-b border-zinc-800 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <Brain size={22} strokeWidth={2.2} />
            </div>

            <div>
              <h1 className="text-[16px] font-semibold tracking-tight">
                Bill Pilot
              </h1>

              <p className="text-xs text-zinc-500">
                AI Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-4 py-5">
          <div className="space-y-2">
            <SidebarLink
              href="/"
              icon={<WalletCards size={18} />}
              label="Dashboard"
              active
            />

            <SidebarLink
              href="/bills"
              icon={<FileText size={18} />}
              label="Bills"
            />

            <SidebarLink
              href="/insights"
              icon={<Lightbulb size={18} />}
              label="Insights"
            />

            <SidebarLink
              href="/assistant"
              icon={<Brain size={18} />}
              label="Assistant"
            />

            <SidebarLink
              href="/inquiries"
              icon={<AlertTriangle size={18} />}
              label="Inquiries"
            />
          </div>
        </nav>

        {/* Settings */}

        <div className="border-t border-zinc-800 p-4">
          <SidebarLink
            href="/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="ml-[230px] min-h-screen">
        {/* ===================================================
            TOP BAR
        ==================================================== */}

        <header className="flex h-[105px] items-center justify-between border-b border-zinc-800 px-8">
          <div>
            <p className="text-xs text-zinc-500">
              Bill Pilot AI
            </p>

            <h2 className="mt-1 text-[18px] font-semibold">
              Utility Intelligence
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
            >
              <AlertTriangle size={18} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold">
              AK
            </div>
          </div>
        </header>

        {/* ===================================================
            PAGE
        ==================================================== */}

        <main className="mx-auto max-w-[1200px] px-8 py-8">
          {/* Greeting */}

          <section className="mb-7">
            <p className="text-sm text-zinc-500">
              Welcome back
            </p>

            <h1 className="mt-1 text-[28px] font-semibold tracking-tight">
              Good evening, Abhinay.
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Understand your bills. Detect anomalies. Predict
              what comes next.
            </p>
          </section>

          {/* =================================================
              STAT CARDS
          ================================================== */}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Current month"
              value="₹3,929"
              subtitle="Total utility bills"
              icon={<WalletCards size={19} />}
            />

            <StatCard
              title="Monthly change"
              value="+12.8%"
              subtitle="Compared with last month"
              icon={<TrendingUp size={19} />}
            />

            <StatCard
              title="Anomalies"
              value="2"
              subtitle="Require attention"
              icon={<AlertTriangle size={19} />}
              warning
            />

            <StatCard
              title="Next bill"
              value="₹2,620"
              subtitle="AI estimated"
              icon={<Brain size={19} />}
            />
          </section>

          {/* =================================================
              UPLOAD BILL
          ================================================== */}

          <section className="mt-7 rounded-2xl border border-zinc-800 bg-[#0d0f11] p-5">
            <div className="mb-5">
              <h2 className="text-[17px] font-semibold">
                Analyze a new bill
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Upload a PDF or image and let Bill Pilot
                investigate it.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={openFilePicker}
              className={`flex min-h-[245px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed transition ${
                isDragging
                  ? "border-white bg-zinc-900"
                  : "border-zinc-700 bg-[#111315] hover:border-zinc-500"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-black">
                <Upload size={23} />
              </div>

              <p className="mt-4 text-sm font-medium">
                {uploading
                  ? "Uploading and analyzing..."
                  : "Drop your bill here"}
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                or click to browse PDF, JPG or PNG
              </p>

              <button
                type="button"
                disabled={uploading}
                onClick={(event) => {
                  event.stopPropagation();
                  openFilePicker();
                }}
                className="mt-5 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Bill"}
              </button>

              {uploadResult && (
                <p className="mt-4 text-center text-sm text-emerald-400">
                  ✓ {uploadResult}
                </p>
              )}

              {uploadError && (
                <p className="mt-4 max-w-md text-center text-sm text-red-400">
                  ✕ {uploadError}
                </p>
              )}
            </div>
          </section>

          {/* =================================================
              LOWER DASHBOARD
          ================================================== */}

          <section className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_0.85fr]">
            {/* Recent Bills */}

            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0f11]">
              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-5">
                <div>
                  <h2 className="text-[16px] font-semibold">
                    Recent bills
                  </h2>

                  <p className="mt-1 text-xs text-zinc-500">
                    Your latest utility activity
                  </p>
                </div>

                <Link
                  href="/bills"
                  className="flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white"
                >
                  View all
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div>
                <BillRow
                  icon={<Zap size={19} />}
                  title="Electricity"
                  provider="Demo Power"
                  amount="₹2,450"
                  change="+18.4%"
                  warning
                />

                <BillRow
                  icon={<Waves size={19} />}
                  title="Water"
                  provider="Municipal Water"
                  amount="₹680"
                  change="-4.2%"
                />

                <BillRow
                  icon={<FileText size={19} />}
                  title="Internet"
                  provider="Demo Broadband"
                  amount="₹799"
                  change="+2.1%"
                  warning
                  last
                />
              </div>
            </div>

            {/* AI Insight */}

            <div className="rounded-2xl border border-zinc-800 bg-[#0d0f11] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                  <Brain size={19} />
                </div>

                <div>
                  <h2 className="text-[16px] font-semibold">
                    AI Insight
                  </h2>

                  <p className="text-xs text-zinc-500">
                    Bill Detective
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-yellow-900/70 bg-yellow-950/20 p-4">
                <div className="flex gap-3">
                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0 text-yellow-400"
                  />

                  <div>
                    <h3 className="text-sm font-medium text-yellow-100">
                      Electricity bill increased
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-zinc-400">
                      Your latest electricity bill is
                      approximately 18.4% higher than the
                      previous bill.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/insights"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 py-3 text-sm transition hover:border-zinc-600 hover:bg-zinc-900"
              >
                Investigate with AI
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}


/* ============================================================
   SIDEBAR LINK
============================================================ */

function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm transition ${
        active
          ? "bg-white font-medium text-black"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
      }`}
    >
      {icon}

      <span>{label}</span>
    </Link>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  warning = false,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  warning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#0d0f11] p-4">
      <div className="flex items-start justify-between">
        <p className="text-xs text-zinc-500">
          {title}
        </p>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            warning
              ? "bg-yellow-950/50 text-yellow-400"
              : "bg-zinc-900 text-zinc-300"
          }`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-5 text-[22px] font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        {subtitle}
      </p>
    </div>
  );
}


/* ============================================================
   BILL ROW
============================================================ */

function BillRow({
  icon,
  title,
  provider,
  amount,
  change,
  warning = false,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  provider: string;
  amount: string;
  change: string;
  warning?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-4 ${
        last ? "" : "border-b border-zinc-800"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-zinc-300">
          {icon}
        </div>

        <div>
          <p className="text-sm font-medium">
            {title}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            {provider}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium">
          {amount}
        </p>

        <p
          className={`mt-1 text-xs ${
            warning
              ? "text-yellow-400"
              : "text-emerald-400"
          }`}
        >
          {change}
        </p>
      </div>
    </div>
  );
}