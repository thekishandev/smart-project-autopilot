/**
 * @file mock-data.ts
 * @description Mock data for Smart Project Autopilot demo
 */

import type {
    KanbanBoardProps,
    GanttChartProps,
    TeamLoadChartProps,
    SprintVelocityProps,
    IssueCardProps,
    StandupSummaryProps,
    SprintData,
} from "./schemas";

// ============================================
// KANBAN BOARD MOCK DATA
// ============================================

export const mockKanbanBoard: KanbanBoardProps = {
    title: "Sprint 42 - Neural Bridge",
    columns: [
        {
            id: "backlog",
            title: "Backlog",
            color: "#8b949e",
            issues: [
                {
                    id: "TAM-204",
                    title: "Optimize Vector DB Indexing",
                    priority: "low",
                    labels: ["optimization", "database"],
                },
                {
                    id: "TAM-205",
                    title: "Implement Voice Command Interface",
                    priority: "medium",
                    assignee: "Sarah",
                    labels: ["feature", "accessibility"],
                },
            ],
        },
        {
            id: "todo",
            title: "To Do",
            color: "#58a6ff",
            issues: [
                {
                    id: "TAM-208",
                    title: "Integrate MCP with Local Shell",
                    priority: "high",
                    assignee: "John",
                    labels: ["core", "mcp"],
                },
                {
                    id: "TAM-209",
                    title: "Containerize Agent Runtime",
                    priority: "medium",
                    assignee: "Mike",
                    labels: ["devops", "infrastructure"],
                },
            ],
        },
        {
            id: "in_progress",
            title: "In Progress",
            color: "#d29922",
            issues: [
                {
                    id: "TAM-210",
                    title: "Neural Intent Parser v2",
                    priority: "high",
                    assignee: "Sarah",
                    labels: ["ai", "core"],
                },
                {
                    id: "TAM-211",
                    title: "Fix Context Drifting",
                    priority: "urgent",
                    assignee: "John",
                    labels: ["bug", "llm"],
                },
            ],
        },
        {
            id: "in_review",
            title: "In Review",
            color: "#a371f7",
            issues: [
                {
                    id: "TAM-212",
                    title: "Generative UI Streams",
                    priority: "high",
                    assignee: "Emma",
                    labels: ["frontend", "streaming"],
                },
            ],
        },
        {
            id: "done",
            title: "Done",
            color: "#3fb950",
            issues: [
                {
                    id: "TAM-201",
                    title: "Setup CI/CD Pipeline for Agents",
                    priority: "medium",
                    assignee: "Mike",
                    labels: ["devops"],
                },
                {
                    id: "TAM-202",
                    title: "Core Authentication Service",
                    priority: "high",
                    assignee: "Sarah",
                    labels: ["security"],
                },
            ],
        },
    ],
};

// ============================================
// GANTT CHART MOCK DATA
// ============================================

export const mockGanttChart: GanttChartProps = {
    tasks: [
        {
            id: "task-1",
            title: "Neural Core Architecture",
            startDate: "2026-02-01",
            endDate: "2026-02-08",
            progress: 100,
            assignee: "John",
        },
        {
            id: "task-2",
            title: "UI/UX Cyberpunk Overhaul",
            startDate: "2026-02-05",
            endDate: "2026-02-12",
            progress: 85,
            dependencies: ["task-1"],
            assignee: "Emma",
        },
        {
            id: "task-3",
            title: "MCP Server Integration",
            startDate: "2026-02-10",
            endDate: "2026-02-20",
            progress: 45,
            dependencies: ["task-1"],
            assignee: "Mike",
        },
        {
            id: "task-4",
            title: "Real-time Dashboard",
            startDate: "2026-02-12",
            endDate: "2026-02-25",
            progress: 30,
            dependencies: ["task-2"],
            assignee: "Sarah",
        },
        {
            id: "task-5",
            title: "End-to-End Testing",
            startDate: "2026-02-22",
            endDate: "2026-02-28",
            progress: 0,
            dependencies: ["task-3", "task-4"],
            assignee: "John",
        },
    ],
    milestones: [
        {
            id: "ms-1",
            title: "Core Logic Freeze",
            date: "2026-02-15",
        },
        {
            id: "ms-2",
            title: "Alpha Release",
            date: "2026-02-22",
        },
        {
            id: "ms-3",
            title: "Public Launch",
            date: "2026-03-01",
        },
    ],
};

