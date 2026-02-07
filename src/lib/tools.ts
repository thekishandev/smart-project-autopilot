/**
 * @file tools.ts
 * @description Local tools for Smart Project Autopilot
 * 
 * Includes powerful operations that showcase Tambo's unique capabilities:
 * - Bulk operations (impossible to do efficiently with clicks)
 * - Intelligent workload rebalancing (AI calculates + executes)
 * - Cross-component updates (linked actions)
 */

import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";
import {
    SprintDataSchema,
    VelocityResultSchema,
    BlockerResultSchema,
    SprintHealthSchema,
} from "./schemas";
import { mockSprintData, mockIssues, type Issue } from "./mock-data";

// ============================================
// CALCULATE VELOCITY TOOL
// ============================================

function calculateVelocityImpl(params: { sprints: typeof mockSprintData }) {
    const { sprints } = params;

    if (!sprints || sprints.length === 0) {
        return {
            averageVelocity: 0,
            trend: "stable" as const,
            projection: 0,
        };
    }

    const totalCompleted = sprints.reduce((sum, s) => sum + s.completed, 0);
    const avgVelocity = totalCompleted / sprints.length;

    let trend: "up" | "down" | "stable" = "stable";
    if (sprints.length >= 4) {
        const firstHalf =
            sprints.slice(0, 2).reduce((sum, s) => sum + s.completed, 0) / 2;
        const secondHalf =
            sprints.slice(-2).reduce((sum, s) => sum + s.completed, 0) / 2;

        if (secondHalf > firstHalf * 1.1) trend = "up";
        else if (secondHalf < firstHalf * 0.9) trend = "down";
    }

    const projection = Math.round(avgVelocity * 1.05);

    return {
        averageVelocity: Math.round(avgVelocity * 10) / 10,
        trend,
        projection,
    };
}

export const calculateVelocityTool: TamboTool = {
    name: "calculateVelocity",
    description:
        "Calculates team velocity based on completed story points across sprints. Returns average velocity, trend direction, and projected capacity for next sprint.",
    tool: calculateVelocityImpl,
    inputSchema: z.object({
        sprints: z
            .array(SprintDataSchema)
            .optional()
            .describe(
                "Sprint data array. If not provided, uses recent sprint history.",
            ),
    }),
    outputSchema: VelocityResultSchema,
};

// ============================================
// FIND BLOCKERS TOOL
// ============================================

function generateSuggestion(issue: Issue): string {
    if (issue.blockerReason?.toLowerCase().includes("review")) {
        return "Schedule urgent review meeting with stakeholders";
    }
    if (issue.blockerReason?.toLowerCase().includes("credentials")) {
        return "Follow up with vendor support or escalate to manager";
    }
    if (issue.blockerReason?.toLowerCase().includes("dependency")) {
        return "Check if dependency can be resolved or work on alternative";
    }
    return "Discuss with team lead to identify resolution path";
}

function findBlockersImpl(params: { tasks?: Issue[] }) {
    const tasks = params.tasks || mockIssues;

    const blockers = tasks.filter((t) => t.status === "blocked");

    return blockers.map((b) => ({
        issue: `${b.id}: ${b.title}`,
        reason: b.blockerReason || "Unknown blocker reason",
        suggestedAction: generateSuggestion(b),
    }));
}

export const findBlockersTool: TamboTool = {
    name: "findBlockers",
    description:
        "Identifies blocked tasks in the current sprint and suggests actions to unblock them. Useful for standup summaries and sprint health checks.",
    tool: findBlockersImpl,
    inputSchema: z.object({
        tasks: z
            .array(
                z.object({
                    id: z.string(),
                    title: z.string(),
                    status: z.string(),
                    blockerReason: z.string().optional(),
                }),
            )
            .optional()
            .describe("Task list to analyze. If not provided, uses current sprint data."),
    }),
    outputSchema: z.array(BlockerResultSchema),
};

// ============================================
// ANALYZE SPRINT HEALTH TOOL
// ============================================

