import React, { useMemo, useState } from 'react';
import { PortfolioData } from '../data/types';
import { ClientCard } from './ClientCard';
import { MRRTrendChart } from './MRRTrendChart';
import { InsightsPanel } from './InsightsPanel';
import { FileUpload, UploadInstructions } from './FileUpload';
import { generateRuleBasedInsights } from '../utils/insightGenerator';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { TrendingUp, Users, DollarSign, Target, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardProps {
  portfolioData: PortfolioData;
  onFileUpload?: (file: File) => void;
  isLoadingData?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ portfolioData, onFileUpload, isLoadingData = false }) => {
  const { theme, toggleTheme } = useTheme();
  const [showInstructions, setShowInstructions] = useState(true);
  const [sortBy, setSortBy] = useState<'performance' | 'mrr' | 'growth' | 'name'>('performance');
  const insights = useMemo(() => generateRuleBasedInsights(portfolioData.clients), [portfolioData.clients]);

  // Calculate portfolio-level metrics
  const totalMRR = portfolioData.clients.reduce((sum, client) => sum + client.mrr, 0);
  const totalPipeline = portfolioData.clients.reduce((sum, client) => sum + client.pipeline_value, 0);
  const avgConversionRate = portfolioData.clients.reduce((sum, client) => sum + client.conversion_rate, 0) / portfolioData.clients.length;
  const criticalClients = portfolioData.clients.filter((c) => c.status === 'critical').length;

  // Sort clients based on selected criteria
  const sortedClients = useMemo(() => {
    const clients = [...portfolioData.clients];
    
    switch (sortBy) {
      case 'performance':
        // Sort by performance score (growth + pipeline ratio + conversion rate)
        return clients.sort((a, b) => {
          const scoreA = a.growth_rate + (a.pipeline_value / a.mrr) * 5 + a.conversion_rate;
          const scoreB = b.growth_rate + (b.pipeline_value / b.mrr) * 5 + b.conversion_rate;
          return scoreB - scoreA;
        });
      case 'mrr':
        return clients.sort((a, b) => b.mrr - a.mrr);
      case 'growth':
        return clients.sort((a, b) => b.growth_rate - a.growth_rate);
      case 'name':
        return clients.sort((a, b) => a.client_name.localeCompare(b.client_name));
      default:
        return clients;
    }
  }, [portfolioData.clients, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="p-6 mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">RevOps Dashboard</h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">Portfolio Performance & AI Insights</p>
          </div>
          
          {/* Actions Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 border border-slate-300 dark:border-slate-600"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            
            {/* Upload Section */}
            {onFileUpload && <FileUpload onFileUpload={onFileUpload} isLoading={isLoadingData} />}
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && onFileUpload && (
          <UploadInstructions onClose={() => setShowInstructions(false)} />
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-5 bg-white border shadow-sm dark:bg-slate-800 rounded-xl border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total MRR</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalMRR)}</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border shadow-sm dark:bg-slate-800 rounded-xl border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Pipeline</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalPipeline)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border shadow-sm dark:bg-slate-800 rounded-xl border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Avg Conv. Rate</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatPercentage(avgConversionRate)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg dark:bg-purple-900/30">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border shadow-sm dark:bg-slate-800 rounded-xl border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Critical Clients</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{criticalClients}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg dark:bg-red-900/30">
                <Users className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Client Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Client Portfolio</h2>
            
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="performance">Performance Score</option>
                <option value="mrr">MRR (High to Low)</option>
                <option value="growth">Growth Rate</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedClients.map((client) => (
              <ClientCard key={client.client_id} client={client} />
            ))}
          </div>
        </div>

        {/* MRR Trend Chart */}
        <MRRTrendChart historicalData={portfolioData.historicalData} clients={portfolioData.clients} />

        {/* AI Insights */}
        <InsightsPanel insights={insights} loading={isLoadingData} />
      </div>
    </div>
  );
};
