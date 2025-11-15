import React from 'react';
import { ClientMetrics } from '../data/types';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { TrendingUp, TrendingDown, Circle } from 'lucide-react';

interface ClientCardProps {
  client: ClientMetrics;
  onClick?: () => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
      case 'at-risk':
        return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800';
      case 'critical':
        return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      default:
        return 'text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'Healthy';
      case 'at-risk':
        return 'At Risk';
      case 'critical':
        return 'Critical';
      default:
        return 'Unknown';
    }
  };

  const isPositiveGrowth = client.growth_rate >= 0;

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 transition-all duration-200 hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{client.client_name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{client.industry}</p>
        </div>
        <div className={`px-2.5 py-1 rounded-full flex items-center gap-1 border ${getStatusColor(client.status)}`}>
          <Circle className="w-2 h-2 fill-current" />
          <span className="text-xs font-medium">{getStatusLabel(client.status)}</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-2.5">
        {/* MRR */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">MRR</span>
          <span className="text-base font-bold text-slate-900 dark:text-white">{formatCurrency(client.mrr)}</span>
        </div>

        {/* Growth */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">Growth</span>
          <div className="flex items-center gap-1">
            {isPositiveGrowth ? (
              <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 dark:text-red-400" />
            )}
            <span
              className={`text-sm font-semibold ${
                isPositiveGrowth ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatPercentage(client.growth_rate)}
            </span>
          </div>
        </div>

        {/* Pipeline */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">Pipeline</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{formatCurrency(client.pipeline_value)}</span>
        </div>

        {/* Conversion Rate */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">Conv. Rate</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{client.conversion_rate}%</span>
        </div>
      </div>

      {/* Pipeline Coverage Indicator */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
          <span>Pipeline Coverage</span>
          <span className="font-medium">{(client.pipeline_value / client.mrr).toFixed(1)}x</span>
        </div>
        <div className="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              client.pipeline_value / client.mrr >= 2.5
                ? 'bg-emerald-500 dark:bg-emerald-400'
                : client.pipeline_value / client.mrr >= 2
                ? 'bg-amber-500 dark:bg-amber-400'
                : 'bg-red-500 dark:bg-red-400'
            }`}
            style={{
              width: `${Math.min((client.pipeline_value / client.mrr / 3.5) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