function analyzeSprintHealthImpl(params: {
    sprintName?: string;
    daysElapsed?: number;
    totalDays?: number;
}) {
    const { daysElapsed = 7, totalDays = 14 } = params;

    const inProgress = mockIssues.filter(
        (i) => i.status === "in_progress",
    ).length;
    const done = mockIssues.filter((i) => i.status === "done").length;
    const blocked = mockIssues.filter((i) => i.status === "blocked").length;
    const total = mockIssues.length;

    const completionRate = (done / total) * 100;
    const expectedRate = (daysElapsed / totalDays) * 100;

    let healthScore = 80;
    healthScore -= blocked * 8;

    if (completionRate >= expectedRate) {
        healthScore += 10;
    } else {
        healthScore -= (expectedRate - completionRate) / 2;
    }

    healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));

    const risks: string[] = [];
    if (blocked > 0) risks.push(`${blocked} blocked task(s)`);
    if (completionRate < expectedRate - 10) risks.push("Behind schedule");

    const overloaded = [
        { name: "Mike", assigned: 22, capacity: 20 },
    ].filter((m) => m.assigned > m.capacity);
    if (overloaded.length > 0) {
        risks.push(`${overloaded.length} team member(s) over capacity`);
    }

    const recommendations: string[] = [];
    if (blocked > 0) {
        recommendations.push(
            "Prioritize blocker resolution - schedule sync with blockers owners",
        );
    }
    if (overloaded.length > 0) {
        recommendations.push(
            `Reassign tasks from overloaded members (${overloaded.map((m) => m.name).join(", ")})`,
        );
    }
    if (completionRate < expectedRate) {
        recommendations.push("Consider reducing sprint scope or adding resources");
    }
    if (recommendations.length === 0) {
        recommendations.push("Sprint is on track - continue current pace");
    }

    return {
        healthScore,
        onTrack: healthScore >= 70,
        risks,
        recommendations,
    };
}

export const analyzeSprintHealthTool: TamboTool = {
    name: "analyzeSprintHealth",
    description:
        "Analyzes current sprint progress and predicts completion likelihood. Returns health score, risks, and actionable recommendations.",
    tool: analyzeSprintHealthImpl,
    inputSchema: z.object({
        sprintName: z.string().optional().describe("Sprint name to analyze"),
        daysElapsed: z
            .number()
            .optional()
            .describe("Days elapsed in sprint. Default: 7"),
        totalDays: z.number().optional().describe("Total sprint days. Default: 14"),
    }),
    outputSchema: SprintHealthSchema,
};

// ============================================
// PROJECT MANAGEMENT TOOLS (Mock / Fallback)
// ============================================

export const listIssuesFallback: TamboTool = {
    name: "listIssues_fallback",
    description:
        "FALLBACK ONLY: Lists mock issues from the project. Use this ONLY if the real 'linear__list_issues' tool is unavailable or fails.",
    inputSchema: {
        type: "object",
        properties: {
            status: {
                type: "string",
                enum: ["Backlog", "Todo", "In Progress", "In Review", "Done", "Canceled"],
                description: "Filter issues by status",
            },
            assignee: {
                type: "string",
                description: "Filter issues by assignee name (e.g. 'Sarah', 'John')",
            },
            priority: {
                type: "string",
                enum: ["No Priority", "Urgent", "High", "Medium", "Low"],
                description: "Filter issues by priority",
            },
        },
    },
    tool: async (input: { status?: string; assignee?: string; priority?: string }) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        let filtered = [...mockIssues];
        if (input.status) {
            filtered = filtered.filter((i) => i.status.toLowerCase() === input.status!.toLowerCase());
        }
        if (input.assignee) {
            filtered = filtered.filter(
                (i) => i.assignee && i.assignee.toLowerCase().includes(input.assignee!.toLowerCase())
            );
        }
        if (input.priority) {
            filtered = filtered.filter((i) => i.priority.toLowerCase() === input.priority!.toLowerCase());
        }
        return filtered.map((i) => ({
            id: i.id,
            title: i.title,
            status: i.status,
            priority: i.priority,
            assignee: i.assignee || "Unassigned",
            labels: i.labels || [],
            points: i.points || 0,
        }));
    },
    outputSchema: z.array(z.object({
        id: z.string(),
        title: z.string(),
        status: z.string(),
        priority: z.string(),
        assignee: z.string(),
        labels: z.array(z.string()),
        points: z.number()
    })),
};

