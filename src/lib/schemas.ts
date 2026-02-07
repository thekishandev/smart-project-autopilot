/**
 * @file schemas.ts
 * @description Zod schemas for all Smart Project Autopilot components
 */

import { z } from "zod";

// ============================================
// SHARED SCHEMAS
// ============================================

export const PrioritySchema = z.enum(["urgent", "high", "medium", "low"]);
export type Priority = z.infer<typeof PrioritySchema>;

export const StatusSchema = z.enum([
    "backlog",
    "todo",
    "in_progress",
    "in_review",
    "done",
    "blocked",
]);
export type Status = z.infer<typeof StatusSchema>;

export const TrendSchema = z.enum(["up", "down", "stable"]);
export type Trend = z.infer<typeof TrendSchema>;

export const PRStatusSchema = z.enum(["open", "merged", "closed"]);
export type PRStatus = z.infer<typeof PRStatusSchema>;

// ============================================
// KANBAN BOARD SCHEMA
// ============================================

export const KanbanIssueSchema = z.object({
    id: z.string().describe("Unique issue identifier"),
    title: z.string().describe("Issue title"),
    priority: PrioritySchema.describe("Issue priority level"),
    assignee: z.string().optional().describe("Assignee name"),
    labels: z.array(z.string()).optional().describe("Issue labels"),
});
export type KanbanIssue = z.infer<typeof KanbanIssueSchema>;

export const KanbanColumnSchema = z.object({
    id: z.string().describe("Column identifier"),
    title: z.string().describe("Column title (e.g., 'To Do', 'In Progress')"),
    color: z.string().optional().describe("Column accent color"),
    issues: z.array(KanbanIssueSchema).describe("Issues in this column"),
});
export type KanbanColumn = z.infer<typeof KanbanColumnSchema>;

export const KanbanBoardSchema = z
    .object({
        columns: z.array(KanbanColumnSchema).describe("Kanban board columns"),
        title: z.string().optional().describe("Board title"),
    })
    .describe(
        "A Kanban board with columns representing different issue states. Use when user wants to see sprint/project tasks organized by status.",
    );
export type KanbanBoardProps = z.infer<typeof KanbanBoardSchema>;

// ============================================
// GANTT CHART SCHEMA
// ============================================

export const GanttTaskSchema = z.object({
    id: z.string().describe("Task identifier"),
    title: z.string().describe("Task title"),
    startDate: z.string().describe("Start date in ISO format"),
    endDate: z.string().describe("End date in ISO format"),
    progress: z.number().min(0).max(100).describe("Completion percentage 0-100"),
    dependencies: z
        .array(z.string())
        .optional()
        .describe("IDs of dependent tasks"),
    assignee: z.string().optional().describe("Assignee name"),
});
export type GanttTask = z.infer<typeof GanttTaskSchema>;

export const GanttMilestoneSchema = z.object({
    id: z.string().describe("Milestone identifier"),
    title: z.string().describe("Milestone title"),
    date: z.string().describe("Milestone date in ISO format"),
});
export type GanttMilestone = z.infer<typeof GanttMilestoneSchema>;

export const GanttChartSchema = z
    .object({
        tasks: z.array(GanttTaskSchema).describe("Tasks to display on timeline"),
        milestones: z
            .array(GanttMilestoneSchema)
            .optional()
            .describe("Project milestones"),
    })
    .describe(
        "A Gantt chart showing project timeline with tasks and dependencies. Use when user wants to see project schedule or task timelines.",
    );
export type GanttChartProps = z.infer<typeof GanttChartSchema>;

// ============================================
// TEAM LOAD CHART SCHEMA
// ============================================

export const TeamMemberTaskSchema = z.object({
    title: z.string().describe("Task title"),
    points: z.number().describe("Story points"),
});
export type TeamMemberTask = z.infer<typeof TeamMemberTaskSchema>;

export const TeamMemberSchema = z.object({
    id: z.string().describe("Team member ID"),
    name: z.string().describe("Team member name"),
    avatar: z.string().optional().describe("Avatar URL"),
    capacity: z.number().describe("Maximum story points capacity"),
    assigned: z.number().describe("Currently assigned story points"),
    tasks: z.array(TeamMemberTaskSchema).describe("Assigned tasks"),
});
export type TeamMember = z.infer<typeof TeamMemberSchema>;

export const TeamLoadChartSchema = z
    .object({
        members: z.array(TeamMemberSchema).describe("Team members with workload"),
    })
    .describe(
        "A chart showing team capacity and workload distribution. Use when user asks about team load, capacity, or who is overloaded.",
    );
export type TeamLoadChartProps = z.infer<typeof TeamLoadChartSchema>;

// ============================================
// SPRINT VELOCITY SCHEMA
// ============================================

