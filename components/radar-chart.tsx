"use client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  PolarRadiusAxis,
} from "recharts";

export type Dimension = {
  name: string;
  normalizedValue: number;
};

export default function MyRadarChart({ data }: { data: Dimension[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" fontSize={15} className="text-text" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
        <Radar
          type="monotone"
          name="Knihovna"
          dataKey="normalizedValue"
          className="stroke-emerald-600/60 fill-emerald-200/80"
        />
        {/*           {data.map((entry, index) => (
            <Cell domain={[0, entry.fullMark]} key={`cell-${index}`} />
          ))} */}
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
