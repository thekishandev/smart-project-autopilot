/**
 * @file data-service.ts
 * @description Abstraction layer for fetching project data.
 * Switches between Mock Data (local/demo) and Real Data (MCP/API) based on configuration.
 */

import {
    getSprintBoardData,
    getTeamData,
    getGoalsData,
} from "./mock-data";

// Type definitions matching the component props
// (In a real app, these would be shared types)
export type SprintData = ReturnType<typeof getSprintBoardData>;
export type TeamData = ReturnType<typeof getTeamData>;
export type GoalsData = ReturnType<typeof getGoalsData>;

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'false'; // Default to false (Real Data)

/**
 * Fetch Sprint Board Data
 */
export async function fetchSprintData(): Promise<SprintData | null> {
    if (USE_MOCK_DATA) {
        console.log("Using Mock Data for Sprint Board");
        // Simulate network delay for realism
        await new Promise((resolve) => setTimeout(resolve, 800));
        return getSprintBoardData();
    }

    // Real Data Implementation (MCP/API)
    // TODO: Implement fetching from /api/linear/sprint or similar
    console.warn("Real data fetching not implemented yet. MCP Connection required.");
    return null;
}

/**
 * Fetch Team Data
 */
export async function fetchTeamData(): Promise<TeamData | null> {
    if (USE_MOCK_DATA) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 600));
        return getTeamData();
    }

    // Real Data Implementation
    console.warn("Real data fetching not implemented yet.");
    return null;
}

/**
 * Fetch Goals Data
 */
export async function fetchGoalsData(): Promise<GoalsData | null> {
    if (USE_MOCK_DATA) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return getGoalsData();
    }

    // Real Data Implementation
    console.warn("Real data fetching not implemented yet.");
    return null;
}

/**
 * Configuration Helper
 */
export function isUsingMockData() {
    return USE_MOCK_DATA;
}
