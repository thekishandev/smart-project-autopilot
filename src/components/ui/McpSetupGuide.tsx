import { Terminal, ShieldAlert, Cpu, ArrowRight, Server, Key, Settings, Github } from "lucide-react";

import Stepper, { Step } from './Stepper';
import Link from "next/link";

export function McpSetupGuide() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto p-8 text-center space-y-8 animate-in fade-in duration-500">

            {/* Icon Header */}
            <div className="relative">
                <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center animate-pulse">
                    <ShieldAlert className="w-10 h-10 text-red-500" />
                </div>
                <div className="absolute -top-2 -right-2 bg-black border border-red-500 text-red-500 text-[10px] px-2 py-0.5 font-mono uppercase">
                    Connection_Refused
                </div>
            </div>
            {/* Main Message */}
            <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold font-mono text-white tracking-tight uppercase">
                    MCP Uplink Required
                </h2>
                <p className="text-gray-400 font-mono text-sm max-w-md mx-auto leading-relaxed">
                    The Autopilot cannot access your project data because no active Model Context Protocol (MCP) server was detected.
                </p>
            </div>
            <Stepper
                initialStep={0}
                backButtonText="Back"
                nextButtonText="Next"
            >
                <Step>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
                            <Key className="w-8 h-8 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-bold font-mono">Prerequisites</h2>
                        <p className="text-sm text-gray-400 max-w-md">
                            Before starting, ensure you have your credentials ready:
                        </p>
                        <div className="w-full max-w-sm grid gap-3 text-left">
                            <div className="p-3 bg-white/5 border border-white/10 rounded flex justify-between items-center group">
                                <span className="text-xs font-mono text-gray-300">Linear User API Key</span>
                                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Required</span>
                            </div>
                            <div className="p-3 bg-white/5 border border-white/10 rounded flex justify-between items-center">
                                <span className="text-xs font-mono text-gray-300">GitHub Personal Access Token</span>
                                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Required</span>
                            </div>
                        </div>
                    </div>
                </Step>

                <Step>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-2">
                            <Settings className="w-8 h-8 text-purple-400" />
                        </div>
                        <h2 className="text-xl font-bold font-mono">Navigate to Settings</h2>
                        <p className="text-sm text-gray-400 max-w-md">
                            Open the Tambo Dashboard, select your Project, and go to the <strong>Settings</strong> tab.
                        </p>
                        <div className="mt-2">
                            <a href="https://console.tambo.co/" target="_blank" className="text-purple-400 underline underline-offset-4 font-mono text-xs hover:text-purple-300">
                                Open Tambo Console ↗
                            </a>
                        </div>
                    </div>
                </Step>

                <Step>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                            <Server className="w-8 h-8 text-green-400" />
                        </div>
                        <h2 className="text-xl font-bold font-mono">Add MCP Server</h2>
                        <p className="text-sm text-gray-400 max-w-md">
                            In the Settings menu, locate the <strong>MCP Servers</strong> section and click "Add MCP Server".
                        </p>
                        <div className="w-full max-w-xs bg-[#0a0a0f] border border-gray-800 p-2 rounded text-left mt-2 opacity-80">
                            <div className="h-4 w-24 bg-gray-800 rounded mb-2"></div>
                            <div className="h-8 w-full bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center text-[10px] text-green-400 font-mono">
                                + Add MCP Server
                            </div>
                        </div>
                    </div>
                </Step>

                <Step>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-[#5E6AD2]/10 rounded-full flex items-center justify-center mb-2">
                            <div className="w-8 h-8 bg-[#5E6AD2] rounded-md flex items-center justify-center text-white font-bold text-xs">L</div>
                        </div>
                        <h2 className="text-xl font-bold font-mono">Configure Linear</h2>
                        <div className="w-full max-w-md bg-[#0a0a0f] border border-gray-700/50 rounded-lg p-4 text-left space-y-3">
                            <div>
                                <label className="text-[10px] uppercase text-gray-500 font-mono">Server URL</label>
                                <div className="bg-black border border-gray-800 p-2 rounded text-xs font-mono text-blue-300 select-all">
                                    https://mcp.linear.app/mcp
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase text-gray-500 font-mono">Type</label>
                                <div className="bg-black border border-gray-800 p-2 rounded text-xs font-mono text-gray-300">
                                    SSE (Server-Sent Events)
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase text-gray-500 font-mono">Server Key</label>
                                <div className="bg-black border border-gray-800 p-2 rounded text-xs font-mono text-gray-500 italic">
                                    Paste your Linear API Key here...
                                </div>
                            </div>
                        </div>
                    </div>
                </Step>

                <Step>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                            <Github className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-xl font-bold font-mono">Configure GitHub</h2>
                        <div className="w-full max-w-md bg-[#0a0a0f] border border-gray-700/50 rounded-lg p-4 text-left space-y-3">
                            <div>
                                <label className="text-[10px] uppercase text-gray-500 font-mono">Server URL</label>
                                <div className="bg-black border border-gray-800 p-2 rounded text-xs font-mono text-blue-300 select-all">
                                    https://api.githubcopilot.com/mcp/
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase text-gray-500 font-mono">Type</label>
                                <div className="bg-black border border-gray-800 p-2 rounded text-xs font-mono text-gray-300">
                                    SSE (Server-Sent Events)
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase text-gray-500 font-mono">Server Key</label>
                                <div className="bg-black border border-gray-800 p-2 rounded text-xs font-mono text-gray-500 italic">
                                    Paste your GitHub Personal Access Token here...
                                </div>
                            </div>
                        </div>
                    </div>
                </Step>
            </Stepper>
        </div>
    );
}
