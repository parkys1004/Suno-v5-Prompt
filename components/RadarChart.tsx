
import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

interface RadarChartProps {
  data: number[];
  color: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, color }) => {
  const chartData = [
    { subject: '에너지', A: data[0] || 0, fullMark: 10 },
    { subject: '전자음', A: data[1] || 0, fullMark: 10 },
    { subject: '어쿠스틱', A: data[2] || 0, fullMark: 10 },
    { subject: '분위기', A: data[3] || 0, fullMark: 10 },
    { subject: '복잡성', A: data[4] || 0, fullMark: 10 },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 700 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Genre Stats"
            dataKey="A"
            stroke={color}
            fill={color}
            fillOpacity={0.15}
            strokeWidth={3}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
