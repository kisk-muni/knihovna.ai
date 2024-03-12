"use client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export type Dimension = {
  name: string;
  value: number;
  fullMark: number;
  normalizedValue: number;
  normalizedFullMark: number;
};

export default function MyRadarChart({ data }: { data: Dimension[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" fontSize={15} className="text-text" />
        <Radar
          type="monotone"
          name="Knihovna"
          dataKey="normalizedValue"
          className="stroke-emerald-600/60 fill-emerald-200/80"
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-2 rounded-md shadow-lg">
                  <h3 className="text-text text-base font-bold">{label}</h3>
                  <p className="text-text text-sm">{payload[0].value} %</p>
                </div>
              );
            }
            return null;
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
