"use client";

import Link from "next/link";
import { ArrowLeft, Globe, Mic, Shield } from "lucide-react";

export default function SettingsPage() {
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

        <h1 className="text-3xl font-semibold">
          Settings
        </h1>

        <p className="mt-2 text-zinc-400">
          Configure your Bill Pilot experience.
        </p>

        <div className="mt-8 space-y-4">

          <Setting
            icon={<Globe size={20} />}
            title="Language"
            value="English"
          />

          <Setting
            icon={<Mic size={20} />}
            title="Voice Assistant"
            value="Coming soon"
          />

          <Setting
            icon={<Shield size={20} />}
            title="Privacy"
            value="Local development mode"
          />

        </div>
      </div>
    </main>
  );
}

function Setting({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
          {icon}
        </div>

        <span>{title}</span>

      </div>

      <span className="text-sm text-zinc-500">
        {value}
      </span>

    </div>
  );
}