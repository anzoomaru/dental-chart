export type Species = "dog" | "cat";
export type Mode = "extract" | "missing" | "none";

export type Sex =
  | "" // 未選択
  | "male"
  | "female"
  | "neutered_male"
  | "spayed_female"
  | "unknown";

export type ToothState = { extract: boolean; missing: boolean };

export type ChartForm = {
  date: string;
  chartNo: string;
  ownerName: string;
  patientName: string;
  weightKg: string;
  sex: Sex;
  memo: string;
};