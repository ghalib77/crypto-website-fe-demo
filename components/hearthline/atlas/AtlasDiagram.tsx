import { contour, nodes, project, svgPath } from "@/lib/hearthline/atlas-model";
import s from "../site.module.css";
export default function AtlasDiagram({ stage }: { stage: number }) {
  return (
    <svg
      className={s.atlasSvg}
      viewBox="0 0 700 420"
      aria-hidden="true"
      data-testid="atlas-fallback"
    >
      <g fill="none" stroke="#637769" strokeWidth=".8">
        {[0, 1, 2].flatMap((layer) =>
          Array.from({ length: 12 }, (_, ring) => (
            <path
              key={`${layer}-${ring}`}
              d={svgPath(contour(layer, ring))}
              opacity={0.2 + layer * 0.14}
            />
          )),
        )}
      </g>
      <path
        d={svgPath(nodes)}
        fill="none"
        stroke="#d58a62"
        strokeWidth="1.5"
        strokeDasharray="3 6"
      />
      <path
        d={svgPath(nodes.slice(0, stage + 1))}
        fill="none"
        stroke="#efb48e"
        strokeWidth="2.5"
      />
      {nodes.map((node, i) => {
        const [x, y] = project(node);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 0V35" stroke="#84968a" />
            <ellipse cy="35" rx="15" ry="6" fill="#111715" stroke="#43524a" />
            <circle
              r={stage === i ? 10 : 6}
              fill={stage === i ? "#d58a62" : "#1b2622"}
              stroke="#d58a62"
              strokeWidth="2"
            />
            <circle
              r="18"
              fill="none"
              stroke="#d58a62"
              opacity={stage === i ? 0.5 : 0}
            />
            <text
              y="-28"
              textAnchor="middle"
              fill={stage === i ? "#f2efe6" : "#b9c6bd"}
              fontSize="11"
              fontFamily="monospace"
            >
              0{i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
