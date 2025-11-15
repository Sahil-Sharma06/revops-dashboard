import React from 'react';
import { Insight } from '../data/types';
import { AlertCircle, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface InsightsPanelProps {
  insights: Insight[];
  loading?: boolean;
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights, loading }) => {
  const getInsightIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getInsightColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300';
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300';
    }
  };

  const getIconColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-amber-600 dark:text-amber-400';
      case 'success':
        return 'text-emerald-600 dark:text-emerald-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">AI Insights & Alerts</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-1"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
        AI Insights & Alerts
      </h3>

      {insights.length === 0 ? (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <Lightbulb className="w-12 h-12 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
          <p>No insights available at the moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getInsightColor(insight.severity)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 ${getIconColor(insight.severity)}`}>
                  {getInsightIcon(insight.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-sm font-bold">{insight.title}</h4>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-white dark:bg-slate-900 bg-opacity-60 dark:bg-opacity-60">
                      {insight.client}
                    </span>
                  </div>
                  <p className="text-sm mb-2 opacity-90">{insight.message}</p>
                  <div className="flex items-start gap-2 mt-2 pt-2 border-t border-current border-opacity-10">
                    <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="text-xs font-medium">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
