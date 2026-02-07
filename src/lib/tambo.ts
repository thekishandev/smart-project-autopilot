/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * Smart Project Autopilot - AI-powered project management dashboard
 * 
 * This file registers all generative components and tools with Tambo.
 */

import type { TamboComponent } from "@tambo-ai/react";

// Generative Components - Custom
import { KanbanBoard } from "@/components/generative/KanbanBoard";
import { GanttChart } from "@/components/generative/GanttChart";
import { TeamLoadChart } from "@/components/generative/TeamLoadChart";
import { SprintVelocity } from "@/components/generative/SprintVelocity";
import { IssueCard } from "@/components/generative/IssueCard";
import { StandupSummary } from "@/components/generative/StandupSummary";

// Generative Components - Tambo UI
import { Graph, graphSchema } from "@/components/tambo/graph";

// Schemas
import {
  KanbanBoardSchema,
  GanttChartSchema,
  TeamLoadChartSchema,
  SprintVelocitySchema,
  IssueCardSchema,
  StandupSummarySchema,
} from "@/lib/schemas";

// Tools
import { tools as projectTools } from "@/lib/tools";

/**
 * components
 *
 * All Tambo generative components for Smart Project Autopilot.
 * The AI will choose the appropriate component based on user conversation.
 */
export const components: TamboComponent[] = [
  {
    name: "KanbanBoard",
    description:
      "A Kanban board showing tasks organized by status columns (Backlog, To Do, In Progress, Review, Done). Use when user asks to see tasks in a board view, update task status, or move cards.",
    component: KanbanBoard,
    propsSchema: KanbanBoardSchema,
  },
  {
    name: "GanttChart",
    description:
      "A Gantt chart showing project timeline with tasks, progress bars, dependencies, and milestones. Use when user asks about project timeline, task duration, or schedule.",
    component: GanttChart,
    propsSchema: GanttChartSchema,
  },
  {
    name: "TeamLoadChart",
    description:
      "A team workload chart showing each member's capacity, assigned points, and task list. Use when user asks about team load, who is overloaded, or capacity planning.",
    component: TeamLoadChart,
    propsSchema: TeamLoadChartSchema,
  },
  {
    name: "SprintVelocity",
    description:
      "A velocity chart showing completed vs planned points across sprints with trend analysis. Use when user asks about velocity, sprint performance, or team trends.",
    component: SprintVelocity,
    propsSchema: SprintVelocitySchema,
  },
  {
    name: "IssueCard",
    description:
      "A detailed issue card showing title, description, priority, assignee, labels, and linked PRs. Use when user asks about a specific issue or wants issue details.",
    component: IssueCard,
    propsSchema: IssueCardSchema,
  },
  {
    name: "StandupSummary",
    description:
      "A daily standup summary showing completed work, in-progress items, blockers, and highlights. Use when user asks for a sprint summary, standup report, daily status update, or what the team is working on.",
    component: StandupSummary,
    propsSchema: StandupSummarySchema,
  },
  {
    name: "Graph",
    description:
      "A versatile chart component supporting bar, line, and pie charts. Use when user asks for data visualization, analytics charts, or visual comparisons. Supports multiple datasets and customizable colors.",
    component: Graph,
    propsSchema: graphSchema,
  },
];

/**
 * tools
 *
 * All local tools for Smart Project Autopilot.
 * These extend Tambo's capabilities with project management functions.
 */
export const tools = projectTools;
