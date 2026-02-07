"use client";

import { useState } from "react";
import { Copy, Check, AlertTriangle, Terminal, Cpu } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all hover:scale-105"
      style={{
        background: copied ? "rgba(0,255,136,0.2)" : "rgba(0,255,247,0.15)",
        border: `1px solid ${copied ? "rgba(0,255,136,0.4)" : "rgba(0,255,247,0.4)"}`,
        color: copied ? "#00ff88" : "#00fff7",
      }}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          COPIED
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          COPY
        </>
      )}
    </button>
  );
}

export function ApiKeyCheck({ children }: { children: React.ReactNode }) {
  // Check if Tambo is properly initialized by checking if API key is set
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;
  const isInitialized = Boolean(apiKey && apiKey.length > 0);


  if (!isInitialized) {
    return (
      <div
        className="p-5 rounded-xl space-y-4"
        style={{
          background: "linear-gradient(135deg, rgba(255,170,0,0.1), rgba(255,51,102,0.1))",
          border: "1px solid rgba(255,170,0,0.4)",
          boxShadow: "0 0 30px rgba(255,170,0,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#ffaa00]/20 border border-[#ffaa00]/40 shadow-[0_0_15px_rgba(255,170,0,0.4)]"
          >
            <AlertTriangle className="w-5 h-5 text-[#ffaa00]" />
          </div>
          <div>
            <h3 className="font-mono font-semibold text-white text-sm tracking-wide">
              TAMBO API KEY REQUIRED
            </h3>
            <p className="text-xs text-[#808090] font-sans">
              Add your API key to enable AI features
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg space-y-3 bg-[#0a0a0f] border border-[#1a1a2e]">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-[#00fff7]" />
            <span className="text-xs font-mono text-[#00fff7]">
              TERMINAL COMMANDS
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-[#606070] font-mono">1. Get your API key:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 rounded text-xs font-mono bg-[#12121a] border border-[#1a1a2e] text-[#00fff7]">
                npx tambo login
              </code>
              <CopyButton text="npx tambo login" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-[#606070] font-mono">2. Add to .env file:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 rounded text-xs font-mono truncate bg-[#12121a] border border-[#1a1a2e] text-[#ff00ff]">
                NEXT_PUBLIC_TAMBO_API_KEY=your_key
              </code>
              <CopyButton text="NEXT_PUBLIC_TAMBO_API_KEY=your_key_here" />
            </div>
          </div>

          <p className="text-[10px] text-[#505060] font-mono pt-2">
            Then restart the dev server with{" "}
            <span className="text-[#00ff88]">npm run dev</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_10px_#00ff88]" />
        <span className="text-sm font-mono text-[#00ff88]">
          TAMBO INITIALIZED
        </span>
        <Cpu className="w-4 h-4 text-[#00ff88]" />
      </div>
      {children}
    </div>
  );
}
