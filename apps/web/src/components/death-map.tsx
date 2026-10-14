import { MAP_SIZE, type Point } from "@zen/core";
import { clock } from "@/lib/format";

interface Death {
  id: string;
  at: number;
  position: Point;
  severity: 1 | 2 | 3;
}

const COLOR = { 1: "#38bdf8", 2: "#f59e0b", 3: "#f43f5e" } as const;

/** Summoner's Rift minimap with death markers. Game y grows upward; SVG y grows downward. */
export function DeathMap({ mapSrc, deaths }: { mapSrc: string; deaths: Death[] }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-ink/10">
      <img src={mapSrc} alt="Summoner's Rift" className="absolute inset-0 h-full w-full opacity-80" />
      <svg viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`} className="absolute inset-0 h-full w-full">
        {deaths.map((d) => (
          <g key={d.id}>
            <title>Died at {clock(d.at)}</title>
            <circle
              cx={d.position.x}
              cy={MAP_SIZE - d.position.y}
              r={320}
              fill={COLOR[d.severity]}
              stroke="white"
              strokeWidth={80}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