// ============================================
// TEAM LOAD CHART MOCK DATA
// ============================================

export const mockTeamLoad: TeamLoadChartProps = {
    members: [
        {
            id: "1",
            name: "John Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
            capacity: 20,
            assigned: 19,
            tasks: [
                { title: "Context drifting fix", points: 8 },
                { title: "MCP Shell integration", points: 8 },
                { title: "Code review", points: 3 },
            ],
        },
        {
            id: "2",
            name: "Sarah Miller",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
            capacity: 20,
            assigned: 16,
            tasks: [
                { title: "Neural Intent Parser", points: 13 },
                { title: "Vector DB research", points: 3 },
            ],
        },
        {
            id: "3",
            name: "Mike Johnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
            capacity: 20,
            assigned: 21,
            tasks: [
                { title: "Containerization", points: 8 },
                { title: "CI/CD Pipeline", points: 8 },
                { title: "Infra Security", points: 5 },
            ],
        },
        {
            id: "4",
            name: "Emma Wilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
            capacity: 20,
            assigned: 13,
            tasks: [
                { title: "Generative UI Streaming", points: 8 },
                { title: "Dashboard Polish", points: 5 },
            ],
        },
    ],
};

// ============================================
// SPRINT VELOCITY MOCK DATA
// ============================================

export const mockSprintVelocity: SprintVelocityProps = {
    sprints: [
        { name: "Sprint 38", planned: 45, completed: 42 },
        { name: "Sprint 39", planned: 48, completed: 46 },
        { name: "Sprint 40", planned: 50, completed: 49 },
        { name: "Sprint 41", planned: 52, completed: 50 },
        { name: "Sprint 42", planned: 55, completed: 32 }, // Current sprint
    ],
    averageVelocity: 47.4,
    trend: "up",
};

// ============================================
// ISSUE CARD MOCK DATA
// ============================================

