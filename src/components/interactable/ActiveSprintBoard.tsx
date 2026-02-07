"use client";

/**
 * @file ActiveSprintBoard.tsx
 * @description Interactable sprint board - AI can update tasks
 * Styled to match cyberpunk landing page design
 */

import { z } from "zod";
import { withInteractable } from "@tambo-ai/react";
import type { Priority } from "@/lib/schemas";

// ============================================
// SCHEMA
// ============================================

const SprintTaskSchema = z.object({
    id: z.string().describe("Task identifier"),
    title: z.string().describe("Task title"),
    status: z
        .enum(["todo", "in_progress", "in_review", "done"])
        .describe("Task status"),
    priority: z.enum(["urgent", "high", "medium", "low"]).describe("Priority"),
    assignee: z.string().optional().describe("Assignee name"),
    points: z.number().optional().describe("Story points"),
});

export const ActiveSprintBoardSchema = z.object({
    sprintName: z.string().describe("Sprint name e.g. 'Sprint 12'"),
    startDate: z.string().describe("Sprint start date in ISO format"),
    endDate: z.string().describe("Sprint end date in ISO format"),
    tasks: z.array(SprintTaskSchema).describe("Tasks in the sprint"),
});

export type SprintTask = z.infer<typeof SprintTaskSchema>;
export type ActiveSprintBoardProps = z.infer<typeof ActiveSprintBoardSchema>;

// ============================================
// COMPONENT - Cyberpunk Terminal Style
// ============================================

const priorityColors: Record<Priority, { border: string; bg: string }> = {
    urgent: { border: "#ff5f1f", bg: "rgba(255,95,31,0.1)" },
    high: { border: "#ffb800", bg: "rgba(255,184,0,0.1)" },
    medium: { border: "#00f3ff", bg: "rgba(0,243,255,0.05)" },
    low: { border: "#666666", bg: "rgba(102,102,102,0.05)" },
};

const columns = [
    { id: "todo", title: "INPUT_QUEUE", color: "#666666" },
    { id: "in_progress", title: "PROCESSING", color: "#00f3ff" },
    { id: "in_review", title: "REVIEW", color: "#bd00ff" },
    { id: "done", title: "COMPLETED", color: "#0aff0a" },
];

