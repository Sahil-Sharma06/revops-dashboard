import React from 'react';
import { ClientMetrics } from '../data/types';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { TrendingUp, TrendingDown, AlertTriangle, Sparkles, Zap } from 'lucide-react';

interface ClientCardProps {
  client: ClientMetrics;
  onClick?: () => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onClick }) => {
  const isPositiveGrowth = client.growth_rate >= 0;
  const pipelineRatio = client.pipeline_value / client.mrr;
  
  // Determine card performance tier
  const isExceptional = client.growth_rate > 20 && client.status === 'healthy' && pipelineRatio >= 3;
  const isHighGrowth = client.growth_rate > 10 && client.status === 'healthy';
  const isCritical = client.status === 'critical' || client.growth_rate < -10;
  const isAtRisk = client.status === 'at-risk' || (client.growth_rate < 0 && client.growth_rate >= -10);

  // Get dynamic performance status
  const getPerformanceStatus = () => {
    if (isExceptional) {
      return {
        label: 'Excellent',
        color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700',
        icon: '⭐'
      };
    }
    if (isHighGrowth) {
      return {
        label: 'Strong Growth',
        color: 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700',
        icon: '📈'
      };
    }
    if (isCritical) {
      return {
        label: 'Needs Attention',
        color: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700',
        icon: '⚠️'
      };
    }
    if (isAtRisk) {
      return {
        label: 'Monitor Closely',
        color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700',
        icon: '⚡'
      };
    }
    // Standard performance
    if (client.growth_rate >= 5) {
      return {
        label: 'Healthy',
        color: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700',
        icon: '✓'
      };
    }
    return {
      label: 'Stable',
      color: 'text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 border-slate-300 dark:border-slate-700',
      icon: '−'
    };
  };

  // Dynamic card styling based on performance
  const getCardStyle = () => {
    if (isExceptional) {
      return 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-2 border-emerald-300 dark:border-emerald-700 shadow-emerald-100 dark:shadow-emerald-900/50';
    }
    if (isHighGrowth) {
      return 'bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-800 shadow-sm';
    }
    if (isCritical) {
      return 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-300 dark:border-red-700 shadow-red-100 dark:shadow-red-900/50';
    }
    if (isAtRisk) {
      return 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-300 dark:border-amber-700 shadow-amber-100 dark:shadow-amber-900/50';
    }
    return 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm';
  };

  const getPerformanceBadge = () => {
    if (isExceptional) {
      return (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40 rounded-full animate-pulse shadow-sm">
          <Sparkles className="w-3 h-3" />
          <span>Star Performer</span>
        </div>
      );
    }
    if (isHighGrowth) {
      return (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 text-xs font-bold text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40 rounded-full shadow-sm">
          <Zap className="w-3 h-3" />
          <span>High Growth</span>
        </div>
      );
    }
    if (isCritical) {
      return (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 text-xs font-bold text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40 rounded-full animate-pulse shadow-sm">
          <AlertTriangle className="w-3 h-3" />
          <span>Urgent</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`relative rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${getCardStyle()} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {/* Performance Badge */}
      {getPerformanceBadge()}

      {/* Header */}
      <div className={`flex justify-between items-start mb-4 ${getPerformanceBadge() ? 'mt-8' : ''}`}>
        <div className="flex-1 pr-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{client.client_name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{client.industry}</p>
        </div>
        {/* Dynamic Performance Badge */}
        <div className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 border-2 flex-shrink-0 ${getPerformanceStatus().color}`}>
          <span className="text-xs">{getPerformanceStatus().icon}</span>
          <span className="text-xs font-semibold whitespace-nowrap">{getPerformanceStatus().label}</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-2.5">
        {/* MRR */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">MRR</span>
          <span className={`text-base font-bold ${
            isExceptional ? 'text-emerald-700 dark:text-emerald-400' : 
            isCritical ? 'text-red-700 dark:text-red-400' : 
            'text-slate-900 dark:text-white'
          }`}>{formatCurrency(client.mrr)}</span>
        </div>

        {/* Growth */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">Growth</span>
          <div className="flex items-center gap-1">
            {isPositiveGrowth ? (
              <TrendingUp className={`w-4 h-4 ${
                client.growth_rate > 20 ? 'text-emerald-600 dark:text-emerald-400' :
                client.growth_rate > 10 ? 'text-green-500 dark:text-green-400' :
                'text-emerald-500 dark:text-emerald-400'
              }`} />
            ) : (
              <TrendingDown className={`w-4 h-4 ${
                client.growth_rate < -10 ? 'text-red-600 dark:text-red-400 animate-pulse' :
                'text-red-500 dark:text-red-400'
              }`} />
            )}
            <span
              className={`text-sm font-semibold ${
                client.growth_rate > 20 ? 'text-emerald-700 dark:text-emerald-400' :
                client.growth_rate > 10 ? 'text-green-600 dark:text-green-400' :
                isPositiveGrowth ? 'text-emerald-600 dark:text-emerald-400' : 
                client.growth_rate < -10 ? 'text-red-700 dark:text-red-400' :
                'text-red-600 dark:text-red-400'
              }`}
            >
              {formatPercentage(client.growth_rate)}
            </span>
          </div>
        </div>

        {/* Pipeline */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">Pipeline</span>
          <span className={`text-sm font-medium ${
            pipelineRatio >= 3 ? 'text-emerald-700 dark:text-emerald-400' :
            pipelineRatio < 2 ? 'text-red-600 dark:text-red-400' :
            'text-slate-700 dark:text-slate-300'
          }`}>{formatCurrency(client.pipeline_value)}</span>
        </div>

        {/* Conversion Rate */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">Conv. Rate</span>
          <span className={`text-sm font-medium ${
            client.conversion_rate >= 7 ? 'text-emerald-700 dark:text-emerald-400' :
            client.conversion_rate < 3 ? 'text-red-600 dark:text-red-400' :
            'text-slate-700 dark:text-slate-300'
          }`}>{client.conversion_rate}%</span>
        </div>
      </div>

      {/* Pipeline Coverage Indicator */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 mb-2">
          <span>Pipeline Coverage</span>
          <span className={`font-medium ${
            pipelineRatio >= 3 ? 'text-emerald-600 dark:text-emerald-400' :
            pipelineRatio >= 2.5 ? 'text-green-600 dark:text-green-400' :
            pipelineRatio >= 2 ? 'text-amber-600 dark:text-amber-400' :
            'text-red-600 dark:text-red-400'
          }`}>{pipelineRatio.toFixed(1)}x</span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              pipelineRatio >= 3
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400'
                : pipelineRatio >= 2.5
                ? 'bg-emerald-500 dark:bg-emerald-400'
                : pipelineRatio >= 2
                ? 'bg-amber-500 dark:bg-amber-400'
                : 'bg-red-500 dark:bg-red-400 animate-pulse'
            }`}
            style={{
              width: `${Math.min((pipelineRatio / 3.5) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
