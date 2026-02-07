"use client";

/**
 * @file SprintVelocity.tsx
 * @description A velocity chart showing sprint performance over time
 */

import type { SprintVelocityProps, Trend } from "@/lib/schemas";

const trendIcons: Record<Trend, { icon: string; color: string; label: string }> = {
    up: { icon: "📈", color: "text-[#3fb950]", label: "Improving" },
    down: { icon: "📉", color: "text-[#f85149]", label: "Declining" },
    stable: { icon: "➡️", color: "text-[#58a6ff]", label: "Stable" },
};

import { CyberSkeleton } from "@/components/ui/skeleton";

export function SprintVelocity({
    sprints,
    averageVelocity,
    trend,
}: SprintVelocityProps) {
    // Handle streaming
    if (!sprints || sprints.length === 0) {
        return (
            <div className="w-full p-4">
                <CyberSkeleton className="h-8 w-48 mb-6" />
                <CyberSkeleton className="h-64 w-full" />
            </div>
        );
    }

    const maxValue = Math.max(...sprints.flatMap((s) => [s.planned, s.completed]));
    const barHeight = 160;

    return (
        <div className="w-full bg-[#0d1117] rounded-xl border border-[#30363d] p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-[#c9d1d9]">
                        🚀 Sprint Velocity
                    </h2>
                    <p className="text-sm text-[#8b949e]">
                        Tracking team performance across sprints
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-2xl font-bold text-[#c9d1d9]">
                            {averageVelocity?.toFixed(1) || "0"}
                        </p>
                        <p className="text-xs text-[#8b949e]">Avg Velocity</p>
                    </div>
                    <div
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] ${trendIcons[trend]?.color || ""}`}
                    >
                        <span>{trendIcons[trend]?.icon || "➡️"}</span>
                        <span className="text-sm font-medium">
                            {trendIcons[trend]?.label || "Stable"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#8b949e]" />
                    <span className="text-xs text-[#8b949e]">Planned</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#58a6ff]" />
                    <span className="text-xs text-[#8b949e]">Completed</span>
                </div>
            </div>

            {/* Chart */}
            <div className="relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-[160px] flex flex-col justify-between text-xs text-[#8b949e] pr-2">
                    <span>{maxValue}</span>
                    <span>{Math.round(maxValue / 2)}</span>
                    <span>0</span>
                </div>

                {/* Bars */}
                <div className="ml-10 flex items-end justify-around gap-2" style={{ height: barHeight }}>
                    {sprints.map((sprint, i) => {
                        const plannedHeight = (sprint.planned / maxValue) * barHeight;
                        const completedHeight = (sprint.completed / maxValue) * barHeight;
                        const completionRate = Math.round(
                            (sprint.completed / sprint.planned) * 100,
                        );

                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div className="flex items-end gap-1 h-[160px]">
                                    {/* Planned Bar */}
                                    <div
                                        className="w-5 bg-[#8b949e]/30 rounded-t transition-all hover:bg-[#8b949e]/50 relative group"
                                        style={{ height: plannedHeight }}
                                    >
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#161b22] text-[#c9d1d9] text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap border border-[#30363d]">
                                            {sprint.planned} pts
                                        </div>
                                    </div>

                                    {/* Completed Bar */}
                                    <div
                                        className={`w-5 rounded-t transition-all relative group ${completionRate >= 90
                                            ? "bg-[#3fb950]"
                                            : completionRate >= 70
                                                ? "bg-[#58a6ff]"
                                                : "bg-[#d29922]"
                                            }`}
                                        style={{ height: completedHeight }}
                                    >
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#161b22] text-[#c9d1d9] text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap border border-[#30363d]">
                                            {sprint.completed} pts
                                        </div>
                                    </div>
                                </div>

                                {/* Sprint Label */}
                                <div className="text-center mt-2">
                                    <p className="text-xs text-[#c9d1d9] font-medium">
                                        {sprint.name}
                                    </p>
                                    <p
                                        className={`text-[10px] ${completionRate >= 90
                                            ? "text-[#3fb950]"
                                            : completionRate >= 70
                                                ? "text-[#58a6ff]"
                                                : "text-[#d29922]"
                                            }`}
                                    >
                                        {completionRate}%
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-[#30363d]">
                <div className="text-center">
                    <p className="text-xl font-bold text-[#c9d1d9]">
                        {sprints.reduce((sum, s) => sum + s.completed, 0)}
                    </p>
                    <p className="text-xs text-[#8b949e]">Total Completed</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold text-[#c9d1d9]">{sprints.length}</p>
                    <p className="text-xs text-[#8b949e]">Sprints</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold text-[#c9d1d9]">
                        {Math.round(
                            (sprints.reduce((sum, s) => sum + s.completed, 0) /
                                sprints.reduce((sum, s) => sum + s.planned, 0)) *
                            100,
                        )}
                        %
                    </p>
                    <p className="text-xs text-[#8b949e]">Avg Completion</p>
                </div>
            </div>
        </div>
    );
}

export default SprintVelocity;
