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
        return 'bg-muted border-l-4 border-l-red-500 border-r border-t border-b border-border text-foreground';
      case 'warning':
        return 'bg-muted border-l-4 border-l-amber-500 border-r border-t border-b border-border text-foreground';
      case 'success':
        return 'bg-muted border-l-4 border-l-emerald-500 border-r border-t border-b border-border text-foreground';
      default:
        return 'bg-muted border-l-4 border-l-blue-500 border-r border-t border-b border-border text-foreground';
    }
  };

  const getIconColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500';
      case 'warning':
        return 'text-amber-500';
      case 'success':
        return 'text-emerald-500';
      default:
        return 'text-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <h3 className="text-lg font-bold text-card-foreground mb-4">AI Insights & Alerts</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-full mb-1"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <h3 className="text-lg font-bold text-card-foreground mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-foreground" />
        AI Insights & Alerts
      </h3>

      {insights.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Lightbulb className="w-12 h-12 mx-auto mb-2 text-muted-foreground opacity-50" />
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
                    <span className="text-xs font-medium px-2 py-1 rounded bg-background border border-border">
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
