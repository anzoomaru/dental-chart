import React, { useLayoutEffect, useRef, useState } from "react";
import type { Mode, ToothState } from "../types";

type Props = {
  state: Record<string, ToothState>;
  mode: Mode;
  onToothClick: (id: string) => void;
};

function fillOf(st?: ToothState) {
  if (st?.extract) return "#ffb6c1"; // 抜歯ピンク
  if (st?.missing) return "#87cefa"; // 欠歯ブルー
  return "#ffffff"; // 通常白
}

type ToothLabel = { id: string; x: number; y: number };

export default function DogChartSvg({ state, mode, onToothClick }: Props) {
  // stateから「色を塗るCSS」を生成（pathに個別onClick/ fillを書かない方式）
  const dynamicCss = Object.entries(state)
    .filter(([_, st]) => st.extract || st.missing)
    .map(([toothId, st]) => {
      const color = fillOf(st);
      return `[data-tooth="${toothId}"] { fill: ${color} !important; }`;
    })
    .join("\n");

  const handleClick: React.MouseEventHandler<SVGSVGElement> = (e) => {
    const target = e.target as Element | null;
    if (!target) return;

    // クリックされた要素 or その親に data-tooth があれば拾う
    const el = target.closest?.("[data-tooth]") as Element | null;
    if (!el) return;

    const id = el.getAttribute("data-tooth");
    if (!id) return;

    onToothClick(id);
  };

  // ====== ここから歯番号表示の追加 ======
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [labels, setLabels] = useState<ToothLabel[]>([]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const nodes = Array.from(
      svg.querySelectorAll<SVGGraphicsElement>("[data-tooth]")
    );

    const next: ToothLabel[] = [];

    for (const el of nodes) {
      const id = el.getAttribute("data-tooth");
      if (!id) continue;

      const n = Number(id);
      // 1xx/2xx = 上顎, 3xx/4xx = 下顎（Triadan想定）
      const isUpper = n >= 100 && n < 300;

      const b = el.getBBox();
      const x = b.x + b.width / 2;

      // 上顎は歯の上、下顎は歯の下
      const y = isUpper ? b.y - 4 : b.y + b.height + 12;

      next.push({ id, x, y });
    }

    setLabels(next);
  }, []);
  // ====== ここまで ======

  return (
    <svg
      ref={svgRef}
      version="1.1"
      id="svg1"
      width="528.10657"
      height="263.48297"
      viewBox="0 0 528.10657 263.48297"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* 動的CSS（選択状態の歯だけ塗る） */}
      <style>{dynamicCss}</style>

      <g
        id="layer1"
        style={{
          fill: "#ffffff",
          strokeWidth: 1,
          strokeDasharray: "none",
          stroke: "#000000",
          strokeOpacity: 1,
        }}
      >
        {/* ====== 既存の path 群（ここはあなたのコードそのまま） ====== */}
        {/* ...（省略せず、そのまま貼ってある前提）... */}

        {/* あなたが貼ってくれた大量の <path ... data-tooth="..."/> はここに全部入ったままでOK */}
        {/* ====== 既存の path 群ここまで ====== */}

        {/* ====== 歯番号ラベル（最後に重ねる） ====== */}
        <g pointerEvents="none">
          {labels.map((t) => (
            <text
              key={t.id}
              x={t.x}
              y={t.y}
              textAnchor="middle"
              fontSize={10}
              fill="#111"
              stroke="#fff"
              strokeWidth={3}
              paintOrder="stroke"
              style={{ userSelect: "none" }}
            >
              {t.id}
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
}
