"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Kanban,
  Terminal,
  Network,
  Cpu,
  Zap,
  Star,
  ArrowRight,
  Settings,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  SkeletonOne,
  SkeletonTwo,
  SkeletonThree,
  SkeletonFour,
  SkeletonFive,
} from "@/components/ui/bento-skeletons";

// Feature data with cyberpunk styling
const systemModules = [
  {
    id: "MOD_02",
    icon: <Kanban className="h-4 w-4 text-neutral-500" />,
    title: "Generative_Sprint_Boards",
    description: "Forget manual updates. The AI generates Kanban boards directly from your Linear state via MCP.",
    header: <SkeletonOne />,
    className: "md:col-span-1",
  },
  {
    id: "MOD_03",
    icon: <Terminal className="h-4 w-4 text-neutral-500" />,
    title: "Server-Side_MCP",
    description: "Securely connects to Linear & GitHub. Executes commands without exposing API keys to the client.",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
  },
  {
    id: "MOD_05",
    icon: <Cpu className="h-4 w-4 text-neutral-500" />, // Changed Brain to Cpu
    title: "Dual-Engine_Architecture",
    description: "Combines LLM intent understanding with structured code generation for reliable UI.",
    header: <SkeletonThree />,
    className: "md:col-span-1",
  },
  {
    id: "MOD_04",
    icon: <Network className="h-4 w-4 text-neutral-500" />,
    title: "Context_Aware_Autopilot",
    description: "It doesn't just read code; it understands the project graph. Dependencies, blockers, and velocity.",
    header: <SkeletonFour />,
    className: "md:col-span-2",
  },
  {
    id: "MOD_06",
    icon: <Zap className="h-4 w-4 text-neutral-500" />,
    title: "Zero_Latency_Streaming",
    description: "Generative UI components stream instantly. No loading spinners, just pure speed.",
    header: <SkeletonFive />,
    className: "md:col-span-1",
  },
];

// Terminal commands for typewriter effect
const terminalCommands = [
  { prompt: "connect --mcp=linear --sync=true", delay: 40 },
  { prompt: "analyze --sprint=current --detect=bottlenecks", delay: 40 },
  { prompt: "autopilot --resolve-blockers --notify=@team", delay: 40 },
];

// Typewriter hook
function useTypewriter(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
      }
    };

    const delayTimeout = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, startDelay]);

  return { displayText, isComplete };
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startDelay: number = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const delayTimeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, startDelay]);

  return count;
}

// Intersection Observer hook for scroll animations
function useInView(threshold: number = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { setRef, isInView };
}

