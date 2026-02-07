"use client";

/**
 * @file page.tsx
 * @description Smart Project Autopilot - Cyberpunk Dashboard with interactable Tambo components
 * Uses shared mock-data.ts as single source of truth for all data
 */

import { components, tools } from "@/lib/tambo";
import { mcpServers as staticMcpServers } from "@/lib/mcp-config";
import { useMcpServers } from "@/hooks/use-mcp-servers";
import { TamboProvider, useTamboThreadInput } from "@tambo-ai/react";
import {
  Sparkles,
  ChevronRight,
  Home,
  MessageCircleMore
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Tambo UI Components for chat
import {
  MessageInput,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/tambo/message-input";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/tambo/thread-content";

// Interactable Components
import { InteractableSprintBoard } from "@/components/interactable/ActiveSprintBoard";
import { InteractableTeamPanel } from "@/components/interactable/TeamAssignmentPanel";
import { InteractableGoals } from "@/components/interactable/GoalsWidget";
import { ElicitationHandler } from "@/components/ui/ElicitationHandler";
import { McpSetupGuide } from "@/components/ui/McpSetupGuide";

// Import data fetching service
import {
  fetchSprintData,
  fetchTeamData,
  fetchGoalsData,
  type SprintData,
  type TeamData,
  type GoalsData
} from "@/lib/data-service";
import { useEffect } from "react";

// Quick action component that sends a message - RESTORED
function QuickActionButton({ label, color }: { label: string; color: string }) {
  const { setValue, submit } = useTamboThreadInput();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      setValue(label);
      await new Promise(resolve => setTimeout(resolve, 100));
      await submit({ streamResponse: true });
    } catch (error) {
      console.error("Failed to send:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="px-3 py-1.5 text-xs font-mono transition-all hover:scale-105 disabled:opacity-50 border"
      style={{
        background: `${color}15`,
        borderColor: `${color}40`,
        color: color,
      }}
    >
      {isLoading ? "..." : label}
    </button>
  );
}

// Terminal Sidebar with Chat
function TerminalSidebar() {
  return (
    <aside className="w-[420px] border-l border-[rgba(255,255,255,0.08)] bg-black flex flex-col shrink-0 relative z-30 shadow-2xl">
      {/* Terminal Header */}
      <div className="h-10 bg-gray-900 border-b border-gray-800 flex items-center px-4 justify-between shrink-0">
        <span className="font-mono text-xs text-gray-400">root@autopilot:~ BASH</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
      </div>


      {/* Tambo AI Chat Messages - FULLY FUNCTIONAL */}
      <ScrollableMessageContainer className="flex-1 p-4 overflow-y-auto min-h-0 scrollbar-hidden">
        <ThreadContent variant="default">
          <ThreadContentMessages />
        </ThreadContent>
      </ScrollableMessageContainer>

      {/* Chat Input - FULLY FUNCTIONAL */}
      <div className="p-2 bg-gray-900/50 border-t border-gray-800 shrink-0">
        <MessageInput variant="bordered" className="bg-black border-gray-700">
          <MessageInputTextarea
            placeholder='Try: "Mark TAM-105 as done"'
            className="bg-transparent border-0 text-white placeholder:text-gray-600 font-mono text-sm min-h-[40px]"
          />
          <MessageInputToolbar>
            <MessageInputSubmitButton />
          </MessageInputToolbar>
        </MessageInput>
      </div>

      {/* Quick Actions - POWERFUL OPERATIONS */}
      <div className="p-4 border-t border-gray-800 shrink-0 bg-[#0a0a0f]">
        <p className="text-[10px] font-mono text-gray-500 mb-2 tracking-wide">
          🚀 POWERFUL ACTIONS (Can&apos;t do this with clicks!)
        </p>
        <div className="flex flex-wrap gap-2">
          <QuickActionButton label="Rebalance workload" color="#0aff0a" />
          <QuickActionButton label="Mark all blocked tasks as urgent" color="#ff5f1f" />
          <QuickActionButton label="Complete TAM-105 + update goals" color="#00f3ff" />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <QuickActionButton label="Generate sprint summary" color="#bd00ff" />
          <QuickActionButton label="Reassign Sarah's tasks to Mike" color="#ffb800" />
        </div>
      </div>
    </aside>
  );
}

function DashboardContent() {
  const [sprintData, setSprintData] = useState<SprintData | null>(null);
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [goalsData, setGoalsData] = useState<GoalsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [sprint, team, goals] = await Promise.all([
          fetchSprintData(),
          fetchTeamData(),
          fetchGoalsData(),
        ]);
        setSprintData(sprint);
        setTeamData(team);
        setGoalsData(goals);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#030303] text-white font-mono overflow-hidden selection:bg-[#00f3ff] selection:text-black">
      {/* Scanlines Effect */}
      <div className="scanlines" />

      {/* Header */}
      <header className="h-20 border-b border-[rgba(255,255,255,0.08)] bg-[#030303] flex items-center justify-between px-8 shrink-0 z-40 relative">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">

            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center border-2 border-[#00f3ff] bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Sparkles className="size-5 text-[#00f3ff] animate-pulse-glow" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-lg font-mono font-bold tracking-tight uppercase leading-none glitch-text">
                    Smart<br />Autopilot
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="h-10 w-1px bg-[rgba(255,255,255,0.08)] mx-1" />
          <div className="hidden md:block px-2 py-0.5 border border-[#ff5f1f] text-[#ff5f1f] text-xs font-mono ml-4 animate-border-pulse">
            [SYS_ACTIVE]
          </div>
          {/* AI Core Badge */}
          <div className="flex items-center gap-2 px-3 py-1 border border-[#bd00ff]/40 bg-[#bd00ff]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#bd00ff]" />
            <span className="text-[10px] font-mono font-bold text-[#bd00ff] uppercase">
              MCP
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-8">
          <Link href="/" className="text-sm font-mono text-gray-400 hover:text-[#00f3ff] transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            HOME
          </Link>
          <Link href="/chat" className="text-sm font-mono text-gray-400 hover:text-[#00f3ff] transition-colors flex items-center gap-1">
            <MessageCircleMore className="w-4 h-4" />
            CHAT
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0aff0a]/10 border border-[#0aff0a]/40">
            <span className="w-2 h-2 bg-[#0aff0a] animate-pulse" />
            <span className="text-[10px] font-mono text-[#0aff0a] uppercase">ONLINE</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Dashboard */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#030303] relative"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        >
          {/* Sub Header */}
          <div className="h-12 border-b border-[rgba(255,255,255,0.08)] bg-[#030303]/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 z-30">
            <div className="flex items-center gap-6 text-[10px] font-mono text-gray-500 uppercase">
              <span>Active_Modules: 6</span>
              <span>Load: 12%</span>
              <span><span className="text-[#00f3ff]">sys_id:</span> 994-A</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-gray-500">LOC: LOCALHOST</span>
              <span className="text-[10px] font-mono text-[#bd00ff] flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                [ ACCESS_LIBRARY ] <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Scrollable Content with Interactable Components */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hidden min-h-0">

            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-[#00f3ff] border-t-transparent rounded-full animate-spin" />
                  <p className="text-[#00f3ff] text-xs animate-pulse">ESTABLISHING_UPLINK...</p>
                </div>
              </div>
            ) : sprintData ? (
              <>
                {/* Sprint Board */}
                <InteractableSprintBoard {...sprintData} />

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {goalsData && <InteractableGoals {...goalsData} />}
                  {teamData && <InteractableTeamPanel {...teamData} />}
                </div>
              </>
            ) : (
              <McpSetupGuide />
            )}

          </div>
        </main>

        {/* Terminal Sidebar with WORKING Chat */}
        {sprintData && <TerminalSidebar />}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.1) 50%,
            rgba(0,0,0,0.1)
          );
          background-size: 100% 3px;
          position: fixed;
          pointer-events: none;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
          opacity: 0.3;
        }

        .header-font {
          font-family: 'Archivo Black', 'Inter', sans-serif;
          font-weight: 900;
        }

        .cyber-card {
          background: rgba(10, 10, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          overflow: hidden;
        }

        .cyber-card:hover {
          border-color: rgba(0, 243, 255, 0.2);
        }

        /* Custom Scrollbar */
        :global(::-webkit-scrollbar) {
          width: 4px;
          height: 4px;
        }

        :global(::-webkit-scrollbar-track) {
          background: #050505;
        }

        :global(::-webkit-scrollbar-thumb) {
          background: #333;
        }

        :global(::-webkit-scrollbar-thumb:hover) {
          background: #00f3ff;
        }
      `}</style>
    </div>
  );
}

export default function InteractablesPage() {
  const userMcpServers = useMcpServers();
  // Combine static (if any) with user configured
  const mcpServers = [...staticMcpServers, ...userMcpServers];

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      mcpServers={mcpServers}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
    >
      <ElicitationHandler />
      <DashboardContent />
    </TamboProvider>
  );
}
