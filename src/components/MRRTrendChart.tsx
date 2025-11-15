import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { HistoricalData, ClientMetrics } from '../data/types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { TrendingUp } from 'lucide-react';

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

  // Dynamic color palette - muted, professional colors with subtle variety
  const colorPalette = [
    '#3b82f6', // Muted blue
    '#8b5cf6', // Muted purple
    '#ec4899', // Muted pink
    '#06b6d4', // Muted cyan
    '#10b981', // Muted emerald
    '#f59e0b', // Muted amber
    '#ef4444', // Muted red
    '#6366f1', // Muted indigo
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
        <div className="bg-card p-4 rounded-xl shadow-2xl border-2 border-foreground backdrop-blur-sm">
          <p className="font-bold text-card-foreground mb-3 text-sm uppercase tracking-wide">{label}</p>
          <div className="space-y-2">
            {payload.map((entry: any) => {
              const client = clients.find((c) => c.client_id === entry.dataKey);
              return (
                <div key={entry.dataKey} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm font-medium text-foreground">{client?.client_name}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{formatCurrency(entry.value)}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-foreground rounded-lg">
            <TrendingUp className="w-5 h-5 text-background" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-card-foreground">MRR Trend</h3>
            <p className="text-xs text-muted-foreground">12-Week Performance Overview</p>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            {clients.map((client, index) => (
              <linearGradient key={`gradient-${client.client_id}`} id={`gradient-${client.client_id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={clientColorMap[client.client_id]} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={clientColorMap[client.client_id]} stopOpacity={0.05}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="currentColor" 
            className="text-border opacity-30" 
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="currentColor"
            className="text-muted-foreground"
            style={{ fontSize: '11px', fontWeight: 500 }}
            angle={-45}
            textAnchor="end"
            height={70}
            tickLine={false}
            axisLine={{ strokeWidth: 2 }}
          />
          <YAxis
            stroke="currentColor"
            className="text-muted-foreground"
            style={{ fontSize: '11px', fontWeight: 500 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            tickLine={false}
            axisLine={{ strokeWidth: 2 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '5 5' }} />
          <Legend
            wrapperStyle={{ paddingTop: '25px', fontSize: '12px' }}
            iconType="circle"
            formatter={(value) => {
              const client = clients.find((c) => c.client_id === value);
              return client?.client_name || value;
            }}
          />
          {clients.map((client, index) => (
            <React.Fragment key={client.client_id}>
              <Line
                type="monotone"
                dataKey={client.client_id}
                stroke={clientColorMap[client.client_id]}
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 3 }}
                fill={`url(#gradient-${client.client_id})`}
              />
            </React.Fragment>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
