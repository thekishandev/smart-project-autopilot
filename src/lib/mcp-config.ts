/**
 * @file mcp-config.ts
 * @description MCP server configuration for Smart Project Autopilot
 * 
 * IMPORTANT: MCP Architecture in Tambo
 * =====================================
 * 
 * 1. SERVER-SIDE MCP (Tambo Dashboard) - RECOMMENDED
 *    - Configure at: https://console.tambo.co/dashboard
 *    - Servers are connected server-side by Tambo
 *    - Supports OAuth authentication
 *    - No CORS issues, works automatically
 *    - You have configured: Linear MCP ✅
 * 
 * 2. CLIENT-SIDE MCP (mcpServers prop)
 *    - Configured here in code
 *    - Browser connects directly to MCP servers
 *    - ⚠️ Subject to CORS restrictions (may not work for most servers)
 *    - Only use for MCP servers that explicitly support browser CORS
 * 
 * Your Linear MCP configured in Tambo Dashboard works automatically!
 * The AI will use real Linear tools without any client-side config.
 */

import { MCPTransport } from "@tambo-ai/react/mcp";

/**
 * Client-side MCP Servers (Optional)
 * 
 * These are ADDITIONAL servers beyond what's configured in Tambo Dashboard.
 * Only add servers here if they explicitly support browser CORS.
 * 
 * Currently empty because:
 * - Linear MCP: Configured in Tambo Dashboard (server-side, works better)
 * - GitHub MCP: Doesn't support OAuth dynamic registration
 * 
 * Users can add more via the MCP Config Modal in the chat UI.
 */
export type McpServerConfig = {
    name: string;
    url: string;
    serverKey: string;
    transport: typeof MCPTransport[keyof typeof MCPTransport];
    customHeaders?: Record<string, string>;
};

export const mcpServers: Array<McpServerConfig> = [
    // No static client-side servers - use Tambo Dashboard for MCP config
    // User-added servers from MCP Config Modal are added at runtime
];

/**
 * MCP Tools Available (from Tambo Dashboard Linear MCP)
 * 
 * After configuring Linear in Tambo Dashboard, these tools are available:
 * - linear__list_issues     - List issues with filters
 * - linear__create_issue    - Create new issues
 * - linear__update_issue    - Update issue status, assignee
 * - linear__get_issue       - Get issue details
 * 
 * The AI will automatically use these tools when you ask about Linear!
 */