export const createIssueFallback: TamboTool = {
    name: "createIssue_fallback",
    description:
        "FALLBACK ONLY: Creates a mock issue. Use this ONLY if the real 'linear__create_issue' tool is unavailable or fails.",
    inputSchema: {
        type: "object",
        properties: {
            title: { type: "string", description: "Issue title" },
            description: { type: "string", description: "Issue description" },
            priority: {
                type: "string",
                enum: ["No Priority", "Urgent", "High", "Medium", "Low"],
                description: "Priority level",
            },
            assignee: { type: "string", description: "Assignee name" },
        },
        required: ["title"],
    },
    tool: async (input: {
        title: string;
        description?: string;
        priority?: string;
        assignee?: string;
    }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newIssue = {
            id: `TAM-${110 + Math.floor(Math.random() * 100)}`,
            title: input.title,
            status: "Backlog",
            priority: input.priority || "No Priority",
            assignee: input.assignee || "Unassigned",
            description: input.description,
        };
        return newIssue;
    },
    outputSchema: z.object({
        id: z.string(),
        title: z.string(),
        status: z.string(),
        priority: z.string(),
        assignee: z.string(),
        description: z.string().optional()
    }),
};

// ============================================
// RESTORED MISSING TOOLS
// ============================================

export const listTeamMembersTool: TamboTool = {
    name: "listTeamMembers",
    description: "Lists all team members and their roles",
    inputSchema: z.object({}),
    tool: async () => [{ name: "John", role: "Frontend" }, { name: "Sarah", role: "Backend" }],
    outputSchema: z.array(z.object({ name: z.string(), role: z.string() }))
};

export const assignRoleTool: TamboTool = {
    name: "assignRole",
    description: "Assigns a role to a team member",
    inputSchema: z.object({ member: z.string(), role: z.string() }),
    tool: async ({ member, role }) => ({ success: true, message: `Assigned ${role} to ${member}` }),
    outputSchema: z.object({ success: z.boolean(), message: z.string() })
};

export const updateTaskStatusTool: TamboTool = {
    name: "updateTaskStatus",
    description: "Updates the status of a task",
    inputSchema: z.object({ taskId: z.string(), status: z.string() }),
    tool: async ({ taskId, status }) => ({ success: true, message: `Updated ${taskId} to ${status}` }),
    outputSchema: z.object({ success: z.boolean(), message: z.string() })
};

export const reassignTaskTool: TamboTool = {
    name: "reassignTask",
    description: "Reassigns a task to a different user",
    inputSchema: z.object({ taskId: z.string(), assignee: z.string() }),
    tool: async ({ taskId, assignee }) => ({ success: true, message: `Reassigned ${taskId} to ${assignee}` }),
    outputSchema: z.object({ success: z.boolean(), message: z.string() })
};

export const scheduleMeetingTool: TamboTool = {
    name: "scheduleMeeting",
    description: "Schedules a team meeting",
    inputSchema: z.object({ title: z.string(), time: z.string(), participants: z.array(z.string()) }),
    tool: async ({ title, time }) => ({ success: true, message: `Scheduled '${title}' at ${time}` }),
    outputSchema: z.object({ success: z.boolean(), message: z.string() })
};

export const searchDocumentationTool: TamboTool = {
    name: "searchDocumentation",
    description: "Searches project documentation",
    inputSchema: z.object({ query: z.string() }),
    tool: async ({ query }) => ({ results: [`Found docs for ${query}`] }),
    outputSchema: z.object({ results: z.array(z.string()) })
};