export default function HomePage() {
  const [particles, setParticles] = useState<Array<{ left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    setParticles(
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      }))
    );
  }, []);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { displayText: terminalText, isComplete } = useTypewriter(
    "autopilot --resolve-blockers --notify=@team",
    40,
    2000
  );

  // Track mouse for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 overflow-x-hidden antialiased font-sans cursor-crosshair">
      {/* Animated Grid Pattern Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0 animate-grid-pulse"
        style={{
          backgroundImage: 'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Mouse Spotlight Effect */}
      <div
        className="fixed pointer-events-none z-[1] opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 243, 255, 0.1), transparent 40%)`,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b-2 border-[#1a1a1a] bg-[#050505]/90 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center border-2 border-[#00f3ff] bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 transition-all duration-300 hover:scale-110 hover:rotate-3">
                <Sparkles className="size-5 text-[#00f3ff] animate-pulse-glow" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-lg font-mono font-bold tracking-tight uppercase leading-none glitch-text">
                  Smart<br />Autopilot
                </span>
              </div>
              <div className="hidden md:block px-2 py-0.5 border border-[#ff5f1f] text-[#ff5f1f] text-xs font-mono ml-4 animate-border-pulse">
                [SYS_ACTIVE]
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {["SYSTEM_LOGIC", "FEATURES", "COMPONENTS"].map((item, i) => (
                <a
                  key={item}
                  className="nav-link px-4 py-2 text-sm font-mono text-gray-400 hover:text-[#00f3ff] hover:bg-white/5 border border-transparent hover:border-[#00f3ff]/30 transition-all uppercase relative overflow-hidden group"
                  href={`#${item.toLowerCase().replace("_", "-")}`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="relative z-10">// {item}</span>
                  <span className="absolute inset-0 bg-[#00f3ff]/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-mono text-gray-300 border border-[#1a1a1a] hover:border-white transition-all bg-black uppercase group hover:scale-105">
                <a href="https://github.com/thekishandev/smart-project-autopilot" target="_blank">
                  <Star className="size-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span>GitHub_Star</span>
                </a>
              </button>
              <a
                href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fthekishandev%2Fsmart-project-autopilot&env=NEXT_PUBLIC_TAMBO_API_KEY,NEXT_PUBLIC_TAMBO_URL"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button flex items-center gap-2 bg-[#00f3ff] px-5 py-2 text-sm font-mono font-bold text-black border-2 border-[#00f3ff] hover:bg-transparent hover:text-[#00f3ff] transition-all uppercase"
              >
                <svg className="size-4 fill-white" viewBox="0 0 1155 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="currentColor" />
                </svg>
                <span>Deploy_Now</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 lg:pt-55 lg:pb-55 overflow-hidden border-b-2 border-[#1a1a1a]">
        {/* Multiple Scan Lines */}
        <div className="scan-line" />
        <div className="scan-line-2" />

        {/* Floating Particles */}
        <div className="particles">
          {particles.map((p, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>

        {/* System Info with typing effect */}
        <div className="absolute right-10 top-32 text-xs font-mono text-gray-700 hidden lg:block text-right animate-fade-in-right">
          SYS_ID: 994-A<br />
          LOC: LOCALHOST<br />
          STATUS: <span className="text-[#0aff0a] animate-pulse">READY</span>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <div className="flex flex-col items-start text-left">
              {/* Hackathon Badge */}
              <div className="mb-8 inline-flex items-center gap-3 border border-[#ffb800] bg-[#ffb800]/10 px-3 py-1 animate-slide-in-left hover:scale-105 transition-transform cursor-pointer">
                <span className="flex size-2 bg-[#ffb800] animate-ping-slow" />
                <span className="text-xs font-mono font-bold text-[#ffb800] uppercase tracking-wider">
                  The UI Strikes Back | Tambo Hackathon
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter text-white mb-6 uppercase leading-tight animate-slide-in-up">
                <span className="inline-block hover:skew-x-2 transition-transform">Project</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-blue-600 animate-gradient-x">
                  Autopilot
                </span>
                <span className="text-[#00f3ff] animate-blink">_</span>
              </h1>

              <div className="w-full h-px bg-gradient-to-r from-[#1a1a1a] via-[#00f3ff]/50 to-[#1a1a1a] mb-6 animate-expand-x" />

              <div className="text-lg md:text-xl font-mono text-gray-400 mb-10 leading-relaxed max-w-xl animate-fade-in">
                <p className="typing-line">&gt; CONTEXT-AWARE via Server-Side MCP.</p>
                <p className="typing-line" style={{ animationDelay: "0.5s" }}>&gt; SELF-GENERATING UI Components.</p>
                <p className="typing-line" style={{ animationDelay: "1s" }}>&gt; ZERO-LATENCY Streaming Architecture.</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-12 animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
                <Link
                  href="/interactables"
                  className="group relative flex h-14 items-center justify-center bg-[#00f3ff] px-8 text-lg font-mono font-bold text-black border-2 border-[#00f3ff] hover:bg-black hover:text-[#00f3ff] transition-all uppercase overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="absolute -bottom-2 -right-2 h-full w-full border-2 border-white group-hover:bottom-0 group-hover:right-0 transition-all z-[-1]" />
                  <span className="relative z-10 flex items-center gap-2">
                    &gt; RUN_DEMO
                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/chat"
                  className="group flex h-14 items-center justify-center border-2 border-[#1a1a1a] bg-transparent px-8 text-lg font-mono font-bold text-white hover:border-[#ffb800] hover:text-[#ffb800] transition-all uppercase overflow-hidden relative"
                >
                  <span className="absolute inset-0 bg-[#ffb800]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <span className="relative z-10">[ VIEW_CHAT ]</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Terminal Preview */}
            <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] border-2 border-[#1a1a1a] bg-black p-2 cyber-border animate-slide-in-right hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] transition-shadow duration-500">
              <div className="absolute top-0 left-0 bg-[#00f3ff] text-black text-xs font-mono px-2 py-1 font-bold z-10 animate-pulse-glow">
                TERMINAL_PREVIEW
              </div>
              <div className="h-full w-full border border-gray-800 bg-black p-4 font-mono text-sm flex flex-col relative overflow-hidden">
                {/* Scanline overlay */}
                <div className="scanline-overlay" />

                <div className="flex justify-between border-b border-gray-800 pb-2 mb-4 text-gray-500 text-xs">
                  <span className="animate-pulse">root@autopilot:~</span>
                  <span>BASH</span>
                </div>

                <div className="space-y-4 text-gray-300 flex-1 overflow-y-auto scrollbar-hidden">
                  <div className="flex gap-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <span className="text-[#00f3ff]">➜</span>
                    <span className="text-white">~</span>
                    <span className="typing-effect">tambo connect --service=linear --mode=mcp-server</span>
                  </div>
                  <div className="text-gray-500 pl-4 animate-fade-in" style={{ animationDelay: "1s" }}>
                    <span className="text-[#0aff0a]">[INFO]</span> Initializing MCP Proxy Bridge...<br />
                    <span className="text-[#0aff0a]">[INFO]</span> Handshaking with Linear API (OAuth delegated)...<br />
                    <span className="text-[#00f3ff]">[SUCCESS]</span> Context Established: Workspace "Tambo_Hackathon"
                  </div>

                  <div className="flex gap-2 pt-2 animate-fade-in" style={{ animationDelay: "1.5s" }}>
                    <span className="text-[#00f3ff]">➜</span>
                    <span className="text-white">~</span>
                    <span>analyze --sprint=current --detect=bottlenecks</span>
                  </div>

                  <div className="pl-4 border-l-2 border-[#ffb800] ml-1 my-2 bg-[#ffb800]/5 p-2 animate-fade-in" style={{ animationDelay: "2s" }}>
                    <div className="text-[#ffb800] text-xs mb-2 flex items-center gap-2">
                      <span className="animate-spin-slow">⟳</span> Generating UI from live graph data...
                    </div>
                    <div className="flex items-center gap-4 h-20 w-full px-4 overflow-hidden relative">
                      {/* Workflow Nodes */}
                      {[
                        { status: "complete", color: "#00f3ff", label: "INGEST" },
                        { status: "complete", color: "#00f3ff", label: "PARSE" },
                        { status: "blocked", color: "#ff5f1f", label: "DEPLOY" },
                      ].map((node, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`
                            relative z-10 w-8 h-8 rounded-full border flex items-center justify-center font-bold text-[10px]
                            ${node.status === 'blocked' ? 'border-[#ff5f1f] bg-[#ff5f1f]/10 animate-pulse text-[#ff5f1f]' : 'border-[#00f3ff] bg-[#00f3ff]/10 text-[#00f3ff]'}
                          `}>
                            {node.status === 'complete' ? '✓' : '!'}
                          </div>
                          {i < 2 && (
                            <div className="w-8 h-0.5 bg-gray-800 relative overflow-hidden">
                              <div className="absolute inset-0 bg-[#00f3ff] animate-progress" style={{ animationDelay: `${i * 0.5}s` }} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 animate-fade-in" style={{ animationDelay: "2.5s" }}>
                    <span className="text-[#00f3ff]">➜</span>
                    <span className="text-white">~</span>
                    <span className="text-white">{terminalText}<span className={`${isComplete ? 'hidden' : 'animate-blink'}`}>|</span></span>
                  </div>
                  {isComplete && (
                    <div className="text-gray-500 pl-4 animate-fade-in">
                      <span className="text-[#0aff0a]">[SUCCESS]</span> 3 blockers cleared. Slack notification deployed via Galactic Bridge.
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-2 border-t border-gray-800 flex items-center gap-2">
                  <span className="text-[#00f3ff] font-bold">&gt;</span>
                  <div className="h-4 w-2 bg-[#00f3ff] animate-blink" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Input Processing Section */}
      <section className="py-24 bg-black border-b-2 border-[#1a1a1a] relative overflow-hidden" id="system-logic">
        <div className="absolute right-0 top-0 w-32 h-32 border-l-2 border-b-2 border-[#00f3ff] opacity-20 animate-pulse" />
        <div className="absolute left-0 bottom-0 w-24 h-24 border-r-2 border-t-2 border-[#ffb800] opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 border-l-4 border-[#ff5f1f] pl-6 hover:border-l-8 transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2 uppercase animate-slide-in-left">Intent-to-UI_Pipeline</h2>
            <p className="text-gray-500 font-mono text-sm max-w-xl">
              // FROM NATURAL LANGUAGE TO REACT COMPONENTS via TAMBO SDK.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Input */}
            <div className="lg:col-span-5 group">
              <div className="border-2 border-[#1a1a1a] bg-[#1a1a1a]/20 p-1 relative transform group-hover:scale-[1.02] transition-transform duration-300">
                <div className="bg-black border border-gray-800 p-6 font-mono text-sm group-hover:border-[#00f3ff]/30 transition-colors">
                  <div className="text-gray-500 mb-4 text-xs flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#0aff0a] rounded-full animate-pulse" />
                    USER_INTENT_BUFFER
                  </div>
                  <div className="text-white">
                    <span className="text-[#00f3ff]">user_says:</span> &quot;Fix the login timeout issue (it&apos;s urgent) and create a feature branch for it.&quot;
                  </div>
                </div>
                <div className="absolute -right-2 top-1/2 w-2 h-2 bg-[#00f3ff] animate-ping" />
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-center py-4 lg:py-0">
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="h-12 w-px lg:h-px lg:w-12 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent animate-flow-down lg:animate-flow-right" />
                <div className="border border-[#00f3ff] text-[#00f3ff] px-2 py-1 text-xs font-mono uppercase bg-black animate-pulse hover:scale-110 transition-transform cursor-pointer">
                  PROCESSING...
                </div>
                <div className="h-12 w-px lg:h-px lg:w-12 bg-gradient-to-b lg:bg-gradient-to-r from-[#00f3ff] via-[#00f3ff] to-transparent animate-flow-down lg:animate-flow-right" style={{ animationDelay: "0.5s" }} />
              </div>
            </div>

            {/* Output */}
            <div className="lg:col-span-5 group">
              <div className="border-2 border-[#00f3ff] p-1 relative shadow-[0_0_20px_rgba(0,243,255,0.15)] group-hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] transition-shadow duration-500">
                <div className="bg-black border border-[#00f3ff]/30 p-6 font-mono text-sm">
                  <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                    <span className="text-[#00f3ff] text-xs flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#00f3ff] rounded-full animate-pulse" />
                      EXECUTION_PLAN
                    </span>
                    <span className="bg-[#ff5f1f] text-black px-1 text-[10px] font-bold animate-pulse">MCP_TOOL_CALL</span>
                  </div>
                  <div className="text-green-500 space-y-1">
                    <div className="animate-fade-in">[</div>
                    <div className="pl-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                      <span className="text-purple-400">{"{"}</span> <span className="text-[#00f3ff]">&quot;tool&quot;</span>: <span className="text-yellow-300">&quot;linear_create_issue&quot;</span>, <span className="text-[#00f3ff]">&quot;args&quot;</span>: <span className="text-purple-400">{"{"}</span> <span className="text-[#00f3ff]">&quot;title&quot;</span>: <span className="text-yellow-300">&quot;Fix login timeout&quot;</span>, <span className="text-[#00f3ff]">&quot;priority&quot;</span>: <span className="text-[#ff5f1f]">&quot;URGENT&quot;</span> <span className="text-purple-400">{"}"}</span> <span className="text-purple-400">{"}"}</span>,
                    </div>
                    <div className="pl-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                      <span className="text-purple-400">{"{"}</span> <span className="text-[#00f3ff]">&quot;tool&quot;</span>: <span className="text-yellow-300">&quot;github_create_branch&quot;</span>, <span className="text-[#00f3ff]">&quot;args&quot;</span>: <span className="text-purple-400">{"{"}</span> <span className="text-[#00f3ff]">&quot;name&quot;</span>: <span className="text-yellow-300">&quot;fix/auth-timeout&quot;</span>, <span className="text-[#00f3ff]">&quot;from&quot;</span>: <span className="text-yellow-300">&quot;main&quot;</span> <span className="text-purple-400">{"}"}</span> <span className="text-purple-400">{"}"}</span>
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>]</div>
                  </div>
                </div>
                <div className="absolute -left-2 top-1/2 w-2 h-2 bg-[#00f3ff] animate-ping" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Modules / Features */}
      <section className="py-24 bg-[#050505] relative" id="features">
        <div className="grid-bg" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl font-mono font-bold text-white mb-2 uppercase glitch-text">Core_Architecture</h2>
              <div className="h-1 w-20 bg-[#ffb800] animate-expand-x" />
            </div>
            <div className="hidden md:block text-right font-mono text-xs text-gray-500">
              ACTIVE_MODULES: <span className="text-[#0aff0a]">6</span><br />
              LOAD: <span className="text-[#00f3ff]">12%</span>
            </div>
          </div>

          <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            {systemModules.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Generated Components Section */}
      < section className="py-24 bg-black border-t-2 border-[#1a1a1a]" id="components" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#1a1a1a] pb-4">
            <div>
              <h2 className="text-3xl font-mono font-bold text-white mb-2 uppercase">Generative_UI_Engine</h2>
              <p className="text-gray-500 font-mono text-sm">DYNAMICALLY CONSTRUCTED REACT COMPONENTS.</p>
            </div>
            <Link
              href="/interactables"
              className="mt-4 md:mt-0 text-[#00f3ff] font-mono text-sm hover:text-white transition-colors flex items-center uppercase group"
            >
              [ ACCESS_LIBRARY ]
              <ArrowRight className="size-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Velocity Chart */}
            <div className="component-card border border-[#1a1a1a] bg-[#1a1a1a]/10 p-4 relative group hover:border-[#00f3ff]/50 transition-colors">
              <div className="absolute top-0 left-0 border-t-2 border-l-2 border-[#00f3ff] w-4 h-4 group-hover:w-6 group-hover:h-6 transition-all" />
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono font-bold text-white uppercase">VELOCITY_CHART</span>
                <span className="text-[10px] font-mono text-[#0aff0a] border border-[#0aff0a] px-1 animate-pulse">+12% EFFICIENCY</span>
              </div>
              <div className="relative flex items-end justify-between h-32 gap-2 px-2 border-l border-b border-gray-800">
                {/* Grid Lines */}
                <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="h-px bg-gray-700 w-full" />
                  <div className="h-px bg-gray-700 w-full" />
                  <div className="h-px bg-gray-700 w-full" />
                  <div className="h-px bg-gray-700 w-full" />
                </div>

                {/* Target Line */}
                <div className="absolute left-0 right-0 top-[30%] border-t border-dashed border-[#00f3ff]/50 z-10">
                  <span className="absolute -top-3 right-0 text-[8px] text-[#00f3ff] bg-black px-1">TARGET: 45 pts</span>
                </div>

                {[40, 55, 45, 65, 80].map((height, i) => (
                  <div
                    key={i}
                    className={`w-full relative group/bar transition-all duration-500 hover:opacity-100 opacity-80`}
                    style={{
                      height: `${height}%`,
                      transform: hoveredModule ? 'scaleY(1.05)' : 'scaleY(1)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-t ${i === 4 ? 'from-[#00f3ff]/20 to-[#00f3ff]' : 'from-gray-800/50 to-gray-600'}`} />
                    {i === 4 && <div className="absolute inset-0 animate-pulse bg-[#00f3ff]/10" />}

                    {/* Tooltip on Hover */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover/bar:opacity-100 transition-opacity bg-black border border-gray-700 px-1 z-20 whitespace-nowrap">
                      {Math.floor(height * 0.6)} pts
                    </div>

                    {i === 4 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#00f3ff] font-mono animate-bounce group-hover/bar:opacity-0">52</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between text-[10px] font-mono text-gray-500 pt-2">
                <span>SPRINT_01</span>
                <span>SPRINT_05</span>
              </div>
            </div>

            {/* Resource Allocation */}
            <div className="lg:col-span-2 component-card border border-[#1a1a1a] bg-[#1a1a1a]/10 p-4 relative group hover:border-[#ffb800]/50 transition-colors">
              <div className="absolute top-0 right-0 border-t-2 border-r-2 border-[#ffb800] w-4 h-4 group-hover:w-6 group-hover:h-6 transition-all" />
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono font-bold text-white uppercase">RESOURCE_ALLOCATION</span>
                <Settings className="size-4 text-gray-600 group-hover:rotate-90 transition-transform duration-500" />
              </div>
              <div className="space-y-4">
                {[
                  { id: "FE", label: "FRONTEND", percent: 75, color: "#00f3ff" },
                  { id: "BE", label: "BACKEND", percent: 45, color: "#a855f7" },
                  { id: "OPS", label: "DEVOPS", percent: 90, color: "#ff5f1f" },
                ].map((item, i) => (
                  <div key={item.id} className="flex items-center gap-4 group/bar">
                    <div className="w-16 h-8 border border-gray-600 flex items-center justify-center text-[10px] text-white font-mono bg-black group-hover/bar:border-[#00f3ff] transition-colors">
                      {item.label}
                    </div>
                    <div className="flex-1 bg-gray-900 h-4 border border-gray-800 relative overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 ease-out relative"
                        style={{
                          width: `${item.percent}%`,
                          backgroundColor: `${item.color}20`,
                          borderRight: `2px solid ${item.color}`,
                        }}
                      >
                        <div className="absolute inset-0 opacity-50" style={{
                          backgroundImage: `linear-gradient(45deg, ${item.color} 25%, transparent 25%, transparent 50%, ${item.color} 50%, ${item.color} 75%, transparent 75%, transparent)`,
                          backgroundSize: '10px 10px'
                        }} />
                      </div>
                    </div>
                    <span
                      className="text-xs font-mono w-12 text-right transition-transform group-hover/bar:scale-110"
                      style={{ color: item.color }}
                    >
                      {item.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-3 component-card border border-[#1a1a1a] bg-[#1a1a1a]/10 p-4 relative overflow-hidden group hover:border-white/30 transition-colors">
              <div className="absolute bottom-0 right-0 border-b-2 border-r-2 border-white w-4 h-4 group-hover:w-6 group-hover:h-6 transition-all" />
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                  <Network className="w-3 h-3 text-[#00f3ff]" />
                  CRITICAL_PATH_ANALYSIS
                </span>
                <div className="flex gap-4 text-[10px] font-mono border border-gray-800 px-2 py-1 rounded">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-pulse" /> ON_TRACK</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#ff5f1f] rounded-full animate-pulse" /> DELAYED</span>
                </div>
              </div>
              <div className="relative h-32 w-full bg-black border border-gray-800 p-2">
                {/* Grid lines */}
                <div className="absolute inset-x-0 bottom-0 top-0 flex justify-between px-4 pointer-events-none opacity-20">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-px h-full bg-gray-500 border-r border-dashed border-gray-700" />
                  ))}
                </div>

                {/* Current Time Line */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-scan-slow left-[35%]" />
                <div className="absolute top-0 left-[35%] transform -translate-x-1/2 bg-red-500 text-black text-[8px] font-bold px-1 z-30">NOW</div>

                {/* Timeline bars */}
                {[
                  { row: 0, left: 5, width: 25, color: "#00f3ff", label: "API_SCHEMA_V2", status: "complete" },
                  { row: 1, left: 30, width: 35, color: "#a855f7", label: "DB_MIGRATION", status: "inprogress" },
                  { row: 2, left: 50, width: 40, color: "#ff5f1f", label: "CLIENT_INTEGRATION", status: "pending" },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="absolute h-6 flex items-center px-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 group/task"
                    style={{
                      top: `${16 + i * 32}px`,
                      left: `${bar.left}%`,
                      width: `${bar.width}%`,
                      backgroundColor: `${bar.color}15`,
                      border: `1px solid ${bar.color}`,
                      borderLeft: `3px solid ${bar.color}`
                    }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[9px] font-mono truncate font-bold" style={{ color: bar.color }}>
                        {bar.label}
                      </span>
                      {bar.status === 'complete' && <span className="text-[#0aff0a] text-[8px]">✓</span>}
                      {bar.status === 'inprogress' && <span className="text-white text-[8px] animate-pulse">●</span>}
                    </div>

                    {/* Progress Fill */}
                    <div
                      className="absolute bottom-0 left-0 h-0.5 bg-current opacity-50 transition-all duration-1000 group-hover/task:h-full group-hover/task:opacity-10"
                      style={{ width: bar.status === 'complete' ? '100%' : bar.status === 'inprogress' ? '45%' : '0%', color: bar.color }}
                    />
                  </div>
                ))}

                {/* Dependency Lines (Simple visual) */}
                <svg className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-50">
                  <path d="M 30% 28 L 30% 48 L 35% 48" stroke="#00f3ff" fill="none" strokeWidth="1" strokeDasharray="2,2" />
                  <path d="M 65% 60 L 65% 80 L 70% 80" stroke="#a855f7" fill="none" strokeWidth="1" strokeDasharray="2,2" />
                </svg>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="component-card border border-[#1a1a1a] bg-[#1a1a1a]/10 p-4 relative group hover:border-red-500/50 transition-colors">
              <div className="absolute top-0 right-0 border-t-2 border-r-2 border-red-500 w-4 h-4 group-hover:w-6 group-hover:h-6 transition-all" />
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono font-bold text-white uppercase">RISK_ASSESSMENT</span>
                <span className="text-[10px] font-mono text-red-400 animate-pulse">HIGH_VOLATILITY</span>
              </div>
              <div className="relative h-32 flex items-center justify-center">
                {/* Gauge Background */}
                <div className="w-32 h-16 border-t-8 border-l-8 border-r-8 border-gray-800 rounded-t-full absolute top-8" />
                {/* Gauge Fill */}
                <div className="w-32 h-16 border-t-8 border-l-8 border-r-8 border-red-500 rounded-t-full absolute top-8 rotate-45 origin-bottom transform transition-transform duration-1000 group-hover:rotate-[60deg]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
                {/* Needle */}
                <div className="w-1 h-16 bg-white absolute top-8 origin-bottom rotate-45 transform transition-transform duration-500 group-hover:rotate-[60deg]" />
                <div className="absolute bottom-6 text-2xl font-bold text-white font-mono">87%</div>
                <div className="absolute bottom-0 text-[10px] text-gray-500 font-mono">CODE_COMPLEXITY</div>
              </div>
            </div>

            {/* Kanban Snapshot */}
            <div className="component-card border border-[#1a1a1a] bg-[#1a1a1a]/10 p-4 relative group hover:border-[#ffb800]/50 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono font-bold text-white uppercase">KANBAN_SNAPSHOT</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 h-32">
                {['TODO', 'IN_PROG', 'DONE'].map((col, i) => (
                  <div key={col} className="bg-black/50 border border-gray-800 p-1 flex flex-col gap-1">
                    <div className="text-[8px] text-gray-500 font-mono text-center border-b border-gray-800 pb-1">{col}</div>
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className={`h-1.5 w-full rounded-sm ${i === 1 && j === 0 ? 'bg-[#ffb800] animate-pulse' : i === 2 ? 'bg-[#00f3ff]/30' : 'bg-gray-800'}`} />
                    ))}
                    {i === 1 && <div className="h-6 w-full border border-[#ffb800] bg-[#ffb800]/10 rounded-sm mt-auto relative group/card">
                      <div className="absolute inset-0 flex items-center justify-center text-[6px] text-[#ffb800]">WIP</div>
                    </div>}
                  </div>
                ))}
              </div>
            </div>
            {/* Team Load */}
            <div className="component-card border border-[#1a1a1a] bg-[#1a1a1a]/10 p-4 relative group hover:border-[#0aff0a]/50 transition-colors">
              <div className="absolute bottom-0 left-0 border-b-2 border-l-2 border-[#0aff0a] w-4 h-4 group-hover:w-6 group-hover:h-6 transition-all" />
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono font-bold text-white uppercase">SQUAD_LOAD</span>
                <span className="text-[10px] font-mono text-[#0aff0a] border border-[#0aff0a] px-1 animate-pulse">OPTIMAL</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: "ALEX_R", role: "TECH_LEAD", load: 85, color: "#ffb800", status: "HIGH_LOAD" },
                  { name: "SARAH_K", role: "SENIOR_DEV", load: 45, color: "#0aff0a", status: "OPTIMAL" },
                  { name: "MIKE_D", role: "DESIGNER", load: 60, color: "#00f3ff", status: "STABLE" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center gap-3 group/member">
                    <div className="w-8 h-8 bg-gray-900 border border-gray-700 flex items-center justify-center text-[10px] text-gray-400 font-mono group-hover/member:text-white group-hover/member:border-white transition-colors">
                      {member.name.substring(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-[8px] font-mono text-gray-500 mb-1">
                        <span className="group-hover/member:text-white transition-colors">{member.role}</span>
                        <span style={{ color: member.color }}>{member.status}</span>
                      </div>
                      <div className="h-1 bg-gray-800 w-full overflow-hidden relative">
                        <div className="h-full transition-all duration-1000 group-hover/member:brightness-125" style={{ width: `${member.load}%`, backgroundColor: member.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="border-t-2 border-[#1a1a1a] bg-black pt-16 pb-8 font-mono text-xs" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <Sparkles className="size-5 text-[#00f3ff] group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-white font-bold uppercase group-hover:text-[#00f3ff] transition-colors">Smart Autopilot</span>
              </div>
              <p className="text-gray-500 mb-4">
                // AUTOMATING PROJECT MANAGEMENT.<br />
                // VIA SERVER-SIDE MCP.
              </p>
              <div className="inline-block border border-gray-700 px-2 py-1 text-[10px] text-gray-400 hover:border-[#00f3ff] hover:text-[#00f3ff] transition-colors cursor-pointer">
                SYS_VERSION: 1.0.0-RC
              </div>
            </div>
            {[
              {
                title: "RESOURCES",
                links: [
                  { label: "TAMBO_DOCS", href: "https://docs.tambo.ai" },
                  { label: "MCP_SERVER_REF", href: "https://modelcontextprotocol.io/docs/concepts/architecture" }
                ]
              },
              {
                title: "HACKATHON",
                links: [
                  { label: "WEMAKEDEVS", href: "https://wemakedevs.org" },
                  { label: "TAMBO", href: "https://tambo.ai" }
                ]
              },
              {
                title: "Builder",
                links: [
                  { label: "GITHUB", href: "https://github.com/thekishandev" },
                  { label: "X", href: "https://x.com/thekishandev" },
                  { label: "LINKEDIN", href: "https://linkedin.com/in/thekishandev" }
                ]
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-white font-bold mb-4 uppercase">[ {section.title} ]</h4>
                <ul className="space-y-2 text-gray-500">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="hover:text-[#00f3ff] transition-colors inline-flex items-center group"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>
                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">© 2026 SMART_PROJECT_AUTOPILOT. POWERED BY TAMBO.</p>
            <div className="flex items-center gap-6">
              <Link href="/chat" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                <span className="group-hover:text-[#00f3ff]">&gt; ACCESS_TERMINAL</span>
              </Link>
              <div className="h-4 w-px bg-gray-800" />
              <a className="text-gray-500 hover:text-white transition-colors hover:rotate-12 inline-block" href="https://github.com/thekishandev/smart-project-autopilot">
                <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="https://github.com/tambo-ai/tambo" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#00f3ff] transition-colors cursor-pointer"> BUILT_WITH_TAMBO</a>
            </div>
          </div>
        </div>
      </footer >

      {/* Global Styles for Animations */}
      < style jsx > {`
        /* Scan Lines */
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #00f3ff;
          opacity: 0.3;
          animation: scan 3s linear infinite;
          z-index: 10;
          box-shadow: 0 0 10px #00f3ff;
        }
        
        .scan-line-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #ffb800;
          opacity: 0.2;
          animation: scan 5s linear infinite reverse;
          z-index: 10;
        }
        
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        /* Noise Overlay */
        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        /* Scanline overlay for terminal */
        .scanline-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.1;
          background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
          background-size: 100% 4px;
        }

        /* Cyber Border */
        .cyber-border {
          position: relative;
        }
        
        .cyber-border::after {
          content: "";
          position: absolute;
          bottom: -6px;
          right: -6px;
          width: 100%;
          height: 100%;
          border: 2px solid #333;
          z-index: -1;
          transition: all 0.3s ease;
        }
        
        .cyber-border:hover::after {
          border-color: #00f3ff;
          bottom: -10px;
          right: -10px;
        }

        /* Floating Particles */
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #00f3ff;
          border-radius: 50%;
          animation: float-up linear infinite;
          opacity: 0.5;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Slide Animations */
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Fade Animations */
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Expand Animation */
        .animate-expand-x {
          animation: expand-x 1s ease-out forwards;
        }

        @keyframes expand-x {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        /* Blink Animation */
        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Ping Slow */
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Pulse Glow */
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 2px currentColor);
          }
          50% {
            filter: drop-shadow(0 0 8px currentColor);
          }
        }

        /* Border Pulse */
        .animate-border-pulse {
          animation: border-pulse 2s ease-in-out infinite;
        }

        @keyframes border-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 95, 31, 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(255, 95, 31, 0);
          }
        }

        /* Flow Down */
        .animate-flow-down {
          animation: flow-down 1.5s linear infinite;
        }

        @keyframes flow-down {
          0% {
            opacity: 0;
            transform: translateY(-100%);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(100%);
          }
        }

        /* Flow Right */
        .lg\\:animate-flow-right {
          animation: flow-right 1.5s linear infinite;
        }

        @keyframes flow-right {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(100%);
          }
        }

        /* Spin Slow */
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Gradient Animation */
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 3s ease infinite;
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Typing Lines */
        .typing-line {
          opacity: 0;
          animation: typing-appear 0.5s ease-out forwards;
        }

        @keyframes typing-appear {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Glitch Text */
        .glitch-text {
          position: relative;
        }

        .glitch-text:hover {
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        /* Module Cards */
        .module-card {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Component Cards */
        .component-card {
          transition: all 0.3s ease;
        }

        .component-card:hover {
          transform: translateY(-4px);
        }

        /* CTA Button Shine */
        .cta-button {
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        /* Grid Background */
        .grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.3;
          pointer-events: none;
          background-image: linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Grid Pulse Animation */
        .animate-grid-pulse {
          animation: grid-pulse 4s ease-in-out infinite;
        }

        @keyframes grid-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }

      `}</style >
    </div >
  );
}
