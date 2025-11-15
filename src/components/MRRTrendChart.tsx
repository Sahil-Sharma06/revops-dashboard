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

  // Define colors for each client
  const colors = {
    client_a: '#10b981', // Green
    client_b: '#f59e0b', // Orange
    client_c: '#ef4444', // Red
    client_d: '#3b82f6', // Blue
    client_e: '#8b5cf6', // Purple
  };

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
          {clients.map((client) => (
            <Line
              key={client.client_id}
              type="monotone"
              dataKey={client.client_id}
              stroke={colors[client.client_id as keyof typeof colors]}
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