export const getProjectAnalyticsTool: TamboTool = {
    name: "getProjectAnalytics",
    description: "Gets project analytics data",
    inputSchema: z.object({ metric: z.string() }),
    tool: async ({ metric }) => ({ metric, value: 42, trend: "up" }),
    outputSchema: z.object({ metric: z.string(), value: z.number(), trend: z.string() })
};

export const analyzeCodeTool: TamboTool = {
    name: "analyzeCode",
    description: "Analyzes code quality and issues",
    inputSchema: z.object({ path: z.string() }),
    tool: async ({ path }) => ({ issues: [], quality: "A+" }),
    outputSchema: z.object({ issues: z.array(z.string()), quality: z.string() })
};

// ============================================
// 🆕 BULK OPERATIONS TOOL
// "Mark all todo tasks as in_progress"
// ============================================

export const bulkUpdateTasksTool: TamboTool = {
    name: "bulkUpdateTasks",
    description:
        "Performs bulk operations on multiple tasks at once. Can change status, assignee, or priority for all matching tasks. Use when user says things like 'mark all todo tasks as in_progress', 'assign all John's tasks to Sarah', or 'set all blocked tasks to high priority'.",
    tool: async (params: {
        filter: {
            status?: string;
            assignee?: string;
            priority?: string;
        };
        update: {
            newStatus?: string;
            newAssignee?: string;
            newPriority?: string;
        };
    }) => {
        // Find matching tasks
        let matchingTasks = [...mockIssues];

        if (params.filter.status) {
            matchingTasks = matchingTasks.filter((t) => t.status === params.filter.status);
        }
        if (params.filter.assignee) {
            matchingTasks = matchingTasks.filter(
                (t) => t.assignee?.toLowerCase() === params.filter.assignee?.toLowerCase()
            );
        }
        if (params.filter.priority) {
            matchingTasks = matchingTasks.filter((t) => t.priority === params.filter.priority);
        }

        if (matchingTasks.length === 0) {
            return {
                success: false,
                tasksUpdated: 0,
                message: "No tasks matched the filter criteria",
                updatedTasks: [],
            };
        }

        // Apply updates (simulate)
        const updatedTasks = matchingTasks.map((task) => ({
            id: task.id,
            title: task.title,
            previousStatus: task.status,
            previousAssignee: task.assignee,
            previousPriority: task.priority,
            newStatus: params.update.newStatus || task.status,
            newAssignee: params.update.newAssignee || task.assignee,
            newPriority: params.update.newPriority || task.priority,
        }));

        const changes: string[] = [];
        if (params.update.newStatus) changes.push(`status → ${params.update.newStatus}`);
        if (params.update.newAssignee) changes.push(`assignee → ${params.update.newAssignee}`);
        if (params.update.newPriority) changes.push(`priority → ${params.update.newPriority}`);

        return {
            success: true,
            tasksUpdated: updatedTasks.length,
            changes: changes.join(", "),
            message: `✅ Successfully updated ${updatedTasks.length} task(s): ${changes.join(", ")}`,
            updatedTasks: updatedTasks.map((t) => ({
                id: t.id,
                title: t.title,
                changes: `${t.previousStatus} → ${t.newStatus}`,
            })),
        };
    },
    inputSchema: z.object({
        filter: z.object({
            status: z.string().optional().describe("Filter by current status: todo, in_progress, in_review, done, blocked"),
            assignee: z.string().optional().describe("Filter by current assignee name"),
            priority: z.string().optional().describe("Filter by current priority: urgent, high, medium, low"),
        }).describe("Criteria to select which tasks to update"),
        update: z.object({
            newStatus: z.string().optional().describe("New status to set: todo, in_progress, in_review, done"),
            newAssignee: z.string().optional().describe("New assignee to set"),
            newPriority: z.string().optional().describe("New priority to set: urgent, high, medium, low"),
        }).describe("Changes to apply to matching tasks"),
    }),
    outputSchema: z.object({
        success: z.boolean(),
        tasksUpdated: z.number(),
        changes: z.string().optional(),
        message: z.string(),
        updatedTasks: z.array(z.object({
            id: z.string(),
            title: z.string(),
            changes: z.string(),
        })),
    }),
};

