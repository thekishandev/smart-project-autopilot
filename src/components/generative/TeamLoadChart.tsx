"use client";

/**
 * @file TeamLoadChart.tsx
 * @description A chart showing team capacity and workload distribution
 */

import type { TeamLoadChartProps, TeamMember } from "@/lib/schemas";

function getLoadColor(assigned: number, capacity: number): string {
    const ratio = assigned / capacity;
    if (ratio > 1) return "bg-[#f85149]"; // Overloaded
    if (ratio > 0.9) return "bg-[#d29922]"; // Near capacity
    if (ratio > 0.6) return "bg-[#58a6ff]"; // Good load
    return "bg-[#3fb950]"; // Underutilized
}

function getLoadLabel(assigned: number, capacity: number): string {
    const ratio = assigned / capacity;
    if (ratio > 1) return "Overloaded";
    if (ratio > 0.9) return "At Capacity";
    if (ratio > 0.6) return "Good";
    return "Available";
}

function MemberCard({ member }: { member: TeamMember }) {
    const loadRatio = (member.assigned / member.capacity) * 100;
    const isOverloaded = member.assigned > member.capacity;

    return (
        <div
            className={`bg-[#161b22] border rounded-xl p-4 transition-all hover:border-[#58a6ff] ${isOverloaded ? "border-[#f85149]" : "border-[#30363d]"
                }`}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                    {member.avatar ? (
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full border-2 border-[#30363d]"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#58a6ff] to-[#a371f7] flex items-center justify-center text-lg text-white font-medium">
                            {member.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    {isOverloaded && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f85149] border-2 border-[#161b22] flex items-center justify-center text-[8px] text-white">
                            !
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#c9d1d9]">{member.name}</h3>
                    <p className="text-xs text-[#8b949e]">
                        {member.assigned} / {member.capacity} pts
                    </p>
                </div>
                <div
                    className={`px-2 py-1 rounded text-xs font-medium ${isOverloaded
                        ? "bg-[#f85149]/20 text-[#f85149]"
                        : loadRatio > 90
                            ? "bg-[#d29922]/20 text-[#d29922]"
                            : loadRatio > 60
                                ? "bg-[#58a6ff]/20 text-[#58a6ff]"
                                : "bg-[#3fb950]/20 text-[#3fb950]"
                        }`}
                >
                    {getLoadLabel(member.assigned, member.capacity)}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="h-2 bg-[#21262d] rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all ${getLoadColor(member.assigned, member.capacity)}`}
                        style={{ width: `${Math.min(loadRatio, 100)}%` }}
                    />
                </div>
                {isOverloaded && (
                    <p className="text-xs text-[#f85149] mt-1">
                        ⚠️ {member.assigned - member.capacity} pts over capacity
                    </p>
                )}
            </div>

            {/* Tasks */}
            <div className="space-y-1.5">
                <p className="text-xs text-[#8b949e] mb-2">
                    Assigned Tasks ({member.tasks?.length || 0})
                </p>
                {(member.tasks || []).slice(0, 4).map((task, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between text-xs bg-[#0d1117] px-2 py-1.5 rounded"
                    >
                        <span className="text-[#c9d1d9] truncate flex-1">{task.title}</span>
                        <span className="text-[#8b949e] ml-2 flex-shrink-0">
                            {task.points} pts
                        </span>
                    </div>
                ))}
                {member.tasks.length > 4 && (
                    <p className="text-xs text-[#8b949e] text-center pt-1">
                        +{member.tasks.length - 4} more
                    </p>
                )}
            </div>
        </div>
    );
}

import { CyberSkeleton } from "@/components/ui/skeleton";

export function TeamLoadChart({ members }: TeamLoadChartProps) {
    // Handle streaming
    if (!members || members.length === 0) {
        return (
            <div className="w-full p-4">
                <CyberSkeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <CyberSkeleton key={i} className="h-64 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    // Calculate team stats
    const totalCapacity = members.reduce((sum, m) => sum + m.capacity, 0);
    const totalAssigned = members.reduce((sum, m) => sum + m.assigned, 0);
    const overloadedCount = members.filter(
        (m) => m.assigned > m.capacity,
    ).length;

    return (
        <div className="w-full bg-[#0d1117] rounded-xl border border-[#30363d] p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-[#c9d1d9]">
                        👥 Team Workload
                    </h2>
                    <p className="text-sm text-[#8b949e]">
                        {members.length} team members • {totalAssigned}/{totalCapacity} pts
                        allocated
                    </p>
                </div>
                {overloadedCount > 0 && (
                    <div className="px-3 py-1.5 rounded-lg bg-[#f85149]/10 border border-[#f85149]/30 text-[#f85149] text-sm">
                        ⚠️ {overloadedCount} overloaded
                    </div>
                )}
            </div>

            {/* Team Summary Bar */}
            <div className="mb-6 p-4 bg-[#161b22] rounded-lg border border-[#30363d]">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#8b949e]">Team Utilization</span>
                    <span className="text-sm text-[#c9d1d9] font-medium">
                        {Math.round((totalAssigned / totalCapacity) * 100)}%
                    </span>
                </div>
                <div className="h-3 bg-[#21262d] rounded-full overflow-hidden flex">
                    {members.map((member, i) => {
                        const widthPercent = (member.assigned / totalCapacity) * 100;
                        return (
                            <div
                                key={member.id}
                                className={`h-full transition-all ${getLoadColor(member.assigned, member.capacity)}`}
                                style={{ width: `${widthPercent}%` }}
                                title={`${member.name}: ${member.assigned} pts`}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Member Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
}

export default TeamLoadChart;
