import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HistoricalData, ClientMetrics } from '../data/types';
import { formatCurrency, formatDate } from '../utils/formatters';

interface MRRTrendChartProps {
  historicalData: HistoricalData[];
  clients: ClientMetrics[];
}

export const MRRTrendChart: React.FC<MRRTrendChartProps> = ({ historicalData, clients }) => {
  // Transform data for Recharts
  const chartData = historicalData.reduce((acc, entry) => {
    const dateKey = formatDate(entry.date);
    const existingEntry = acc.find((item) => item.date === dateKey);

    if (existingEntry) {
      existingEntry[entry.client_id] = entry.mrr;
    } else {
      acc.push({
        date: dateKey,
        fullDate: entry.date,
        [entry.client_id]: entry.mrr,
      });
    }

    return acc;
  }, [] as any[]);

  // Sort by date
  chartData.sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());

  // Dynamic color palette - vibrant and distinct colors
  const colorPalette = [
    '#10b981', // Emerald
    '#3b82f6', // Blue
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#f97316', // Orange
    '#84cc16', // Lime
    '#6366f1', // Indigo
    '#14b8a6', // Teal
    '#f43f5e', // Rose
    '#a855f7', // Violet
    '#eab308', // Yellow
    '#22c55e', // Green
    '#0ea5e9', // Sky
    '#d946ef', // Fuchsia
    '#fb923c', // Orange (lighter)
    '#4ade80', // Green (lighter)
    '#2dd4bf', // Teal (lighter)
  ];

  // Generate color mapping for clients dynamically
  const getClientColor = (index: number) => {
    return colorPalette[index % colorPalette.length];
  };

  // Create a color map for consistent colors per client
  const clientColorMap = clients.reduce((map, client, index) => {
    map[client.client_id] = getClientColor(index);
    return map;
  }, {} as Record<string, string>);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any) => {
            const client = clients.find((c) => c.client_id === entry.dataKey);
            return (
              <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
                {client?.client_name}: {formatCurrency(entry.value)}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">MRR Trend (12 Weeks)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-700" />
          <XAxis
            dataKey="date"
            stroke="currentColor"
            className="text-slate-600 dark:text-slate-400"
            style={{ fontSize: '12px' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="currentColor"
            className="text-slate-600 dark:text-slate-400"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => {
              const client = clients.find((c) => c.client_id === value);
              return client?.client_name || value;
            }}
          />
          {clients.map((client, index) => (
            <Line
              key={client.client_id}
              type="monotone"
              dataKey={client.client_id}
              stroke={clientColorMap[client.client_id]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
