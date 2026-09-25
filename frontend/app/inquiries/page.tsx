"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function InquiriesPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-semibold">
          Billing Inquiries
        </h1>

        <p className="mt-2 text-zinc-400">
          Review and manage billing issues before submitting them.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h2 className="font-medium">
                No active inquiries
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                When Bill Pilot detects a billing issue,
                you can review the generated inquiry here.
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}