"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  raised: number;
  goal: number;
  className?: string;
  showLabel?: boolean;
  color?: string;
}

export default function ProgressBar({
  raised,
  goal,
  className = "",
  showLabel = true,
  color = "#2563EB",
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percentage), 100);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percentage]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

  return (
    <div ref={ref} className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1.5">
          <span className="font-semibold text-[#1F2937]">{fmt(raised)} raised</span>
          <span className="text-gray-500">Goal: {fmt(goal)}</span>
        </div>
      )}
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1">{percentage}% of goal reached</p>
      )}
    </div>
  );
}
