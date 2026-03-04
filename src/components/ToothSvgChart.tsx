import type { ToothState } from "../types";

type Props = {
  upper: string[];
  lower: string[];
  state: Record<string, ToothState>;
  mode: "none" | "extract" | "missing";
  onToothClick: (id: string) => void;
};

function getFill(st: ToothState) {
  if (st.extract) return "#ffb6c1";
  if (st.missing) return "#87cefa";
  return "#ffffff";
}

function ToothShape({ fill }: { fill: string }) {
  return (
    <path
      d="M12 6
         C8 6 6 9 6 12
         C6 14 7 16 8 18
         C9 20 9 26 12 26
         C14 26 14 22 16 22
         C18 22 18 26 20 26
         C23 26 23 20 24 18
         C25 16 26 14 26 12
         C26 9 24 6 20 6
         C18 6 16 7 16 8
         C16 7 14 6 12 6 Z"
      fill={fill}
      stroke="#333"
      strokeWidth={1.2}
    />
  );
}

export default function ToothSvgChart({
  upper,
  lower,
  state,
  mode,
  onToothClick,
}: Props) {
  const size = 40;
  const gap = 10;
  const pad = 18;

  const cols = Math.max(upper.length, lower.length);
  const width = pad * 2 + cols * size + (cols - 1) * gap;
  const height = 260;

  const renderRow = (ids: string[], y: number) => {
    const rowWidth = ids.length * size + (ids.length - 1) * gap;
    const startX = (width - rowWidth) / 2;

    return ids.map((id, i) => {
      const st = state[id] ?? { extract: false, missing: false };
      const fill = getFill(st);
      const x = startX + i * (size + gap);

      return (
        <g
          key={id}
          transform={`translate(${x}, ${y})`}
          style={{ cursor: "pointer" }}
          onClick={() => onToothClick(id)}
        >
          <rect x={0} y={0} width={size} height={size} fill="transparent" />
          <g transform="translate(6, 4) scale(1.1)">
            <ToothShape fill={fill} />
          </g>

          {/* 歯番号（不要なら削除OK） */}
          <text
            x={size / 2}
            y={size + 14}
            textAnchor="middle"
            fontSize={10}
            fill="#666"
          >
            {id}
          </text>

          {mode === "none" && (st.extract || st.missing) ? (
            <rect
              x={1}
              y={1}
              width={size - 2}
              height={size - 2}
              fill="none"
              stroke="#666"
            />
          ) : null}
        </g>
      );
    });
  };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      <text x={pad} y={24} fontSize={14} fontWeight={700} fill="#111">
        上顎
      </text>
      <line x1={pad} y1={32} x2={width - pad} y2={32} stroke="#ddd" />
      {renderRow(upper, 46)}

      <text x={pad} y={150} fontSize={14} fontWeight={700} fill="#111">
        下顎
      </text>
      <line x1={pad} y1={158} x2={width - pad} y2={158} stroke="#ddd" />
      {renderRow(lower, 172)}
    </svg>
  );
}