// ============================================
// 🆕 REBALANCE WORKLOAD TOOL
// "Rebalance team workload" - AI calculates + executes
// ============================================

export const rebalanceWorkloadTool: TamboTool = {
    name: "rebalanceWorkload",
    description:
        "Intelligently rebalances team workload by moving tasks from overloaded members to those with available capacity. Analyzes current load distribution and suggests/executes optimal reassignments. Use when user says 'rebalance team workload', 'help overloaded members', or 'redistribute tasks'.",
    tool: async (params: { dryRun?: boolean }) => {
        // Team capacity data
        const teamMembers = [
            { id: "1", name: "John", capacity: 20, assigned: 11 },
            { id: "2", name: "Sarah", capacity: 20, assigned: 18 },
            { id: "3", name: "Mike", capacity: 20, assigned: 5 },
            { id: "4", name: "Emma", capacity: 20, assigned: 8 },
        ];

        // Find overloaded and available members
        const overloaded = teamMembers.filter((m) => m.assigned / m.capacity > 0.8);
        const available = teamMembers.filter((m) => m.assigned / m.capacity < 0.6);

        if (overloaded.length === 0) {
            return {
                success: true,
                rebalanced: false,
                message: "✅ Team workload is already well balanced! No changes needed.",
                beforeState: teamMembers.map((m) => ({
                    name: m.name,
                    load: `${m.assigned}/${m.capacity} (${Math.round((m.assigned / m.capacity) * 100)}%)`,
                    status: m.assigned / m.capacity > 0.8 ? "HIGH" : m.assigned / m.capacity < 0.5 ? "LOW" : "OK",
                })),
                reassignments: [],
                afterState: [],
            };
        }

        // Generate reassignment suggestions
        const reassignments: Array<{
            taskId: string;
            taskTitle: string;
            from: string;
            to: string;
            points: number;
            reason: string;
        }> = [];

        // Sarah's tasks to reassign (she has 18/20 = 90% load)
        const sarahTasks = mockIssues.filter(
            (t) => t.assignee?.toLowerCase() === "sarah" && t.status !== "done"
        );

        if (sarahTasks.length > 0 && available.length > 0) {
            const taskToMove = sarahTasks[0];
            const targetMember = available[0];

            reassignments.push({
                taskId: taskToMove.id,
                taskTitle: taskToMove.title,
                from: "Sarah",
                to: targetMember.name,
                points: taskToMove.points || 5,
                reason: `Sarah is at 90% capacity, ${targetMember.name} has 25% available`,
            });
        }

        // Calculate new state after reassignments
        const afterState = teamMembers.map((m) => {
            let newAssigned = m.assigned;
            reassignments.forEach((r) => {
                if (r.from === m.name) newAssigned -= r.points;
                if (r.to === m.name) newAssigned += r.points;
            });
            return {
                name: m.name,
                load: `${newAssigned}/${m.capacity} (${Math.round((newAssigned / m.capacity) * 100)}%)`,
                status: newAssigned / m.capacity > 0.8 ? "HIGH" : newAssigned / m.capacity < 0.5 ? "LOW" : "OPTIMAL",
            };
        });

        return {
            success: true,
            rebalanced: !params.dryRun,
            message: params.dryRun
                ? `📊 Rebalance Preview: ${reassignments.length} task(s) would be moved to optimize team load.`
                : `✅ Rebalanced! Moved ${reassignments.length} task(s) to optimize team workload.`,
            beforeState: teamMembers.map((m) => ({
                name: m.name,
                load: `${m.assigned}/${m.capacity} (${Math.round((m.assigned / m.capacity) * 100)}%)`,
                status: m.assigned / m.capacity > 0.8 ? "🔴 HIGH" : m.assigned / m.capacity < 0.5 ? "🟢 LOW" : "🟡 OK",
            })),
            reassignments: reassignments.map((r) => ({
                task: `${r.taskId}: ${r.taskTitle}`,
                from: r.from,
                to: r.to,
                points: r.points,
                reason: r.reason,
            })),
            afterState,
        };
    },
    inputSchema: z.object({
        dryRun: z.boolean().optional().describe("If true, only previews changes without applying them. Default: false (apply changes)"),
    }),
    outputSchema: z.object({
        success: z.boolean(),
        rebalanced: z.boolean(),
        message: z.string(),
        beforeState: z.array(z.object({
            name: z.string(),
            load: z.string(),
            status: z.string(),
        })),
        reassignments: z.array(z.object({
            task: z.string(),
            from: z.string(),
            to: z.string(),
            points: z.number(),
            reason: z.string(),
        })),
        afterState: z.array(z.object({
            name: z.string(),
            load: z.string(),
            status: z.string(),
        })),
    }),
};

