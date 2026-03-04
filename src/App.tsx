import { useMemo, useState, type ReactNode } from "react";
import DogChartSvg from "./charts/DogChartSvg";
import CatChartSvg from "./charts/CatChartSvg";
import dogImg from "./assets/dog.png";
import jawImg from "./assets/jaw.png";
import type { ChartForm, Mode, Sex, Species, ToothState } from "./types";

const emptyTooth: ToothState = { extract: false, missing: false };

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: 14,
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function Input({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 12, color: "#333", fontWeight: 700 }}>{label}</span>
      {children}
    </label>
  );
}

export default function App() {
  const [species, setSpecies] = useState<Species | null>(null);
  const [mode, setMode] = useState<Mode>("extract");
  const [teeth, setTeeth] = useState<Record<string, ToothState>>({});

  const [form, setForm] = useState<ChartForm>({
    date: "",
    chartNo: "",
    ownerName: "",
    patientName: "",
    weightKg: "",
    sex: "",
    memo: "",
  });

  const title = useMemo(() => {
    if (!species) return "動物歯科カルテ";
    return species === "dog" ? "歯科カルテ（犬）" : "歯科カルテ（猫）";
  }, [species]);

if (!species) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#efefef",
        padding: 18,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: "calc(100vh - 36px)",
          border: "1px solid #cfcfcf",
          background: "#efefef",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* タイトル */}
        <div style={{ position: "absolute", left: 40, top: 40 }}>
          <div style={{ fontSize: 34, lineHeight: 1.15 }}>
            <div>動物病院向け</div>
            <div style={{ textDecoration: "underline", textUnderlineOffset: 6 }}>
              歯科イラスト付きカルテ
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 28, fontFamily: "serif" }}>
            Ver 1.00　Developed by Tsutsui.T{" "}
            <span style={{ textDecoration: "underline", textUnderlineOffset: 6 }}>
              
            </span>
          </div>
        </div>

        {/* 犬アイコン */}
        <img
          src={dogImg}
          alt="dog"
          style={{
            position: "absolute",
            left: 500,
            top: 85,
            width: 90,
          }}
        />

        {/* ボタン */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 260,
            display: "grid",
            gap: 70,
          }}
        >
          <button
            onClick={() => setSpecies("dog")}
            style={{
              width: 220,
              height: 70,
              fontSize: 28,
              border: "1px solid #333",
              background: "#efefef",
              cursor: "pointer",
            }}
          >
            犬 -Dog-
          </button>

          <button
            onClick={() => setSpecies("cat")}
            style={{
              width: 220,
              height: 70,
              fontSize: 28,
              border: "1px solid #333",
              background: "#efefef",
              cursor: "pointer",
            }}
          >
            猫 -Cat-
          </button>
        </div>

{/* 顎イラスト */}
<img
  src={jawImg}
  alt="jaw"
  style={{
    position: "absolute",
    right: 80,
    bottom: 70,

    // ★ここが重要：固定520pxをやめる
    width: "min(520px, 60vw)",   // 画面が狭いときは60%幅まで縮む
    height: "auto",
    maxHeight: "35vh",           // iPadで縦に伸びすぎて被るのを防ぐ
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",       // 画像がボタンのクリックを邪魔しない保険
  }}
