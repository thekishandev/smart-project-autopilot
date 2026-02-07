"use client";

/**
 * @file GanttChart.tsx
 * @description A Gantt chart component showing project timeline with tasks and dependencies
 */

import type { GanttChartProps, GanttTask } from "@/lib/schemas";
import { useMemo } from "react";

// Calculate days between two dates
function daysBetween(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
}

// Get the offset from the start date
function getOffset(projectStart: string, taskStart: string): number {
    return daysBetween(projectStart, taskStart);
}

// Progress bar colors based on completion
function getProgressColor(progress: number): string {
    if (progress >= 100) return "bg-[#3fb950]";
    if (progress >= 50) return "bg-[#58a6ff]";
    if (progress >= 25) return "bg-[#d29922]";
    return "bg-[#f85149]";
}

function TaskRow({
    task,
    projectStart,
    totalDays,
    index,
}: {
    task: GanttTask;
    projectStart: string;
    totalDays: number;
    index: number;
}) {
    const offset = getOffset(projectStart, task.startDate);
    const duration = daysBetween(task.startDate, task.endDate);
    const leftPercent = (offset / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;

    return (
        <div
            className={`flex items-center h-12 ${index % 2 === 0 ? "bg-[#0d1117]" : "bg-[#161b22]"}`}
        >
            {/* Task Info */}
            <div className="w-64 flex-shrink-0 px-4 flex items-center gap-3 border-r border-[#30363d]">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#58a6ff] to-[#a371f7] flex items-center justify-center text-[10px] text-white font-medium">
                    {task.assignee?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#c9d1d9] truncate">{task.title}</p>
                    <p className="text-xs text-[#8b949e]">{task.assignee || "Unassigned"}</p>
                </div>
            </div>

            {/* Timeline Bar */}
            <div className="flex-1 relative h-full px-2">
                <div
                    className="absolute top-1/2 -translate-y-1/2 h-7 rounded-md bg-[#21262d] border border-[#30363d] overflow-hidden group hover:border-[#58a6ff] transition-all cursor-pointer"
                    style={{
                        left: `${leftPercent}%`,
                        width: `${Math.max(widthPercent, 5)}%`,
                    }}
                >
                    {/* Progress Fill */}
                    <div
                        className={`h-full ${getProgressColor(task.progress)} transition-all`}
                        style={{ width: `${task.progress}%` }}
                    />

                    {/* Progress Label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] text-white font-medium drop-shadow-md">
                            {task.progress}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { CyberSkeleton } from "@/components/ui/skeleton";

export function GanttChart({ tasks, milestones }: GanttChartProps) {
    // Handle streaming
    if (!tasks || tasks.length === 0) {
        return (
            <div className="w-full p-4">
                <CyberSkeleton className="h-8 w-48 mb-6" />
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-4">
                            <CyberSkeleton className="h-12 w-64" />
                            <CyberSkeleton className="h-12 flex-1" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Calculate project timeline bounds
    const { projectStart, projectEnd, totalDays, dateHeaders } = useMemo(() => {
        const dates = tasks.flatMap((t) => [new Date(t.startDate), new Date(t.endDate)]);
        const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
        const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

        // Add some padding
        minDate.setDate(minDate.getDate() - 2);
        maxDate.setDate(maxDate.getDate() + 2);

        const start = minDate.toISOString().split("T")[0];
        const end = maxDate.toISOString().split("T")[0];
        const days = daysBetween(start, end);

        // Generate date headers (weekly)
        const headers: string[] = [];
        const current = new Date(start);
        while (current <= maxDate) {
            headers.push(
                current.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            );
            current.setDate(current.getDate() + 7);
        }

        return { projectStart: start, projectEnd: end, totalDays: days, dateHeaders: headers };
    }, [tasks]);

    return (
        <div className="w-full bg-[#0d1117] rounded-xl border border-[#30363d] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d]">
                <h2 className="text-lg font-semibold text-[#c9d1d9]">📊 Project Timeline</h2>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-[#3fb950]" /> Complete
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-[#58a6ff]" /> In Progress
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-[#d29922]" /> Started
                    </span>
                </div>
            </div>

            {/* Date Headers */}
            <div className="flex items-center h-10 bg-[#161b22] border-b border-[#30363d]">
                <div className="w-64 flex-shrink-0 px-4 text-xs font-medium text-[#8b949e] border-r border-[#30363d]">
                    Task
                </div>
                <div className="flex-1 flex items-center px-2">
                    {dateHeaders.map((date, i) => (
                        <div
                            key={i}
                            className="flex-1 text-xs text-[#8b949e] text-center"
                            style={{ minWidth: `${100 / dateHeaders.length}%` }}
                        >
                            {date}
                        </div>
                    ))}
                </div>
            </div>

            {/* Task Rows */}
            <div className="divide-y divide-[#30363d]">
                {tasks.map((task, index) => (
                    <TaskRow
                        key={task.id}
                        task={task}
                        projectStart={projectStart}
                        totalDays={totalDays}
                        index={index}
                    />
                ))}
            </div>

            {/* Milestones */}
            {milestones && milestones.length > 0 && (
                <div className="flex items-center gap-4 px-4 py-3 border-t border-[#30363d] bg-[#161b22]">
                    <span className="text-xs text-[#8b949e]">Milestones:</span>
                    {milestones.map((milestone) => (
                        <div
                            key={milestone.id}
                            className="flex items-center gap-1.5 text-xs text-[#c9d1d9] bg-[#21262d] px-2 py-1 rounded-full border border-[#30363d]"
                        >
                            <span className="text-[#d29922]">◆</span>
                            {milestone.title}
                            <span className="text-[#8b949e]">
                                ({new Date(milestone.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })})
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GanttChart;
