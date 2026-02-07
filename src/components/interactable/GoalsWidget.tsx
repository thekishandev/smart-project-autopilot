"use client";

/**
 * @file GoalsWidget.tsx
 * @description Goals Widget - AI can update goal progress
 * Styled to match cyberpunk landing page design
 */

import { z } from "zod";
import { withInteractable } from "@tambo-ai/react";
import { Target, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

// ============================================
// SCHEMA
// ============================================

const GoalSchema = z.object({
    id: z.string().describe("Goal identifier"),
    title: z.string().describe("Goal title"),
    description: z.string().optional().describe("Goal description"),
    progress: z.number().min(0).max(100).describe("Progress percentage"),
    target: z.string().optional().describe("Target description"),
    status: z
        .enum(["on_track", "at_risk", "completed", "blocked"])
        .describe("Goal status"),
    dueDate: z.string().optional().describe("Due date in ISO format"),
});

export const GoalsWidgetSchema = z.object({
    title: z.string().describe("Widget title"),
    goals: z.array(GoalSchema).describe("List of goals"),
});

export type Goal = z.infer<typeof GoalSchema>;
export type GoalsWidgetProps = z.infer<typeof GoalsWidgetSchema>;

// ============================================
// COMPONENT - Cyberpunk Terminal Style
// ============================================

const statusConfig = {
    on_track: { label: "ON_TRACK", color: "#0aff0a", Icon: TrendingUp },
    at_risk: { label: "WARNING", color: "#ffb800", Icon: AlertTriangle },
    completed: { label: "COMPLETE", color: "#00f3ff", Icon: CheckCircle2 },
    blocked: { label: "BLOCKED", color: "#ff5f1f", Icon: AlertTriangle },
};

function GoalsWidget({ title, goals }: GoalsWidgetProps) {
    const completedGoals = goals?.filter((g) => g.status === "completed").length || 0;
    const totalGoals = goals?.length || 0;
    const overallProgress = totalGoals > 0
        ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / totalGoals)
        : 0;

    return (
        <div className="h-full overflow-hidden bg-[#050505] border border-[#1a1a1a] relative">
            {/* Corner Notches */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#bd00ff] z-10" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#bd00ff] z-10" />

            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between bg-black border-b border-[#1a1a1a]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#bd00ff]/10 border border-[#bd00ff]/40 flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#bd00ff]" />
                    </div>
                    <div>
                        <h2 className="font-mono font-bold text-white text-lg tracking-tight uppercase">
                            {title || "GOALS"}
                        </h2>
                        <p className="text-[10px] text-[#666666] font-mono uppercase">
                            {completedGoals}/{totalGoals} completed
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p
                        className="font-mono text-2xl font-bold"
                        style={{ color: overallProgress >= 70 ? "#0aff0a" : "#ffb800" }}
                    >
                        {overallProgress}%
                    </p>
                    <p className="text-[10px] text-[#666666] font-mono uppercase tracking-wider">
                        Overall
                    </p>
                </div>
            </div>

            {/* Goals List */}
            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto scrollbar-hidden">
                {goals?.map((goal) => {
                    const config = statusConfig[goal.status];
                    const Icon = config.Icon;

                    return (
                        <div
                            key={goal.id}
                            className="p-4 bg-black border border-[#1a1a1a] cursor-pointer transition-all hover:-translate-y-0.5 hover:border-[#bd00ff]/50"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" style={{ color: config.color }} />
                                    <h3 className="font-mono font-medium text-white text-sm uppercase">
                                        {goal.title}
                                    </h3>
                                </div>
                                <span
                                    className="text-[10px] font-mono px-2 py-0.5 tracking-wide uppercase"
                                    style={{
                                        background: `${config.color}15`,
                                        color: config.color,
                                        border: `1px solid ${config.color}30`,
                                    }}
                                >
                                    {config.label}
                                </span>
                            </div>

                            {goal.description && (
                                <p className="text-xs text-[#666666] font-mono mb-3 leading-relaxed">
                                    &gt; {goal.description}
                                </p>
                            )}

                            {/* Progress bar - Sharp style */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-[#666666] font-mono uppercase">
                                        {goal.target && `Target: ${goal.target}`}
                                    </span>
                                    <span style={{ color: config.color }} className="font-mono font-semibold">
                                        {goal.progress}%
                                    </span>
                                </div>
                                <div className="h-[2px] overflow-hidden bg-[#1a1a1a]">
                                    <div
                                        className="h-full transition-all duration-500"
                                        style={{
                                            width: `${goal.progress}%`,
                                            background: config.color,
                                            boxShadow: `0 0 10px ${config.color}50`,
                                        }}
                                    />
                                </div>
                            </div>

                            {goal.dueDate && (
                                <p className="mt-2 text-[10px] text-[#444] font-mono uppercase">
                                    DUE: {new Date(goal.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                </p>
                            )}
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

export const InteractableGoals = withInteractable(GoalsWidget, {
    componentName: "GoalsWidget",
    description:
        "Sprint goals tracker. AI can update goal progress percentages and change status (on_track, at_risk, completed, blocked).",
    propsSchema: GoalsWidgetSchema,
});

export default GoalsWidget;
