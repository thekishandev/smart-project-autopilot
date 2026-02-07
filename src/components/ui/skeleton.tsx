import { cn } from "@/lib/utils"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-900 border border-gray-800", className)}
            {...props}
        >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
    )
}

function CyberSkeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-sm bg-black/40 border border-[#00f3ff]/20",
                className
            )}
            {...props}
        >
            {/* Search/Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f3ff]/5 to-transparent animate-scan" style={{ backgroundSize: '100% 200%' }} />

            {/* Horizontal scan line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00f3ff]/30 shadow-[0_0_8px_#00f3ff] animate-scan-line" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f3ff]/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f3ff]/50" />
        </div>
    )
}

export { Skeleton, CyberSkeleton }
