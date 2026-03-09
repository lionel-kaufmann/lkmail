"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Mail, Cloud, Music, Terminal } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import wsrvLoader from "@/lib/imageLoader";

// 1. Dependency-Free Brand Icon (Bypassing Lucide's deprecation)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

// 2. Simple reusable node component
const CircleNode = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={`z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:border-gray-800 dark:bg-black ${className}`}
      >
        {children}
      </div>
    );
  }
);
CircleNode.displayName = "CircleNode";

export default function ApiEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Center Node
  const centerRef = useRef<HTMLDivElement>(null);
  
  // Left Nodes (Inputs)
  const githubRef = useRef<HTMLDivElement>(null);
  const wakatimeRef = useRef<HTMLDivElement>(null);
  const spotifyRef = useRef<HTMLDivElement>(null);
  
  // Right Nodes (Outputs/Infra)
  const cloudflareRef = useRef<HTMLDivElement>(null);
  const resendRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex w-full max-w-4xl mx-auto items-center justify-center py-20" ref={containerRef}>
      
      <div className="flex w-full flex-row items-stretch justify-between gap-10">
        
        {/* Left Column: Data Sources */}
        <div className="flex flex-col justify-center gap-12">
          <CircleNode ref={githubRef}>
            <GithubIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          </CircleNode>
          <CircleNode ref={wakatimeRef}>
            <Terminal className="h-6 w-6 text-blue-500" />
          </CircleNode>
          <CircleNode ref={spotifyRef}>
            <Music className="h-6 w-6 text-green-500" />
          </CircleNode>
        </div>

        {/* Center Column: The lkmail Hub */}
        <div className="flex flex-col justify-center">
          <CircleNode ref={centerRef} className="h-24 w-24 border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.3)] overflow-hidden p-0">
            <Image 
              loader={wsrvLoader} 
              src="lk1.png" 
              alt="lkmail Hub" 
              width={96} 
              height={96} 
              className="object-cover w-full h-full" 
            />
          </CircleNode>
        </div>

        {/* Right Column: Infrastructure */}
        <div className="flex flex-col justify-center gap-16">
          <CircleNode ref={cloudflareRef}>
            <Cloud className="h-6 w-6 text-orange-500" />
          </CircleNode>
          <CircleNode ref={resendRef}>
            <Mail className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          </CircleNode>
        </div>

      </div>

      {/* Beams: Left to Center (Data flowing IN) */}
      <AnimatedBeam containerRef={containerRef} fromRef={githubRef} toRef={centerRef} curvature={-50} />
      <AnimatedBeam containerRef={containerRef} fromRef={wakatimeRef} toRef={centerRef} curvature={0} />
      <AnimatedBeam containerRef={containerRef} fromRef={spotifyRef} toRef={centerRef} curvature={50} />

      {/* Beams: Center to Right (Data flowing OUT / Using Infra) */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={cloudflareRef} curvature={-40} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={resendRef} curvature={40} />
      
    </div>
  );
}