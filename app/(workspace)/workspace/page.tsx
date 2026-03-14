"use client";

import DashboardHeader from "@/src/components/workspace/DashboardHeader";
import StatCards from "@/src/components/workspace/StatCards";
import ModerationQueue from "@/src/components/workspace/ModerationQueue";
import AnalyticsCard from "@/src/components/workspace/AnalyticsCard";

export default function WorkspaceHome() {
  return (
    <div className="space-y-8">

      {/* HEADER */}

      <DashboardHeader />

      {/* METRIC CARDS */}

      <StatCards />

      {/* GRID SECTION */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <ModerationQueue />

        <AnalyticsCard />

      </div>

    </div>
  );
}