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
        color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500',
        icon: '⭐'
      };
    }
    if (isHighGrowth) {
      return {
        label: 'Strong Growth',
        color: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-500',
        icon: '📈'
      };
    }
    if (isCritical) {
      return {
        label: 'Needs Attention',
        color: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-500',
        icon: '⚠️'
      };
    }
    if (isAtRisk) {
      return {
        label: 'Monitor Closely',
        color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-500',
        icon: '⚡'
      };
    }
    // Standard performance
    if (client.growth_rate >= 5) {
      return {
        label: 'Healthy',
        color: 'text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-slate-500',
        icon: '✓'
      };
    }
    return {
      label: 'Stable',
      color: 'text-slate-600 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/20 border-slate-400',
      icon: '−'
    };
  };

  // Dynamic card styling based on performance
  const getCardStyle = () => {
    if (isExceptional) {
      return 'bg-card border border-emerald-500 shadow-lg shadow-emerald-500/10';
    }
    if (isHighGrowth) {
      return 'bg-card border border-blue-500 shadow-sm shadow-blue-500/10';
    }
    if (isCritical) {
      return 'bg-card border border-red-500 shadow-sm shadow-red-500/10';
    }
    if (isAtRisk) {
      return 'bg-card border border-amber-500 shadow-sm shadow-amber-500/10';
    }
    // Healthy/Stable with subtle slate color
    if (client.growth_rate >= 5) {
      return 'bg-card border border-slate-400 shadow-sm shadow-slate-400/10';
    }
    return 'bg-card border border-slate-300 shadow-sm';
  };

  const getPerformanceBadge = () => {
    if (isExceptional) {
      return (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-full animate-pulse shadow-sm border border-emerald-500">
          <Sparkles className="w-3 h-3" />
          <span>Star Performer</span>
        </div>
      );
    }
    if (isHighGrowth) {
      return (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full shadow-sm border border-blue-500">
          <Zap className="w-3 h-3" />
          <span>High Growth</span>
        </div>
      );
    }
    if (isCritical) {
      return (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 text-xs font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-full animate-pulse shadow-sm border border-red-500">
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
          <h3 className="text-lg font-bold text-card-foreground">{client.client_name}</h3>
          <p className="text-sm text-muted-foreground">{client.industry}</p>
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
          <span className="text-sm text-muted-foreground">MRR</span>
          <span className="text-base font-bold text-foreground">{formatCurrency(client.mrr)}</span>
        </div>

        {/* Growth */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Growth</span>
          <div className="flex items-center gap-1">
            {isPositiveGrowth ? (
              <TrendingUp className="w-4 h-4 text-foreground" />
            ) : (
              <TrendingDown className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm font-semibold text-foreground">
              {formatPercentage(client.growth_rate)}
            </span>
          </div>
        </div>

        {/* Pipeline */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Pipeline</span>
          <span className="text-sm font-medium text-foreground">{formatCurrency(client.pipeline_value)}</span>
        </div>

        {/* Conversion Rate */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Conv. Rate</span>
          <span className="text-sm font-medium text-foreground">{client.conversion_rate}%</span>
        </div>
      </div>

      {/* Pipeline Coverage Indicator */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
          <span>Pipeline Coverage</span>
          <span className="font-medium text-foreground">{pipelineRatio.toFixed(1)}x</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 bg-foreground"
            style={{
              width: `${Math.min((pipelineRatio / 3.5) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