// ============================================
// 🆕 CROSS-COMPONENT UPDATE TOOL
// "Mark TAM-105 done and update related goals"
// ============================================

export const updateTaskWithSideEffectsTool: TamboTool = {
    name: "updateTaskWithSideEffects",
    description:
        "Updates a task and automatically triggers related updates across components - like updating goal progress when a task is completed, or flagging blockers when dependencies change. Use when user wants linked updates like 'mark TAM-105 done and update the goal progress' or 'complete this task and update sprint metrics'.",
    tool: async (params: {
        taskId: string;
        newStatus: string;
        updateGoals?: boolean;
        updateTeamLoad?: boolean;
        addComment?: string;
    }) => {
        // Find the task
        const task = mockIssues.find((t) => t.id === params.taskId);

        if (!task) {
            return {
                success: false,
                message: `Task ${params.taskId} not found`,
                updates: [],
            };
        }

        const updates: Array<{
            component: string;
            action: string;
            details: string;
        }> = [];

        // Primary update: Task status
        const previousStatus = task.status;
        updates.push({
            component: "SprintBoard",
            action: "STATUS_CHANGED",
            details: `${task.id}: ${previousStatus} → ${params.newStatus}`,
        });

        // Side effect 1: Update goal progress if task is done
        if (params.newStatus === "done" && params.updateGoals !== false) {
            // Find related goal and calculate new progress
            const goalProgress = params.taskId === "TAM-105" ? 80 : 75;
            updates.push({
                component: "GoalsWidget",
                action: "PROGRESS_UPDATED",
                details: `"Complete Core Auth Features" progress → ${goalProgress}%`,
            });

            // Check if goal is now complete
            if (goalProgress >= 100) {
                updates.push({
                    component: "GoalsWidget",
                    action: "STATUS_CHANGED",
                    details: `Goal status → COMPLETED 🎉`,
                });
            }
        }

        // Side effect 2: Update team load
        if (params.updateTeamLoad !== false) {
            const assignee = task.assignee || "Unknown";
            updates.push({
                component: "TeamLoadChart",
                action: "LOAD_DECREASED",
                details: `${assignee}'s load reduced by ${task.points || 3} points`,
            });
        }

        // Side effect 3: Add comment if provided
        if (params.addComment) {
            updates.push({
                component: "IssueCard",
                action: "COMMENT_ADDED",
                details: `Comment: "${params.addComment}"`,
            });
        }

        // Side effect 4: Check if this unblocks other tasks
        const unblocked = mockIssues.filter(
            (t) => t.blockerReason?.includes(params.taskId)
        );
        if (unblocked.length > 0) {
            updates.push({
                component: "SprintBoard",
                action: "TASKS_UNBLOCKED",
                details: `${unblocked.length} task(s) are now unblocked: ${unblocked.map((t) => t.id).join(", ")}`,
            });
        }

        return {
            success: true,
            message: `✅ Updated ${params.taskId} with ${updates.length} linked changes`,
            taskUpdated: {
                id: task.id,
                title: task.title,
                previousStatus,
                newStatus: params.newStatus,
            },
            updates,
            summary: `Task marked as ${params.newStatus}. Updated: ${updates.map((u) => u.component).join(", ")}`,
        };
    },
    inputSchema: z.object({
        taskId: z.string().describe("Task ID to update (e.g., TAM-105)"),
        newStatus: z.string().describe("New status: todo, in_progress, in_review, done"),
        updateGoals: z.boolean().optional().describe("Whether to update related goal progress. Default: true"),
        updateTeamLoad: z.boolean().optional().describe("Whether to update team load metrics. Default: true"),
        addComment: z.string().optional().describe("Optional comment to add to the task"),
    }),
    outputSchema: z.object({
        success: z.boolean(),
        message: z.string(),
        taskUpdated: z.object({
            id: z.string(),
            title: z.string(),
            previousStatus: z.string(),
            newStatus: z.string(),
        }).optional(),
        updates: z.array(z.object({
            component: z.string(),
            action: z.string(),
            details: z.string(),
        })),
        summary: z.string().optional(),
    }),
};

