"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";

import { components, tools } from "@/lib/tambo";
import { mcpServers as staticMcpServers } from "@/lib/mcp-config";
import { TamboProvider } from "@tambo-ai/react";
import {
  Sparkles,
  LayoutDashboard,
  ChevronRight,
  Home,
} from "lucide-react";
import Link from "next/link";
import { ElicitationHandler } from "@/components/ui/ElicitationHandler";

export default function ChatPage() {
  // Load user-configured MCP servers from localStorage
  // const userMcpServers = useMcpServers();
  // Combine static MCP servers with user-configured ones
  // Static servers (Linear, GitHub) are always available
  // User can add more via the MCP config modal
  const mcpServers = [...staticMcpServers];

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
    >
      <ElicitationHandler />
      <div className="h-screen bg-[#030303] flex flex-col font-mono text-white overflow-hidden selection:bg-[#00f3ff] selection:text-black">
        {/* Scanlines Effect */}
        <div className="scanlines" />

        {/* Header - Matching Landing Page */}
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
            <Link href="/interactables" className="text-sm font-mono text-gray-400 hover:text-[#00f3ff] transition-colors flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" />
              DASHBOARD
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#0aff0a]/10 border border-[#0aff0a]/40">
              <span className="w-2 h-2 bg-[#0aff0a] animate-pulse" />
              <span className="text-[10px] font-mono text-[#0aff0a] uppercase">ONLINE</span>
            </div>
          </nav>
        </header>

        {/* Sub Header */}
        <div className="h-12 border-b border-[rgba(255,255,255,0.08)] bg-[#030303]/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 z-30">
          <div className="flex items-center gap-6 text-[10px] font-mono text-gray-500 uppercase">
            <span>Mode: GENERATIVE_UI</span>
            <span>Components: 8</span>
            <span><span className="text-[#00f3ff]">session:</span> ACTIVE</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-gray-500">LOC: LOCALHOST</span>
            <span className="text-[10px] font-mono text-[#bd00ff] flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              [ FULL_SCREEN ] <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Chat Area with Terminal Styling */}
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* Corner Notches */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00f3ff] z-10" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#00f3ff] z-10" />
          <div className="absolute bottom-16 left-4 w-4 h-4 border-b-2 border-l-2 border-[#00f3ff] z-10" />
          <div className="absolute bottom-16 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00f3ff] z-10" />

          {/* Chat Content */}
          <div className="h-full px-4 py-2">
            <MessageThreadFull className="h-full chat-terminal" />
          </div>
        </div>

        {/* Footer Hints - Terminal Style */}
        <div className="border-t border-[rgba(255,255,255,0.08)] bg-black px-8 py-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#00f3ff] font-mono text-xs">&gt;</span>
              <span className="text-[10px] font-mono text-gray-500 uppercase">🚀 POWERFUL ACTIONS:</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-400 px-2 py-1 border border-gray-800 hover:border-[#0aff0a] hover:text-[#0aff0a] transition-all cursor-pointer">
                &quot;rebalance workload&quot;
              </span>
              <span className="text-xs font-mono text-gray-400 px-2 py-1 border border-gray-800 hover:border-[#ff5f1f] hover:text-[#ff5f1f] transition-all cursor-pointer">
                &quot;mark all todo as in_progress&quot;
              </span>
              <span className="text-xs font-mono text-gray-400 px-2 py-1 border border-gray-800 hover:border-[#00f3ff] hover:text-[#00f3ff] transition-all cursor-pointer">
                &quot;complete TAM-105 + update goals&quot;
              </span>
              <span className="text-xs font-mono text-gray-400 px-2 py-1 border border-gray-800 hover:border-[#bd00ff] hover:text-[#bd00ff] transition-all cursor-pointer">
                &quot;sprint summary&quot;
              </span>
            </div>
            <div className="text-[10px] font-mono text-gray-600">
              CAN&apos;T DO THIS WITH CLICKS
            </div>
          </div>
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

          /* Override MessageThread styles for terminal look */
          :global(.chat-terminal) {
            background: transparent !important;
          }

          :global(.chat-terminal input),
          :global(.chat-terminal textarea) {
            background: #0a0a0a !important;
            border-color: #1a1a1a !important;
            font-family: 'JetBrains Mono', monospace !important;
          }

          :global(.chat-terminal input:focus),
          :global(.chat-terminal textarea:focus) {
            border-color: #00f3ff !important;
            box-shadow: 0 0 10px rgba(0, 243, 255, 0.2) !important;
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
    </TamboProvider>
  );
}
