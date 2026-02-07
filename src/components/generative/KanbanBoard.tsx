"use client";

/**
 * @file KanbanBoard.tsx
 * @description A Kanban board component showing issues organized by status columns
 */

import type { KanbanBoardProps, KanbanIssue, Priority } from "@/lib/schemas";
import { CyberSkeleton } from "@/components/ui/skeleton";

// Priority badge colors
const priorityColors: Record<Priority, string> = {
    urgent: "bg-red-500/20 text-red-400 border-red-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const priorityIcons: Record<Priority, string> = {
    urgent: "🔴",
    high: "🟠",
    medium: "🟡",
    low: "🔵",
};

function IssueItem({ issue }: { issue: KanbanIssue }) {
    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 hover:border-[#58a6ff] transition-all cursor-pointer group">
            {/* Issue ID */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#8b949e] font-mono">{issue.id}</span>
                <span className="text-xs">{priorityIcons[issue.priority]}</span>
            </div>

            {/* Title */}
            <h4 className="text-sm text-[#c9d1d9] font-medium mb-2 group-hover:text-[#58a6ff] transition-colors">
                {issue.title}
            </h4>

            {/* Labels */}
            {issue.labels && issue.labels.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                    {issue.labels.slice(0, 3).map((label) => (
                        <span
                            key={label}
                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#21262d] text-[#8b949e] border border-[#30363d]"
                        >
                            {label}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#21262d]">
                {issue.assignee && (
                    <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#58a6ff] to-[#a371f7] flex items-center justify-center text-[10px] text-white font-medium">
                            {issue.assignee.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs text-[#8b949e]">{issue.assignee}</span>
                    </div>
                )}
                <span
                    className={`text-[10px] px-1.5 py-0.5 rounded border ${priorityColors[issue.priority]}`}
                >
                    {issue.priority}
                </span>
            </div>
        </div>
    );
}



// ... existing imports

export function KanbanBoard({ columns, title }: KanbanBoardProps) {
    // Handle streaming - show skeleton if no data yet
    if (!columns || columns.length === 0) {
        return (
            <div className="w-full p-4">
                <CyberSkeleton className="h-8 w-48 mb-6" />
                <div className="flex gap-4 overflow-hidden">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex-1 min-w-[300px]">
                            <CyberSkeleton className="h-[400px] w-full" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-4 bg-[#0d1117] rounded-xl border border-[#30363d]">
            {/* Header */}
            {title && (
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[#c9d1d9]">{title}</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[#8b949e]">
                            {columns.reduce((acc, col) => acc + (col.issues?.length || 0), 0)} issues
                        </span>
                    </div>
                </div>
            )}

            {/* Columns */}
            <div className="flex gap-4 overflow-x-auto pb-4">
                {columns.map((column, colIndex) => {
                    const issues = column.issues || [];
                    return (
                        <div
                            key={`${column.id}-${colIndex}`}
                            className="flex-shrink-0 w-[300px] bg-[#0d1117] rounded-lg"
                        >
                            {/* Column Header */}
                            <div className="flex items-center justify-between mb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: column.color || "#8b949e" }}
                                    />
                                    <h3 className="text-sm font-medium text-[#c9d1d9]">
                                        {column.title}
                                    </h3>
                                    <span className="text-xs text-[#8b949e] bg-[#21262d] px-2 py-0.5 rounded-full">
                                        {issues.length}
                                    </span>
                                </div>
                            </div>

                            {/* Issues */}
                            <div className="space-y-2 min-h-[200px]">
                                {issues.map((issue, issueIndex) => (
                                    <IssueItem key={`${issue.id}-${issueIndex}`} issue={issue} />
                                ))}
                                {issues.length === 0 && (
                                    <div className="text-center py-8 text-[#8b949e] text-sm border border-dashed border-[#30363d] rounded-lg">
                                        No issues
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


export default KanbanBoard;
