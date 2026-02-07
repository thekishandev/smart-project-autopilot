"use client";

/**
 * @file TeamAssignmentPanel.tsx
 * @description Team assignment panel - AI can update member assignments
 * Styled to match cyberpunk landing page design
 */

import { z } from "zod";
import { withInteractable } from "@tambo-ai/react";
import { Users, AlertCircle, CheckCircle2 } from "lucide-react";

// ============================================
// SCHEMA
// ============================================

const TaskAssignmentSchema = z.object({
    id: z.string().describe("Task ID"),
    title: z.string().describe("Task title"),
    points: z.number().optional().describe("Story points"),
    status: z.string().optional().describe("Task status"),
});

const TeamMemberSchema = z.object({
    id: z.string().describe("Member identifier"),
    name: z.string().describe("Member full name"),
    role: z.string().describe("Job title/role"),
    avatar: z.string().optional().describe("Avatar URL"),
    capacity: z.number().describe("Total capacity in points"),
    assigned: z.number().describe("Currently assigned points"),
    tasks: z.array(TaskAssignmentSchema).optional().describe("Assigned tasks"),
});

export const TeamAssignmentPanelSchema = z.object({
    members: z.array(TeamMemberSchema).describe("Team members"),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamAssignmentPanelProps = z.infer<typeof TeamAssignmentPanelSchema>;

// ============================================
// COMPONENT - Cyberpunk Terminal Style
// ============================================

function getLoadStatus(assigned: number, capacity: number) {
    const ratio = assigned / capacity;
    if (ratio >= 1) {
        return { label: "OVERLOADED", color: "#ff5f1f", Icon: AlertCircle };
    } else if (ratio >= 0.8) {
        return { label: "HIGH_LOAD", color: "#ffb800", Icon: AlertCircle };
    } else if (ratio >= 0.5) {
        return { label: "OPTIMAL", color: "#0aff0a", Icon: CheckCircle2 };
    } else {
        return { label: "AVAILABLE", color: "#00f3ff", Icon: CheckCircle2 };
    }
}

function TeamAssignmentPanel({ members }: TeamAssignmentPanelProps) {
    const totalCapacity = members?.reduce((sum, m) => sum + m.capacity, 0) || 0;
    const totalAssigned = members?.reduce((sum, m) => sum + m.assigned, 0) || 0;
    const availableCapacity = totalCapacity - totalAssigned;

    return (
        <div className="h-full overflow-hidden bg-[#050505] border border-[#1a1a1a] relative">
            {/* Corner Notches */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#0aff0a] z-10" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#0aff0a] z-10" />

            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between bg-black border-b border-[#1a1a1a]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0aff0a]/10 border border-[#0aff0a]/40 flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#0aff0a]" />
                    </div>
                    <div>
                        <h2 className="font-mono font-bold text-white text-lg tracking-tight uppercase">
                            Squad_Load
                        </h2>
                        <p className="text-[10px] text-[#666666] font-mono uppercase">
                            {members?.length || 0} members • {totalAssigned}/{totalCapacity} pts
                        </p>
                    </div>
                </div>
                <div
                    className="px-3 py-1 text-[10px] font-mono bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30 uppercase"
                >
                    {availableCapacity} AVAILABLE
                </div>
            </div>

            {/* Team Members Grid */}
            <div className="p-4 grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto scrollbar-hidden">
                {members?.map((member) => {
                    const status = getLoadStatus(member.assigned, member.capacity);
                    const StatusIcon = status.Icon;
                    const loadPercent = Math.min(100, (member.assigned / member.capacity) * 100);

                    return (
                        <div
                            key={member.id}
                            className="p-4 bg-black border border-[#1a1a1a] cursor-pointer transition-all hover:-translate-y-0.5 hover:border-[#0aff0a]/50"
                        >
                            {/* Member Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 flex items-center justify-center text-sm font-mono font-bold bg-[#00f3ff] text-black"
                                    >
                                        {member.name.split(" ").map((n) => n[0]).join("")}
                                    </div>
                                    <div>
                                        <h3 className="font-mono font-medium text-white text-sm leading-tight uppercase">
                                            {member.name}
                                        </h3>
                                        <p className="text-[10px] text-[#666666] font-mono tracking-wide uppercase">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono uppercase"
                                    style={{
                                        background: `${status.color}15`,
                                        color: status.color,
                                        border: `1px solid ${status.color}30`,
                                    }}
                                >
                                    <StatusIcon className="w-3 h-3" />
                                    {status.label}
                                </div>
                            </div>

                            {/* Capacity Bar - Sharp style */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-[#666666] font-mono uppercase">WORKLOAD</span>
                                    <span style={{ color: status.color }} className="font-mono font-semibold">
                                        {member.assigned}/{member.capacity} pts
                                    </span>
                                </div>
                                <div className="h-[2px] overflow-hidden bg-[#1a1a1a]">
                                    <div
                                        className="h-full transition-all duration-500"
                                        style={{
                                            width: `${loadPercent}%`,
                                            background: status.color,
                                            boxShadow: `0 0 10px ${status.color}50`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Tasks */}
                            {member.tasks && member.tasks.length > 0 && (
                                <div className="space-y-1">
                                    {member.tasks.slice(0, 2).map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center justify-between px-2 py-1.5 text-xs bg-[#0a0a0a] border border-[#1a1a1a]"
                                        >
                                            <span className="text-[#888] font-mono truncate flex-1 uppercase">
                                                {task.title}
                                            </span>
                                            {task.points && (
                                                <span className="text-[#666666] font-mono ml-2">
                                                    {task.points}pts
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                    {member.tasks.length > 2 && (
                                        <p className="text-[10px] text-[#444] font-mono text-center pt-1 uppercase">
                                            +{member.tasks.length - 2} more tasks
                                        </p>
                                    )}
                                </div>
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

export const InteractableTeamPanel = withInteractable(TeamAssignmentPanel, {
    componentName: "TeamAssignmentPanel",
    description:
        "Team workload panel showing capacity and assignments. AI can reassign tasks between members or update capacity.",
    propsSchema: TeamAssignmentPanelSchema,
});

export default TeamAssignmentPanel;