export const SprintDataSchema = z.object({
    name: z.string().describe("Sprint name (e.g., 'Sprint 5')"),
    planned: z.number().describe("Planned story points"),
    completed: z.number().describe("Completed story points"),
});
export type SprintData = z.infer<typeof SprintDataSchema>;

export const SprintVelocitySchema = z
    .object({
        sprints: z.array(SprintDataSchema).describe("Sprint velocity data"),
        averageVelocity: z.number().describe("Average velocity across sprints"),
        trend: TrendSchema.describe("Velocity trend direction"),
    })
    .describe(
        "A velocity chart showing sprint performance over time. Use when user asks about velocity, sprint trends, or team performance.",
    );
export type SprintVelocityProps = z.infer<typeof SprintVelocitySchema>;

// ============================================
// ISSUE CARD SCHEMA
// ============================================

export const LinkedPRSchema = z.object({
    number: z.number().describe("PR number"),
    title: z.string().describe("PR title"),
    status: PRStatusSchema.describe("PR status"),
});
export type LinkedPR = z.infer<typeof LinkedPRSchema>;

export const AssigneeSchema = z.object({
    name: z.string().describe("Assignee name"),
    avatar: z.string().optional().describe("Avatar URL"),
});
export type Assignee = z.infer<typeof AssigneeSchema>;

export const IssueCardSchema = z
    .object({
        id: z.string().describe("Issue identifier (e.g., TAM-123)"),
        title: z.string().describe("Issue title"),
        description: z.string().describe("Issue description"),
        status: z.string().describe("Current status"),
        priority: PrioritySchema.describe("Priority level"),
        assignee: AssigneeSchema.optional().describe("Assigned person"),
        labels: z.array(z.string()).describe("Issue labels"),
        createdAt: z.string().describe("Creation date in ISO format"),
        linkedPRs: z
            .array(LinkedPRSchema)
            .optional()
            .describe("Linked pull requests"),
        comments: z.number().optional().describe("Number of comments"),
    })
    .describe(
        "A detailed issue card showing full issue information. Use when user asks about a specific issue or wants issue details.",
    );
export type IssueCardProps = z.infer<typeof IssueCardSchema>;

// ============================================
// STANDUP SUMMARY SCHEMA
// ============================================

export const CompletedItemSchema = z.object({
    issue: z.string().describe("Issue identifier"),
    assignee: z.string().describe("Who completed it"),
});
export type CompletedItem = z.infer<typeof CompletedItemSchema>;

export const InProgressItemSchema = z.object({
    issue: z.string().describe("Issue identifier"),
    assignee: z.string().describe("Who is working on it"),
    blockers: z.array(z.string()).optional().describe("Blocker descriptions"),
});
export type InProgressItem = z.infer<typeof InProgressItemSchema>;

export const BlockerItemSchema = z.object({
    issue: z.string().describe("Blocked issue identifier"),
    reason: z.string().describe("Why it is blocked"),
    suggestedAction: z.string().optional().describe("Suggested resolution"),
});
export type BlockerItem = z.infer<typeof BlockerItemSchema>;

export const StandupSummarySchema = z
    .object({
        date: z.string().describe("Standup date in ISO format"),
        completed: z.array(CompletedItemSchema).describe("Completed yesterday"),
        inProgress: z.array(InProgressItemSchema).describe("In progress today"),
        blockers: z.array(BlockerItemSchema).describe("Current blockers"),
        highlights: z.array(z.string()).optional().describe("Key highlights"),
    })
    .describe(
        "A standup summary showing completed work, in-progress items, and blockers. Use when user asks for standup summary or daily status.",
    );
export type StandupSummaryProps = z.infer<typeof StandupSummarySchema>;

// ============================================
// TOOL OUTPUT SCHEMAS
// ============================================

export const VelocityResultSchema = z.object({
    averageVelocity: z.number().describe("Average velocity"),
    trend: TrendSchema.describe("Trend direction"),
    projection: z.number().describe("Projected next sprint capacity"),
});
export type VelocityResult = z.infer<typeof VelocityResultSchema>;

export const BlockerResultSchema = z.object({
    issue: z.string().describe("Issue title"),
    reason: z.string().describe("Blocker reason"),
    suggestedAction: z.string().describe("Suggested action"),
});
export type BlockerResult = z.infer<typeof BlockerResultSchema>;

export const SprintHealthSchema = z.object({
    healthScore: z.number().min(0).max(100).describe("Health score 0-100"),
    onTrack: z.boolean().describe("Whether sprint is on track"),
    risks: z.array(z.string()).describe("Identified risks"),
    recommendations: z.array(z.string()).describe("Action recommendations"),
});
export type SprintHealth = z.infer<typeof SprintHealthSchema>;
