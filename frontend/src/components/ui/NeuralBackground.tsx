import { useMemo } from "react";

interface Node {
  x: number;
  y: number;
  id: number;
}

export default function NeuralBackground() {
  const { nodes, edges } = useMemo(() => {
    const count = 28;
    const ns: Node[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));

    const es: [number, number][] = [];
    ns.forEach((a, i) => {
      ns.forEach((b, j) => {
        if (j <= i) return;
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 25) es.push([i, j]);
      });
    });

    return { nodes: ns, edges: es };
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none neural-network"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--neural-line-color)"
          strokeWidth="0.3"
        />
      ))}
      {nodes.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r="0.6"
          fill="var(--neural-node-color)"
          style={{
            animation: `flicker ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </svg>
  );
}
