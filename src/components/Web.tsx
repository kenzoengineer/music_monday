import type { GenericPaneProps, Name } from "../types";

const WIDTH = 460;
const HEIGHT = 460;

type Node = {
  id: Name;
  x: number;
  y: number;
};

type Edge = {
  source: Name;
  target: Name;
  label: string;
  color: string;
};

const nodes: Node[] = [
  { id: "Andrew", x: 230, y: 100 - 60 },
  { id: "Artom", x: 420, y: 240 - 60 },
  { id: "Ken", x: 350, y: 470 - 60 },
  { id: "Kevin", x: 110, y: 470 - 60 },
  { id: "Souren", x: 40, y: 240 - 60 },
];

let edges: Edge[] = [];

const getNodeById = (id: string) => nodes.find((n) => n.id === id)!;

const Web = ({ entries }: GenericPaneProps) => {
  // e.g. {AndrewKen: 4, ArtomKen: 2}
  // lex. order
  let counts: Record<string, number> = {};
  for (let i = 0; i < entries.length; i += 4) {
    let thisWeek = entries.slice(i, i + 4);
    let allNames = nodes.map((x) => x.id);
    // find missing person for the week
    const judge = allNames.find(
      (x) => thisWeek.map((x) => x.name).indexOf(x) === -1
    );
    const winner = thisWeek.find((x) => x.winner)?.name;
    if (!judge || !winner) continue;
    // make sure its lex. order
    if (winner < judge) {
      counts[`${winner}${judge}`] = (counts[`${winner}${judge}`] || 0) + 1;
      continue;
    }
    counts[`${judge}${winner}`] = (counts[`${judge}${winner}`] || 0) + 1;
  }

  // create all edges (nodes is already in lex. order)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i; j < nodes.length; j++) {
      if (i === j) continue;
      const c = counts[`${nodes[i].id}${nodes[j].id}`] ?? 0;
      edges.push({
        source: nodes[i].id,
        target: nodes[j].id,
        label: c.toString(),
        color: "white",
      });
    }
  }
  return (
    <svg width={WIDTH} height={HEIGHT}>
      {/* Edges */}
      {edges.map((edge, i) => {
        const src = getNodeById(edge.source);
        const tgt = getNodeById(edge.target);

        // middle of the line
        const mx = (src.x + tgt.x) / 2;
        const my = (src.y + tgt.y) / 2;

        // calculate delta from middle, normalize
        const INTENSITY = 400;
        const dx = ((mx - WIDTH / 2) / WIDTH / 2) * INTENSITY;
        const dy = ((my - HEIGHT / 2) / HEIGHT / 2) * INTENSITY;

        const path = `M${src.x},${src.y} Q${mx + dx},${my + dy} ${tgt.x},${
          tgt.y
        }`;

        return (
          <g key={i}>
            <path d={path} fill="none" stroke={edge.color} strokeWidth={2} />
            <rect
              x={mx + dx / 2 - 10}
              y={my + dy / 2 - 13}
              width={20}
              height={20}
              fill={"var(--color-zinc-900)"}
            />
            <text
              x={mx + dx / 2}
              y={my + dy / 2}
              textAnchor="middle"
              fill={edge.color}
              fontSize={12}
              fontWeight="bold"
            >
              {edge.label}
            </text>
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r={40} fill="var(--color-zinc-800)" />
          <text
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            fontWeight="bold"
            fill="white"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Web;