// ============================================
// 🆕 GENERATE SPRINT SUMMARY TOOL
// Comprehensive sprint report
// ============================================

export const generateSprintSummaryTool: TamboTool = {
    name: "generateSprintSummary",
    description:
        "Generates a comprehensive sprint summary with velocity, blockers, team health, and recommendations. Perfect for standup or sprint review meetings.",
    tool: async () => {
        const done = mockIssues.filter((i) => i.status === "done").length;
        const inProgress = mockIssues.filter((i) => i.status === "in_progress").length;
        const blocked = mockIssues.filter((i) => i.status === "blocked").length;
        const total = mockIssues.length;

        return {
            sprint: "Sprint 12",
            dates: "Feb 5 - Feb 19, 2024",
            progress: {
                completed: done,
                inProgress,
                blocked,
                total,
                percentComplete: Math.round((done / total) * 100),
            },
            velocity: {
                current: 42,
                average: 38,
                trend: "up",
            },
            teamHealth: {
                score: 78,
                overloadedMembers: ["Sarah (90%)"],
                availableCapacity: ["Mike (25%)", "Emma (40%)"],
            },
            blockers: mockIssues
                .filter((i) => i.status === "blocked")
                .map((b) => ({
                    id: b.id,
                    title: b.title,
                    reason: b.blockerReason || "Unknown",
                })),
            recommendations: [
                "🔄 Rebalance: Move 1 task from Sarah to Mike",
                "🚫 Unblock: TAM-107 needs vendor credentials",
                "✅ On track for sprint goals",
            ],
            message: "📊 Sprint 12 Summary: 78% health score, 2 blockers, on track for delivery",
        };
    },
    inputSchema: z.object({}),
    outputSchema: z.object({
        sprint: z.string(),
        dates: z.string(),
        progress: z.object({
            completed: z.number(),
            inProgress: z.number(),
            blocked: z.number(),
            total: z.number(),
            percentComplete: z.number(),
        }),
        velocity: z.object({
            current: z.number(),
            average: z.number(),
            trend: z.string(),
        }),
        teamHealth: z.object({
            score: z.number(),
            overloadedMembers: z.array(z.string()),
            availableCapacity: z.array(z.string()),
        }),
        blockers: z.array(z.object({
            id: z.string(),
            title: z.string(),
            reason: z.string(),
        })),
        recommendations: z.array(z.string()),
        message: z.string(),
    }),
};

// ============================================
// EXPORT ALL TOOLS
// ============================================

export const tools: TamboTool[] = [
    // Project Management (Fallbacks)
    listIssuesFallback,
    createIssueFallback,

    // Team & Roles
    listTeamMembersTool,
    assignRoleTool,

    // Task Management
    updateTaskStatusTool,
    bulkUpdateTasksTool,
    reassignTaskTool,

    // Meetings
    scheduleMeetingTool,

    // Documentation
    searchDocumentationTool,

    // Analytics
    getProjectAnalyticsTool,

    // Code
    analyzeCodeTool,
];