function SprintBoard({
    sprintName,
    startDate,
    endDate,
    tasks,
}: ActiveSprintBoardProps) {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const elapsedDays = Math.max(0, (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const progressPercent = Math.min(100, (elapsedDays / totalDays) * 100);

    const doneTasks = tasks?.filter((t) => t.status === "done").length || 0;
    const totalTasks = tasks?.length || 0;
    const completionPercent = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

    return (
        <div className="w-full overflow-hidden bg-[#050505] border border-[#1a1a1a]">
            {/* Header - Terminal Style */}
            <div className="px-6 py-4 bg-black border-b border-[#1a1a1a] relative">
                {/* Corner Notches */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f3ff]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f3ff]" />

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-[#00f3ff] font-mono text-lg">⚡</span>
                        <div>
                            <h2 className="font-mono font-bold text-xl text-white tracking-tight uppercase">
                                {sprintName || "CURRENT_SPRINT"}
                            </h2>
                            <p className="text-xs text-[#666666] font-mono">
                                {new Date(startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                {" → "}
                                {new Date(endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </p>
                        </div>
                        <span className="ml-2 px-2 py-0.5 text-[10px] font-mono bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/40 uppercase">
                            [ACTIVE]
                        </span>
                    </div>
                    <div className="text-right">
                        <p
                            className="font-mono text-3xl font-bold"
                            style={{ color: completionPercent > 50 ? "#0aff0a" : "#ffb800" }}
                        >
                            {Math.round(completionPercent)}%
                        </p>
                        <p className="text-[10px] text-[#666666] font-mono uppercase">
                            {doneTasks}/{totalTasks} TASKS
                        </p>
                    </div>
                </div>

                {/* Progress bars - Sharp style */}
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[#666666] font-mono w-12 uppercase">TIME</span>
                        <div className="flex-1 h-[2px] overflow-hidden bg-[#1a1a1a]">
                            <div
                                className="h-full transition-all duration-500"
                                style={{
                                    width: `${progressPercent}%`,
                                    background: "#00f3ff",
                                    boxShadow: "0 0 10px rgba(0,243,255,0.5)",
                                }}
                            />
                        </div>
                        <span className="text-[10px] font-mono w-10 text-right text-[#00f3ff]">
                            {Math.round(progressPercent)}%
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[#666666] font-mono w-12 uppercase">DONE</span>
                        <div className="flex-1 h-[2px] overflow-hidden bg-[#1a1a1a]">
                            <div
                                className="h-full transition-all duration-500"
                                style={{
                                    width: `${completionPercent}%`,
                                    background: "#0aff0a",
                                    boxShadow: "0 0 10px rgba(10,255,10,0.5)",
                                }}
                            />
                        </div>
                        <span className="text-[10px] font-mono w-10 text-right text-[#0aff0a]">
                            {Math.round(completionPercent)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Columns - Sharp grid style */}
            <div className="grid grid-cols-4 divide-x divide-[#1a1a1a]">
                {columns.map((column) => {
                    const columnTasks = tasks?.filter((t) => t.status === column.id) || [];
                    const columnPoints = columnTasks.reduce((sum, t) => sum + (t.points || 0), 0);
                    const isActive = column.id === "in_progress";

                    return (
                        <div key={column.id} className={`min-h-[280px] ${isActive ? "bg-[#00f3ff]/5" : ""}`}>
                            {/* Column Header */}
                            <div className={`px-4 py-3 flex items-center justify-between bg-black border-b ${isActive ? "border-[#00f3ff]" : "border-[#1a1a1a]"}`}>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2"
                                        style={{ background: column.color, boxShadow: `0 0 8px ${column.color}` }}
                                    />
                                    <span
                                        className="text-xs font-mono font-bold tracking-wide uppercase"
                                        style={{ color: column.color }}
                                    >
                                        {column.title}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-mono ${isActive ? "bg-[#00f3ff] text-black px-1 font-bold" : "text-[#666666]"}`}>
                                    [{columnTasks.length.toString().padStart(2, "0")}]
                                </span>
                            </div>

                            {/* Tasks */}
                            <div className="p-2 space-y-2">
                                {columnTasks.map((task) => {
                                    const pColor = priorityColors[task.priority];
                                    const isDone = column.id === "done";
                                    return (
                                        <div
                                            key={task.id}
                                            className={`p-3 cursor-pointer transition-all hover:-translate-y-0.5 border ${isDone ? "opacity-60 hover:opacity-100" : ""}`}
                                            style={{
                                                background: pColor.bg,
                                                borderColor: isActive && !isDone ? "#00f3ff" : `${pColor.border}30`,
                                                borderLeftWidth: "3px",
                                                borderLeftColor: pColor.border,
                                            }}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <p
                                                    className={`text-[10px] font-mono tracking-wide ${isDone ? "line-through" : ""}`}
                                                    style={{ color: pColor.border }}
                                                >
                                                    {task.id}
                                                </p>
                                                {task.points && (
                                                    <span className="text-[10px] px-1 font-mono bg-[#1a1a1a] text-[#666666] border border-[#333]">
                                                        {task.points}pts
                                                    </span>
                                                )}
                                            </div>
                                            <p className={`text-sm text-white font-mono mb-2 leading-tight uppercase ${isDone ? "line-through text-[#666666]" : ""}`}>
                                                {task.title}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                {task.assignee && (
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-5 h-5 flex items-center justify-center text-[9px] font-mono font-bold bg-[#00f3ff] text-black">
                                                            {task.assignee.charAt(0)}
                                                        </div>
                                                        <span className="text-[10px] text-[#666666] font-mono uppercase">
                                                            {task.assignee}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {columnTasks.length === 0 && (
                                    <div className="text-center py-8 text-[#333] text-xs font-mono uppercase">
                                        [ EMPTY ]
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ============================================
// INTERACTABLE EXPORT
// ============================================

export const InteractableSprintBoard = withInteractable(SprintBoard, {
    componentName: "ActiveSprintBoard",
    description:
        "The current sprint board showing active tasks. AI can add tasks, move tasks between columns, update assignees, or mark tasks as done.",
    propsSchema: ActiveSprintBoardSchema,
});

export default SprintBoard;
