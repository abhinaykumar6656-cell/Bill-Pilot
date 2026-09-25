"use client";

import Link from "next/link";
import { ArrowLeft, Brain, Send } from "lucide-react";

export default function AssistantPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
              <Brain size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">
                Bill Pilot Assistant
              </h1>

              <p className="text-sm text-zinc-500">
                Ask questions about your bills.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-zinc-800 bg-black p-5">
            <p className="text-sm text-zinc-400">
              👋 Hello! I'm Bill Pilot.
            </p>

            <p className="mt-2 text-sm text-zinc-300">
              Upload a bill and I can help explain charges,
              identify unusual changes and estimate future costs.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <input
              type="text"
              placeholder="Ask about your bill..."
              className="flex-1 rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
            />

            <button
              type="button"
              className="rounded-xl bg-white px-5 text-black transition hover:bg-zinc-200"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
