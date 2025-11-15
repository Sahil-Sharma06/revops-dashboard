import React from 'react';
import { Database, Zap, BarChart3, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const dataSources = [
    { name: 'HubSpot CRM', type: 'Sales Data', color: 'orange', status: 'connected' },
    { name: 'Notion', type: 'Project Data', color: 'gray', status: 'connected' },
    { name: 'Google Sheets', type: 'Financial Data', color: 'green', status: 'connected' },
    { name: 'Slack/WhatsApp', type: 'Communication', color: 'purple', status: 'connected' },
  ];

  const automations = [
    { task: 'Weekly Pipeline Reports', timeSaved: '8 hrs/week', method: 'API Integration + Scheduled Jobs' },
    { task: 'Client Health Scoring', timeSaved: '5 hrs/week', method: 'AI-Powered Analytics' },
    { task: 'Anomaly Detection', timeSaved: '10 hrs/week', method: 'Machine Learning Algorithms' },
    { task: 'Executive Summaries', timeSaved: '4 hrs/week', method: 'AI Content Generation (Gemini)' },
    { task: 'Data Consolidation', timeSaved: '12 hrs/week', method: 'ETL Pipeline + Data Warehouse' },
  ];

  const totalTimeSaved = automations.reduce((sum, auto) => sum + parseInt(auto.timeSaved), 0);

  return (
    <div className="p-6 bg-card rounded-xl shadow-sm border border-border">
      <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-card-foreground">
        <Database className="w-6 h-6 text-foreground" />
        System Architecture & Automation
      </h2>

      {/* Unified Data Sources */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold text-foreground">
          <BarChart3 className="w-5 h-5 text-foreground" />
          Unified Data Sources (Q1-Q2: Single Source of Truth)
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {dataSources.map((source) => (
            <div key={source.name} className="p-4 border border-border rounded-lg bg-muted">
              <div className="flex items-center justify-between mb-2">
                <div className="w-3 h-3 rounded-full bg-foreground"></div>
                <CheckCircle2 className="w-4 h-4 text-foreground" />
              </div>
              <h4 className="font-semibold text-card-foreground">{source.name}</h4>
              <p className="text-sm text-muted-foreground">{source.type}</p>
              <p className="mt-1 text-xs text-foreground">Real-time sync</p>
            </div>
          ))}
        </div>
        <div className="p-4 mt-4 bg-muted rounded-lg border border-border">
          <p className="text-sm text-foreground">
            <strong>Integration Layer:</strong> Zapier/Make.com → Centralized PostgreSQL Database → 
            Real-time API → Dashboard UI (eliminates manual data entry and ensures consistency)
          </p>
        </div>
      </div>

      {/* Data Accuracy & Validation */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold text-foreground">
          <CheckCircle2 className="w-5 h-5 text-foreground" />
          Data Accuracy Controls (Q3: Ensuring Consistency)
        </h3>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 border-l-4 border-foreground bg-muted rounded-r-lg">
            <CheckCircle2 className="w-5 h-5 mt-0.5 text-foreground" />
            <div>
              <p className="font-semibold text-card-foreground">Schema Validation</p>
              <p className="text-sm text-muted-foreground">All incoming data validated against predefined schemas (TypeScript interfaces)</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 border-l-4 border-foreground bg-muted rounded-r-lg">
            <CheckCircle2 className="w-5 h-5 mt-0.5 text-foreground" />
            <div>
              <p className="font-semibold text-card-foreground">Automated Data Quality Checks</p>
              <p className="text-sm text-muted-foreground">Hourly validation: completeness, outlier detection, duplicate prevention</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 border-l-4 border-foreground bg-muted rounded-r-lg">
            <CheckCircle2 className="w-5 h-5 mt-0.5 text-foreground" />
            <div>
              <p className="font-semibold text-card-foreground">Audit Trails & Version Control</p>
              <p className="text-sm text-muted-foreground">Every data update logged with timestamp, user, and source system</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 border-l-4 border-muted-foreground bg-muted rounded-r-lg">
            <AlertCircle className="w-5 h-5 mt-0.5 text-muted-foreground" />
            <div>
              <p className="font-semibold text-card-foreground">Conflict Resolution Rules</p>
              <p className="text-sm text-muted-foreground">CRM data takes precedence over spreadsheets; manual overrides flagged for review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Processes */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold text-foreground">
          <Zap className="w-5 h-5 text-foreground" />
          AI-Powered Automation (Q7-Q8: Repetitive Tasks Eliminated)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left text-foreground">Automated Task</th>
                <th className="px-4 py-2 text-left text-foreground">AI Method</th>
                <th className="px-4 py-2 text-right text-foreground">Time Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {automations.map((auto, idx) => (
                <tr key={idx} className="hover:bg-muted">
                  <td className="px-4 py-3 font-medium text-card-foreground">{auto.task}</td>
                  <td className="px-4 py-3 text-muted-foreground">{auto.method}</td>
                  <td className="px-4 py-3 font-semibold text-right text-foreground">{auto.timeSaved}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-muted">
              <tr>
                <td colSpan={2} className="px-4 py-3 font-bold text-card-foreground">Total Time Saved Per Week</td>
                <td className="px-4 py-3 text-xl font-bold text-right text-foreground">{totalTimeSaved} hours</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Scalability Metrics */}
      <div>
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold text-foreground">
          <Clock className="w-5 h-5 text-foreground" />
          Scalability: 10-Client Capacity (Q11)
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="p-4 text-center border border-border rounded-lg bg-muted">
            <p className="text-3xl font-bold text-foreground">8</p>
            <p className="text-sm text-muted-foreground">Active Clients</p>
            <p className="mt-1 text-xs text-muted-foreground">Currently tracking</p>
          </div>
          <div className="p-4 text-center border border-border rounded-lg bg-muted">
            <p className="text-3xl font-bold text-foreground">50+</p>
            <p className="text-sm text-muted-foreground">Client Capacity</p>
            <p className="mt-1 text-xs text-muted-foreground">With current architecture</p>
          </div>
          <div className="p-4 text-center border border-border rounded-lg bg-muted">
            <p className="text-3xl font-bold text-foreground">&lt;2s</p>
            <p className="text-sm text-muted-foreground">Dashboard Load Time</p>
            <p className="mt-1 text-xs text-muted-foreground">Even with 10+ clients</p>
          </div>
        </div>
        <div className="p-4 mt-4 bg-muted rounded-lg border border-border">
          <p className="text-sm font-semibold text-card-foreground mb-2">Scalable Architecture Design:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• <strong>Database:</strong> PostgreSQL with indexed queries + Redis caching layer</li>
            <li>• <strong>API:</strong> Node.js/Express with rate limiting and connection pooling</li>
            <li>• <strong>AI Processing:</strong> Async job queues (Bull/RabbitMQ) for batch processing</li>
            <li>• <strong>Frontend:</strong> React with virtualized lists for large datasets</li>
            <li>• <strong>Monitoring:</strong> Real-time health checks + automated alerting (Datadog/New Relic)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
