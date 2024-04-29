"use client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  PolarRadiusAxis,
  Text,
  Curve,
  Polygon,
} from "recharts";

export type Dimension = {
  name: string;
  normalizedValue: number;
  /*   warningValue: number;
  healthyValue: number;
  criticalValue: number; */
};

function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }: any) {
  return (
    <Text
      {...rest}
      verticalAnchor="middle"
      y={y + (y - cy) / 10}
      x={x + (x - cx) / 10}
    >
      {payload.value}
    </Text>
  );
}

export default function MyRadarChart({ data }: { data: Dimension[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="name"
          fontSize={15}
          className="text-text"
          tick={renderPolarAngleAxis}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
        <Radar
          name="Knihovna"
          isAnimationActive={true}
          dataKey="normalizedValue"
          className="stroke-emerald-600/60 fill-emerald-200/80"
        />
        {/*           {data.map((entry, index) => (
            <Cell domain={[0, entry.fullMark]} key={`cell-${index}`} />
          ))} */}
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const value = payload[0].value
                ? (payload[0]?.value as unknown as number)
                : undefined;
              // make value max. 2 decimal places
              return (
                <div className="bg-white p-2 rounded-md shadow-lg">
                  <h3 className="text-text text-base font-bold">{label}</h3>
                  {value && (
                    <p className="text-text text-sm">{value.toFixed(2)} %</p>
                  )}
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
