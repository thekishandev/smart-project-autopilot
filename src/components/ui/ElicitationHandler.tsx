"use client";

/**
 * @file ElicitationHandler.tsx
 * @description Handles MCP elicitations - interactive forms that MCP servers can trigger
 * 
 * When an MCP server needs additional user input (confirmations, form data, etc.),
 * it triggers an elicitation. This component renders those prompts in the 
 * cyberpunk terminal style matching the rest of the app.
 */

import { useTamboMcpElicitation } from "@tambo-ai/react/mcp";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

/**
 * ElicitationHandler - Renders MCP elicitation dialogs
 * 
 * Place this component inside TamboMcpProvider to handle elicitations.
 * It automatically shows when an MCP server requests user input.
 */
export function ElicitationHandler() {
    const { elicitation, resolveElicitation } = useTamboMcpElicitation();

    // No active elicitation - render nothing
    if (!elicitation) return null;

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] backdrop-blur-sm">
            <div className="bg-[#0a0a0f] border border-[#00f3ff]/40 shadow-[0_0_30px_rgba(0,243,255,0.1)] max-w-lg w-full mx-4 overflow-hidden">
                {/* Terminal-style header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#00f3ff]/20 bg-gradient-to-r from-[#00f3ff]/5 to-transparent">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs font-mono text-[#00f3ff] tracking-wider uppercase">
                            [ CONFIRMATION_REQUIRED ]
                        </span>
                    </div>
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Message from MCP server */}
                    <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
                        {elicitation.message || "An action requires your confirmation."}
                    </p>

                    {/* Schema-based form fields would be rendered here */}
                    {/* Tambo's built-in UI handles complex schemas automatically */}
                    {/* This is a simplified version for confirmations */}

                    {/* Info box */}
                    <div className="bg-[#0aff0a]/5 border border-[#0aff0a]/20 px-4 py-3 mb-6">
                        <p className="text-[11px] font-mono text-[#0aff0a]/70">
                            &gt; This action was triggered by an MCP integration.
                            <br />
                            &gt; Review carefully before confirming.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => resolveElicitation?.({ action: "accept", content: {} })}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0aff0a] text-black font-mono text-sm font-bold hover:bg-[#08dd08] transition-all duration-200 group"
                        >
                            <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            CONFIRM
                        </button>
                        <button
                            onClick={() => resolveElicitation?.({ action: "decline" })}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-700 text-gray-400 font-mono text-sm hover:border-red-500 hover:text-red-500 transition-all duration-200 group"
                        >
                            <XCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            CANCEL
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-gray-800/50 bg-black/30">
                    <p className="text-[10px] font-mono text-gray-600 text-center">
                        Press ESC to cancel • MCP Integration
                    </p>
                </div>
            </div>
        </div>
    );
}

/**
 * ElicitationToast - A smaller, less intrusive elicitation UI
 * Use this for non-blocking elicitations that appear as toasts
 */
export function ElicitationToast() {
    const { elicitation, resolveElicitation } = useTamboMcpElicitation();

    if (!elicitation) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[100] animate-in slide-in-from-right-5 duration-300">
            <div className="bg-[#0a0a0f] border border-[#00f3ff]/30 shadow-[0_0_20px_rgba(0,243,255,0.1)] max-w-sm p-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-gray-300 font-mono mb-3">
                            {elicitation.message || "Confirm action?"}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => resolveElicitation?.({ action: "accept", content: {} })}
                                className="px-3 py-1.5 bg-[#0aff0a] text-black text-xs font-mono font-bold hover:bg-[#08dd08] transition-colors"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => resolveElicitation?.({ action: "decline" })}
                                className="px-3 py-1.5 border border-gray-700 text-gray-400 text-xs font-mono hover:border-red-500 hover:text-red-500 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