/>
      </div>
    </div>
  );
}

  const toggleTooth = (id: string) => {
    const cur = teeth[id] ?? emptyTooth;

    // 消しゴム：色付きなら白に戻す
    if (mode === "none") {
      if (!cur.extract && !cur.missing) return;
      setTeeth((prev) => ({ ...prev, [id]: { extract: false, missing: false } }));
      return;
    }


    let next: ToothState = { ...cur };

    if (mode === "extract") {
      const to = !cur.extract;
      next.extract = to;
      if (to) next.missing = false;
    } else if (mode === "missing") {
      const to = !cur.missing;
      next.missing = to;
      if (to) next.extract = false;
    }

    setTeeth((prev) => ({ ...prev, [id]: next }));
  };

 

  // ✅ トップ画面（最近作ったデザインに戻す）
  if (!species) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start", // 左上寄せ
          justifyContent: "flex-start",
          padding: 18,
          boxSizing: "border-box",
          background: "#f6f6f6",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 14,
            padding: 18,
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 18 }}>
            {/* 左：テキストとボタン */}
            <div>
              <h1 style={{ margin: 0, fontSize: 24, letterSpacing: 0.5 }}>{title}</h1>
              <p style={{ marginTop: 10, marginBottom: 18, color: "#333" }}>
                犬・猫の歯科カルテを作成します。対象の動物を選んでください。
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => setSpecies("dog")}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: "1px solid #222",
                    background: "#fff",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  犬の歯科カルテ
                </button>

                <button
                  onClick={() => setSpecies("cat")}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: "1px solid #222",
                    background: "#fff",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  猫の歯科カルテ
                </button>
              </div>

              <div style={{ marginTop: 16, color: "#666", fontSize: 12, lineHeight: 1.6 }}>
                ・歯をクリックして色付け（抜歯/欠歯）<br />
                ・カルテ情報（日付/カルテNo/飼主名/患者名/体重/性別/メモ）を入力
              </div>
            </div>

            {/* 右：顎イラスト + 犬イラスト（背景透過のまま表示） */}
            <div
              style={{
                position: "relative",
                borderRadius: 14,
                border: "1px solid #eee",
                background: "#fafafa",
                minHeight: 260,
                overflow: "hidden",
              }}
            >
              {/* 顎（背面） */}
              <img
                src={jawImg}
                alt="jaw"
                style={{
                  position: "absolute",
                  right: 10,
                  top: 18,
                  width: 360,
                  height: "auto",
                  opacity: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />

              {/* 犬（前面・背景透過前提） */}
              <img
                src={dogImg}
                alt="dog"
                style={{
                  position: "absolute",
                  right: 18,
                  bottom: 10,
                  width: 220,
                  height: "auto",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 18, maxWidth: 1100, margin: "0 auto" }}>
      {/* ヘッダー */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={() => {
            setSpecies(null);
            setMode("extract");
            setTeeth({});
            setForm({
              date: "",
              chartNo: "",
              ownerName: "",
              patientName: "",
              weightKg: "",
              sex: "",
              memo: "",
            });
          }}
          style={{ borderRadius: 10, padding: "6px 10px" }}
        >
          ← 戻る
        </button>

        <h2 style={{ margin: 0 }}>{title}</h2>
      </div>

      {/* ★カルテ入力欄（ここが今回の追加） */}
      <Card title="カルテ情報">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1.2fr 1.2fr 0.8fr",
            gap: 10,
          }}
        >
          <Input label="日付">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
            />
          </Input>

          <Input label="カルテNo.">
            <input
              value={form.chartNo}
              onChange={(e) => setForm((p) => ({ ...p, chartNo: e.target.value }))}
              placeholder="例：12345"
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
            />
          </Input>

          <Input label="飼主名">
            <input
              value={form.ownerName}
              onChange={(e) => setForm((p) => ({ ...p, ownerName: e.target.value }))}
              placeholder="例：山田 太郎"
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
            />
          </Input>

          <Input label="患者名">
            <input
              value={form.patientName}
              onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))}
              placeholder="例：ポチ"
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
            />
          </Input>

          <Input label="体重（kg）">
            <input
              inputMode="decimal"
              value={form.weightKg}
              onChange={(e) => setForm((p) => ({ ...p, weightKg: e.target.value }))}
              placeholder="例：5.2"
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
            />
          </Input>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10, marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "#333", fontWeight: 700, marginBottom: 6 }}>
              性別
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {(
                [
                  ["male", "♂ オス"],
                  ["female", "♀ メス"],
                  ["neutered_male", "♂ 去勢"],
                  ["spayed_female", "♀ 避妊"],
                  ["unknown", "不明"],
                ] as const
              ).map(([value, label]) => (
                <label key={value} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="radio"
                    checked={form.sex === value}
                    onChange={() => setForm((p) => ({ ...p, sex: value as Sex }))}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <Input label="メモ（備考）">
            <textarea
              value={form.memo}
              onChange={(e) => setForm((p) => ({ ...p, memo: e.target.value }))}
              placeholder="所見・処置内容など"
              rows={5}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />
          </Input>
        </div>
      </Card>

      {/* モード */}
      <Card title="モード">
        <label style={{ marginRight: 12 }}>
          <input type="radio" checked={mode === "extract"} onChange={() => setMode("extract")} /> 抜歯（ピンク）
        </label>

        <label style={{ marginRight: 12 }}>
          <input type="radio" checked={mode === "missing"} onChange={() => setMode("missing")} /> 欠歯（青）
        </label>

        <label style={{ marginRight: 12 }}>
          <input type="radio" checked={mode === "none"} onChange={() => setMode("none")} /> 消しゴム
        </label>

        <button
          onClick={() => {
            setTeeth({});
            setMode("extract");
          }}
          style={{ marginLeft: 12, borderRadius: 10, padding: "6px 10px" }}
        >
          リセット
        </button>
      </Card>

      {/* 歯のSVG */}
      <div style={{ marginTop: 18 }}>
        {species === "dog" ? (
          <DogChartSvg state={teeth} mode={mode} onToothClick={toggleTooth} />
        ) : (
          <CatChartSvg state={teeth} mode={mode} onToothClick={toggleTooth} />
        )}
      </div>
    </div>
  );
}
