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
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-slate-900 dark:text-white">
        <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        System Architecture & Automation
      </h2>

      {/* Unified Data Sources */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold text-slate-800 dark:text-slate-200">
          <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Unified Data Sources (Q1-Q2: Single Source of Truth)
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {dataSources.map((source) => (
            <div key={source.name} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-3 h-3 rounded-full bg-${source.color}-500`}></div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white">{source.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{source.type}</p>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">Real-time sync</p>
            </div>
          ))}
        </div>
        <div className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>Integration Layer:</strong> Zapier/Make.com → Centralized PostgreSQL Database → 
            Real-time API → Dashboard UI (eliminates manual data entry and ensures consistency)
          </p>
        </div>
      </div>

      {/* Data Accuracy & Validation */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold text-slate-800 dark:text-slate-200">
          <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Data Accuracy Controls (Q3: Ensuring Consistency)
        </h3>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 border-l-4 border-emerald-500 dark:border-emerald-400 bg-slate-50 dark:bg-slate-900/50 rounded-r-lg">
            <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Schema Validation</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">All incoming data validated against predefined schemas (TypeScript interfaces)</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 border-l-4 border-emerald-500 dark:border-emerald-400 bg-slate-50 dark:bg-slate-900/50 rounded-r-lg">
            <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Automated Data Quality Checks</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Hourly validation: completeness, outlier detection, duplicate prevention</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 border-l-4 border-emerald-500 dark:border-emerald-400 bg-slate-50 dark:bg-slate-900/50 rounded-r-lg">
            <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Audit Trails & Version Control</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Every data update logged with timestamp, user, and source system</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 border-l-4 border-amber-500 dark:border-amber-400 bg-slate-50 dark:bg-slate-900/50 rounded-r-lg">
            <AlertCircle className="w-5 h-5 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Conflict Resolution Rules</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">CRM data takes precedence over spreadsheets; manual overrides flagged for review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Processes */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold text-slate-800 dark:text-slate-200">
          <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          AI-Powered Automation (Q7-Q8: Repetitive Tasks Eliminated)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-4 py-2 text-left text-slate-700 dark:text-slate-300">Automated Task</th>
                <th className="px-4 py-2 text-left text-slate-700 dark:text-slate-300">AI Method</th>
                <th className="px-4 py-2 text-right text-slate-700 dark:text-slate-300">Time Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {automations.map((auto, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{auto.task}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{auto.method}</td>
                  <td className="px-4 py-3 font-semibold text-right text-emerald-600 dark:text-emerald-400">{auto.timeSaved}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-blue-50 dark:bg-blue-900/20">
              <tr>
                <td colSpan={2} className="px-4 py-3 font-bold text-slate-900 dark:text-white">Total Time Saved Per Week</td>
                <td className="px-4 py-3 text-xl font-bold text-right text-emerald-600 dark:text-emerald-400">{totalTimeSaved} hours</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Scalability Metrics */}
      <div>
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold text-slate-800 dark:text-slate-200">
          <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          Scalability: 10-Client Capacity (Q11)
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="p-4 text-center border border-slate-200 dark:border-slate-700 rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">8</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Active Clients</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">Currently tracking</p>
          </div>
          <div className="p-4 text-center border border-slate-200 dark:border-slate-700 rounded-lg bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-800">
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">50+</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Client Capacity</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">With current architecture</p>
          </div>
          <div className="p-4 text-center border border-slate-200 dark:border-slate-700 rounded-lg bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-800">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">&lt;2s</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Dashboard Load Time</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">Even with 10+ clients</p>
          </div>
        </div>
        <div className="p-4 mt-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Scalable Architecture Design:</p>
          <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
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
