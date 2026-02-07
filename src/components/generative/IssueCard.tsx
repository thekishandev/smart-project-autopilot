"use client";

/**
 * @file IssueCard.tsx
 * @description A detailed issue card component showing full issue information
 */

import type { IssueCardProps, Priority, PRStatus } from "@/lib/schemas";

const priorityConfig: Record<
    Priority,
    { icon: string; color: string; bg: string }
> = {
    urgent: {
        icon: "🔴",
        color: "text-red-400",
        bg: "bg-red-500/10 border-red-500/30",
    },
    high: {
        icon: "🟠",
        color: "text-orange-400",
        bg: "bg-orange-500/10 border-orange-500/30",
    },
    medium: {
        icon: "🟡",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10 border-yellow-500/30",
    },
    low: {
        icon: "🔵",
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/30",
    },
};

const prStatusConfig: Record<
    PRStatus,
    { icon: string; color: string; bg: string }
> = {
    open: {
        icon: "⬤",
        color: "text-[#3fb950]",
        bg: "bg-[#3fb950]/10",
    },
    merged: {
        icon: "⬤",
        color: "text-[#a371f7]",
        bg: "bg-[#a371f7]/10",
    },
    closed: {
        icon: "⬤",
        color: "text-[#f85149]",
        bg: "bg-[#f85149]/10",
    },
};

export function IssueCard({
    id,
    title,
    description,
    status,
    priority,
    assignee,
    labels,
    createdAt,
    linkedPRs,
    comments,
}: IssueCardProps) {
    // Handle streaming
    if (!id || !title) {
        return (
            <div className="w-full max-w-md p-4 animate-pulse bg-[#161b22] rounded-xl border border-[#30363d]">
                <div className="h-6 bg-[#21262d] rounded w-24 mb-3" />
                <div className="h-5 bg-[#21262d] rounded w-full mb-2" />
                <div className="h-4 bg-[#21262d] rounded w-3/4 mb-4" />
                <div className="h-20 bg-[#21262d] rounded" />
            </div>
        );
    }

    const priorityInfo = priorityConfig[priority] || priorityConfig.medium;
    const createdDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="w-full max-w-lg bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden hover:border-[#58a6ff] transition-all">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#30363d]">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-mono text-[#58a6ff]">{id}</span>
                            <span
                                className={`text-xs px-2 py-0.5 rounded-full border ${priorityInfo.bg}`}
                            >
                                {priorityInfo.icon} {priority}
                            </span>
                        </div>
                        <h3 className="text-base font-medium text-[#c9d1d9]">{title}</h3>
                    </div>
                    <span className="text-xs text-[#8b949e] bg-[#21262d] px-2 py-1 rounded capitalize">
                        {status?.replace("_", " ")}
                    </span>
                </div>
            </div>

            {/* Description */}
            <div className="px-5 py-4 border-b border-[#30363d]">
                <p className="text-sm text-[#8b949e] leading-relaxed">
                    {description || "No description provided."}
                </p>
            </div>

            {/* Labels */}
            {labels && labels.length > 0 && (
                <div className="px-5 py-3 border-b border-[#30363d]">
                    <div className="flex flex-wrap gap-1.5">
                        {labels.map((label) => (
                            <span
                                key={label}
                                className="text-xs px-2 py-0.5 rounded-full bg-[#21262d] text-[#c9d1d9] border border-[#30363d]"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Linked PRs */}
            {linkedPRs && linkedPRs.length > 0 && (
                <div className="px-5 py-3 border-b border-[#30363d]">
                    <p className="text-xs text-[#8b949e] mb-2">Linked Pull Requests</p>
                    <div className="space-y-2">
                        {linkedPRs.map((pr) => {
                            const prStatus = prStatusConfig[pr.status] || prStatusConfig.open;
                            return (
                                <div
                                    key={pr.number}
                                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${prStatus.bg}`}
                                >
                                    <span className={prStatus.color}>●</span>
                                    <span className="text-[#c9d1d9] flex-1 truncate">
                                        #{pr.number} {pr.title}
                                    </span>
                                    <span className={`text-xs capitalize ${prStatus.color}`}>
                                        {pr.status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="px-5 py-3 flex items-center justify-between bg-[#0d1117]">
                <div className="flex items-center gap-3">
                    {assignee && (
                        <div className="flex items-center gap-2">
                            {assignee.avatar ? (
                                <img
                                    src={assignee.avatar}
                                    alt={assignee.name}
                                    className="w-6 h-6 rounded-full border border-[#30363d]"
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#58a6ff] to-[#a371f7] flex items-center justify-center text-[10px] text-white font-medium">
                                    {assignee.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <span className="text-xs text-[#c9d1d9]">{assignee.name}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 text-xs text-[#8b949e]">
                    {comments !== undefined && (
                        <span className="flex items-center gap-1">
                            💬 {comments}
                        </span>
                    )}
                    <span>Created {createdDate}</span>
                </div>
            </div>
        </div>
    );
}

export default IssueCard;
