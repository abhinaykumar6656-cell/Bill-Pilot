"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Zap, Droplets } from "lucide-react";

export default function BillsPage() {
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

        <div className="mb-8">
          <p className="text-sm text-zinc-500">
            Bill Pilot AI
          </p>

          <h1 className="mt-1 text-3xl font-semibold">
            Bills
          </h1>

          <p className="mt-2 text-zinc-400">
            View and manage your utility bills.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
              <Zap size={20} />
            </div>

            <h2 className="text-lg font-medium">
              Electricity
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Demo Power
            </p>

            <p className="mt-6 text-2xl font-semibold">
              ₹2,450
            </p>

            <p className="mt-1 text-sm text-yellow-400">
              +18.4%
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
              <Droplets size={20} />
            </div>

            <h2 className="text-lg font-medium">
              Water
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Municipal Water
            </p>

            <p className="mt-6 text-2xl font-semibold">
              ₹680
            </p>

            <p className="mt-1 text-sm text-emerald-400">
              -4.2%
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
              <FileText size={20} />
            </div>

            <h2 className="text-lg font-medium">
              Internet
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Demo Broadband
            </p>

            <p className="mt-6 text-2xl font-semibold">
              ₹799
            </p>

            <p className="mt-1 text-sm text-yellow-400">
              +2.1%
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}