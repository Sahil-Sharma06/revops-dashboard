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
    <div className="min-h-screen bg-background">
      <div className="p-6 mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">RevOps Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Portfolio Performance & AI Insights</p>
          </div>
          
          {/* Actions Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200 border border-border"
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
          <div className="p-5 bg-card border shadow-sm rounded-xl border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total MRR</p>
                <p className="mt-1 text-2xl font-bold text-card-foreground">{formatCurrency(totalMRR)}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <DollarSign className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </div>

          <div className="p-5 bg-card border shadow-sm rounded-xl border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pipeline</p>
                <p className="mt-1 text-2xl font-bold text-card-foreground">{formatCurrency(totalPipeline)}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <Target className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </div>

          <div className="p-5 bg-card border shadow-sm rounded-xl border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Conv. Rate</p>
                <p className="mt-1 text-2xl font-bold text-card-foreground">{formatPercentage(avgConversionRate)}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <TrendingUp className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </div>

          <div className="p-5 bg-card border shadow-sm rounded-xl border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Clients</p>
                <p className="mt-1 text-2xl font-bold text-card-foreground">{criticalClients}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <Users className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Client Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Client Portfolio</h2>
            
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-sm bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
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
