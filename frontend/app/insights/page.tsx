"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle, TrendingUp, Brain } from "lucide-react";

export default function InsightsPage() {
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
          AI Insights
        </h1>

        <p className="mt-2 text-zinc-400">
          Understand changes, anomalies and predictions across your bills.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <InsightCard
            icon={<AlertTriangle size={20} />}
            title="Anomalies"
            value="2"
            description="Bills require investigation."
          />

          <InsightCard
            icon={<TrendingUp size={20} />}
            title="Monthly Change"
            value="+12.8%"
            description="Compared with last month."
          />

          <InsightCard
            icon={<Brain size={20} />}
            title="Prediction"
            value="₹2,620"
            description="Estimated next electricity bill."
          />

        </div>
      </div>
    </main>
  );
}

function InsightCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
        {icon}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-semibold">
        {value}
      </p>

      <p className="mt-2 text-sm text-zinc-500">
        {description}
      </p>
    </div>
  );
}