export const mockIssueCard: IssueCardProps = {
    id: "TAM-211",
    title: "Fix Context Drifting in Long Sessions",
    description:
        "The LLM agent starts losing track of the file structure after approximately 50 turns. We need to implement a sliding window summary or a vector retrieval step to keep the context fresh.",
    status: "In Progress",
    priority: "urgent",
    assignee: {
        name: "John Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    labels: ["bug", "llm", "critical", "ai"],
    createdAt: "2026-02-06T09:15:00Z",
    linkedPRs: [
        {
            number: 402,
            title: "feat: implemented sliding context window",
            status: "open",
        },
    ],
    comments: 12,
};

// ============================================
// STANDUP SUMMARY MOCK DATA
// ============================================

export const mockStandupSummary: StandupSummaryProps = {
    date: new Date().toISOString().split("T")[0],
    completed: [
        { issue: "TAM-202: Core Auth Service", assignee: "Sarah" },
        { issue: "TAM-201: CI/CD Pipeline", assignee: "Mike" },
        { issue: "TAM-200: Initial MCP Server Setup", assignee: "John" },
    ],
    inProgress: [
        { issue: "TAM-210: Neural Intent Parser v2", assignee: "Sarah" },
        {
            issue: "TAM-211: Context Drifting Fix",
            assignee: "John",
            blockers: ["Waiting for OpenAI API quota increase"],
        },
        { issue: "TAM-212: Generative UI Streams", assignee: "Emma" },
        { issue: "TAM-209: Containerize Agent", assignee: "Mike" },
    ],
    blockers: [
        {
            issue: "TAM-211",
            reason: "API Rate limiting on Tier 4 model",
            suggestedAction: "Switch to reserved instance or optimize prompt tokens",
        },
        {
            issue: "TAM-215",
            reason: "Pending access to production database replica",
            suggestedAction: "Ping DevOps channel",
        },
    ],
    highlights: [
        "Sprint 42 is 58% complete",
        "Velocity hit an all-time high last sprint",
        "Generative UI prototype is now testable",
    ],
};

// ============================================
// SPRINT DATA FOR TOOLS
// ============================================

export const mockSprintData: SprintData[] = [
    { name: "Sprint 38", planned: 45, completed: 42 },
    { name: "Sprint 39", planned: 48, completed: 46 },
    { name: "Sprint 40", planned: 50, completed: 49 },
    { name: "Sprint 41", planned: 52, completed: 50 },
    { name: "Sprint 42", planned: 55, completed: 32 },
];

// ============================================
// ALL ISSUES (for tools and filtering)
// ============================================

export interface Issue {
    id: string;
    title: string;
    status: string;
    priority: string;
    assignee?: string;
    blockerReason?: string;
    labels?: string[];
    points?: number;
}

export const mockIssues: Issue[] = [
    {
        id: "TAM-204",
        title: "Optimize Vector DB Indexing",
        status: "backlog",
        priority: "low",
        labels: ["optimization", "database"],
        points: 5,
    },
    {
        id: "TAM-205",
        title: "Implement Voice Command Interface",
        status: "backlog",
        priority: "medium",
        assignee: "Sarah",
        labels: ["feature", "accessibility"],
        points: 8,
    },
    {
        id: "TAM-208",
        title: "Integrate MCP with Local Shell",
        status: "todo",
        priority: "high",
        assignee: "John",
        labels: ["core", "mcp"],
        points: 13,
    },
    {
        id: "TAM-209",
        title: "Containerize Agent Runtime",
        status: "todo",
        priority: "medium",
        assignee: "Mike",
        labels: ["devops", "infrastructure"],
        points: 8,
    },
    {
        id: "TAM-210",
        title: "Neural Intent Parser v2",
        status: "in_progress",
        priority: "high",
        assignee: "Sarah",
        labels: ["ai", "core"],
        points: 13,
    },
    {
        id: "TAM-211",
        title: "Fix Context Drifting",
        status: "blocked",
        priority: "urgent",
        assignee: "John",
        blockerReason: "Waiting for API quota",
        labels: ["bug", "llm"],
        points: 8,
    },
    {
        id: "TAM-212",
        title: "Generative UI Streams",
        status: "in_review",
        priority: "high",
        assignee: "Emma",
        labels: ["frontend", "streaming"],
        points: 8,
    },
    {
        id: "TAM-201",
        title: "Setup CI/CD Pipeline",
        status: "done",
        priority: "medium",
        assignee: "Mike",
        labels: ["devops"],
        points: 5,
    },
    {
        id: "TAM-202",
        title: "Core Authentication Service",
        status: "done",
        priority: "high",
        assignee: "Sarah",
        labels: ["security"],
        points: 8,
    },
    {
        id: "TAM-215",
        title: "Production DB Replica Sync",
        status: "blocked",
        priority: "high",
        assignee: "Mike",
        blockerReason: "Access permissions pending",
        labels: ["database", "ops"],
        points: 5,
    },
];

// ============================================
// INTERACTABLE COMPONENT DATA
// Single source of truth - derived from mockIssues
// ============================================

function mapStatus(status: string): "todo" | "in_progress" | "in_review" | "done" {
    switch (status) {
        case "backlog":
        case "todo":
            return "todo";
        case "in_progress":
        case "blocked":
            return "in_progress";
        case "in_review":
            return "in_review";
        case "done":
            return "done";
        default:
            return "todo";
    }
}

// Sprint Board Data - derived from mockIssues
export function getSprintBoardData() {
    const tasks = mockIssues.map((issue) => ({
        id: issue.id,
        title: issue.title,
        status: mapStatus(issue.status),
        priority: issue.priority as "urgent" | "high" | "medium" | "low",
        assignee: issue.assignee,
        points: issue.points || 0,
    }));

    return {
        sprintName: "Sprint 42",
        startDate: "2026-02-05",
        endDate: "2026-02-19",
        tasks,
    };
}

// Team Data - derived from mockIssues
export function getTeamData() {
    const teamMembers = [
        { id: "1", name: "John Chen", role: "Systems Architect", capacity: 20 },
        { id: "2", name: "Sarah Miller", role: "Lead AI Engineer", capacity: 20 },
        { id: "3", name: "Mike Johnson", role: "DevOps Specialist", capacity: 20 },
        { id: "4", name: "Emma Wilson", role: "UX/UI Engineer", capacity: 20 },
    ];

    return {
        members: teamMembers.map((member) => {
            const firstName = member.name.split(" ")[0].toLowerCase();
            const memberTasks = mockIssues.filter(
                (issue) => issue.assignee?.toLowerCase().includes(firstName)
            );
            const assigned = memberTasks.reduce((sum, t) => sum + (t.points || 0), 0);

            return {
                ...member,
                assigned,
                tasks: memberTasks.slice(0, 3).map((t) => ({
                    id: t.id,
                    title: t.title,
                    points: t.points,
                    status: t.status,
                })),
            };
        }),
    };
}

// Goals Data - calculated from mockIssues
export function getGoalsData() {
    const aiIssues = mockIssues.filter((i) => i.labels?.includes("ai") || i.labels?.includes("llm"));
    const aiDone = aiIssues.filter((i) => i.status === "done").length;
    const aiProgress = Math.round((aiDone / Math.max(aiIssues.length, 1)) * 100);

    const devopsIssues = mockIssues.filter(
        (i) => i.labels?.includes("devops") || i.labels?.includes("infrastructure")
    );
    const devopsDone = devopsIssues.filter((i) => i.status === "done").length;
    const devopsProgress = Math.round((devopsDone / Math.max(devopsIssues.length, 1)) * 100);

    const blockedCount = mockIssues.filter((i) => i.status === "blocked").length;
    const totalIssues = mockIssues.length;
    const doneCount = mockIssues.filter((i) => i.status === "done").length;
    const overallProgress = Math.round((doneCount / totalIssues) * 100);

    return {
        title: "Sprint 42 Goals",
        goals: [
            {
                id: "g1",
                title: "Stabilize Neural Core",
                description: `${aiDone}/${aiIssues.length} AI/LLM tasks completed`,
                progress: aiProgress,
                target: `Zero Context Drifts`,
                status: aiProgress >= 100 ? "completed" as const : aiProgress >= 50 ? "on_track" as const : "at_risk" as const,
                dueDate: "2026-02-15",
            },
            {
                id: "g2",
                title: "Production Infrastructure",
                description: `${devopsDone}/${devopsIssues.length} infra tasks completed`,
                progress: devopsProgress,
                target: "Fully Containerized",
                status: devopsProgress >= 100 ? "completed" as const : devopsProgress >= 50 ? "on_track" as const : "at_risk" as const,
                dueDate: "2026-02-19",
            },
            {
                id: "g3",
                title: "Sprint Completion",
                description: `${doneCount}/${totalIssues} total tasks done`,
                progress: overallProgress,
                target: `${totalIssues} tasks`,
                status: overallProgress >= 100 ? "completed" as const : overallProgress >= 40 ? "on_track" as const : "at_risk" as const,
                dueDate: "2026-02-19",
            },
            {
                id: "g4",
                title: "Resolved Blockers",
                description: blockedCount > 0 ? `${blockedCount} critical blocker(s) active` : "All systems go!",
                progress: blockedCount === 0 ? 100 : Math.max(0, 100 - blockedCount * 25),
                target: "0 blockers",
                status: blockedCount === 0 ? "completed" as const : "blocked" as const,
            },
        ],
    };
}
