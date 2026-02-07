"use client";

/**
 * @file StandupSummary.tsx
 * @description AI-generated standup summary component
 */

import type { StandupSummaryProps } from "@/lib/schemas";

import { CyberSkeleton } from "@/components/ui/skeleton";

export function StandupSummary({
    date,
    completed,
    inProgress,
    blockers,
    highlights,
}: StandupSummaryProps) {
    // Handle streaming
    if (!date) {
        return (
            <div className="w-full p-4">
                <CyberSkeleton className="h-8 w-48 mb-6" />
                <div className="space-y-4">
                    <CyberSkeleton className="h-24 w-full" />
                    <CyberSkeleton className="h-24 w-full" />
                    <CyberSkeleton className="h-24 w-full" />
                </div>
            </div>
        );
    }

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="w-full bg-[#0d1117] rounded-xl border border-[#30363d] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#161b22] to-[#21262d] border-b border-[#30363d]">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[#c9d1d9]">
                            📋 Daily Standup Summary
                        </h2>
                        <p className="text-sm text-[#8b949e]">{formattedDate}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-[#3fb950]">
                            <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
                            {completed?.length || 0} done
                        </div>
                        <div className="flex items-center gap-1.5 text-[#58a6ff]">
                            <span className="w-2 h-2 rounded-full bg-[#58a6ff]" />
                            {inProgress?.length || 0} active
                        </div>
                        <div className="flex items-center gap-1.5 text-[#f85149]">
                            <span className="w-2 h-2 rounded-full bg-[#f85149]" />
                            {blockers?.length || 0} blocked
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
                <div className="px-6 py-4 bg-gradient-to-r from-[#58a6ff]/5 to-transparent border-b border-[#30363d]">
                    <div className="flex items-start gap-3">
                        <span className="text-lg">✨</span>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[#58a6ff] mb-2">
                                Key Highlights
                            </p>
                            <ul className="space-y-1">
                                {highlights.map((highlight, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-[#c9d1d9] flex items-start gap-2"
                                    >
                                        <span className="text-[#58a6ff]">•</span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#30363d]">
                {/* Completed */}
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-lg bg-[#3fb950]/10 flex items-center justify-center text-lg">
                            ✅
                        </span>
                        <div>
                            <h3 className="text-sm font-medium text-[#c9d1d9]">Completed</h3>
                            <p className="text-xs text-[#8b949e]">Yesterday</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {completed && completed.length > 0 ? (
                            completed.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-2 text-sm bg-[#161b22] rounded-lg px-3 py-2"
                                >
                                    <span className="text-[#3fb950] mt-0.5">✓</span>
                                    <div className="flex-1">
                                        <p className="text-[#c9d1d9]">{item.issue}</p>
                                        <p className="text-xs text-[#8b949e]">by {item.assignee}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-[#8b949e] italic">
                                No completed items
                            </p>
                        )}
                    </div>
                </div>

                {/* In Progress */}
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-lg bg-[#58a6ff]/10 flex items-center justify-center text-lg">
                            🔄
                        </span>
                        <div>
                            <h3 className="text-sm font-medium text-[#c9d1d9]">
                                In Progress
                            </h3>
                            <p className="text-xs text-[#8b949e]">Today</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {inProgress && inProgress.length > 0 ? (
                            inProgress.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-2 text-sm bg-[#161b22] rounded-lg px-3 py-2"
                                >
                                    <span className="text-[#58a6ff] mt-0.5">→</span>
                                    <div className="flex-1">
                                        <p className="text-[#c9d1d9]">{item.issue}</p>
                                        <p className="text-xs text-[#8b949e]">by {item.assignee}</p>
                                        {item.blockers && item.blockers.length > 0 && (
                                            <div className="mt-1 flex flex-wrap gap-1">
                                                {item.blockers.map((blocker, j) => (
                                                    <span
                                                        key={j}
                                                        className="text-[10px] px-1.5 py-0.5 rounded bg-[#f85149]/10 text-[#f85149]"
                                                    >
                                                        ⚠️ {blocker}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-[#8b949e] italic">
                                No items in progress
                            </p>
                        )}
                    </div>
                </div>

                {/* Blockers */}
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-lg bg-[#f85149]/10 flex items-center justify-center text-lg">
                            🚧
                        </span>
                        <div>
                            <h3 className="text-sm font-medium text-[#c9d1d9]">Blockers</h3>
                            <p className="text-xs text-[#8b949e]">Need attention</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {blockers && blockers.length > 0 ? (
                            blockers.map((item, i) => (
                                <div
                                    key={i}
                                    className="text-sm bg-[#161b22] rounded-lg px-3 py-2 border-l-2 border-[#f85149]"
                                >
                                    <p className="text-[#c9d1d9] font-medium">{item.issue}</p>
                                    <p className="text-xs text-[#f85149] mt-1">{item.reason}</p>
                                    {item.suggestedAction && (
                                        <div className="mt-2 flex items-start gap-1.5 text-xs text-[#3fb950] bg-[#3fb950]/5 px-2 py-1 rounded">
                                            <span>💡</span>
                                            <span>{item.suggestedAction}</span>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-[#3fb950] bg-[#3fb950]/10 rounded-lg px-3 py-2 text-center">
                                🎉 No blockers!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StandupSummary;
