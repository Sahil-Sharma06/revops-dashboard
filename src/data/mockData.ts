import { ClientMetrics, HistoricalData, Deal, PortfolioData, DealStage } from './types';

// Base client configurations - DIVERSE SCENARIOS FOR TESTING AI INSIGHTS
const clientConfigs = [
  // 1. HYPER-GROWTH STARTUP - Excellent metrics across the board
  {
    client_id: 'client_a',
    client_name: 'RocketGrowth AI',
    industry: 'AI/ML SaaS',
    baseMRR: 85000,
    isGrowing: true,
    growthRate: 0.247, // 24.7% monthly growth - exceptional
    status: 'healthy' as const,
    pipelineMultiplier: 4.5, // Very healthy pipeline
  },
  // 2. DECLINING ENTERPRISE - Critical situation
  {
    client_id: 'client_b',
    client_name: 'LegacyTech Corp',
    industry: 'Legacy CRM',
    baseMRR: 125000,
    isGrowing: false,
    growthRate: -0.189, // -18.9% decline - critical
    status: 'critical' as const,
    pipelineMultiplier: 1.2, // Weak pipeline
  },
  // 3. MODERATE DECLINE - At risk but recoverable
  {
    client_id: 'client_c',
    client_name: 'SlowBurn Analytics',
    industry: 'Data Analytics',
    baseMRR: 42000,
    isGrowing: false,
    growthRate: -0.067, // -6.7% decline
    status: 'at-risk' as const,
    pipelineMultiplier: 1.8, // Below healthy threshold
  },
  // 4. STABLE PERFORMER - Slow but steady growth
  {
    client_id: 'client_d',
    client_name: 'SteadyScale SaaS',
    industry: 'Project Management',
    baseMRR: 68000,
    isGrowing: true,
    growthRate: 0.034, // 3.4% growth - stable
    status: 'healthy' as const,
    pipelineMultiplier: 2.6,
  },
  // 5. HIGH GROWTH BUT CONVERSION ISSUES
  {
    client_id: 'client_e',
    client_name: 'LeadFlood Pro',
    industry: 'Marketing Automation',
    baseMRR: 55000,
    isGrowing: true,
    growthRate: 0.156, // 15.6% growth
    status: 'healthy' as const,
    pipelineMultiplier: 5.2, // Very high pipeline but conversion will be low
  },
  // 6. ENTERPRISE STABLE - Large but stagnant
  {
    client_id: 'client_f',
    client_name: 'MegaCorp Solutions',
    industry: 'Enterprise ERP',
    baseMRR: 210000,
    isGrowing: true,
    growthRate: 0.008, // 0.8% growth - barely growing
    status: 'healthy' as const,
    pipelineMultiplier: 1.9, // Low pipeline for size
  },
  // 7. TURNAROUND STORY - Was bad, now improving
  {
    client_id: 'client_g',
    client_name: 'PhoenixRising Tech',
    industry: 'Cybersecurity',
    baseMRR: 38000,
    isGrowing: true,
    growthRate: 0.092, // 9.2% growth - recovering
    status: 'healthy' as const,
    pipelineMultiplier: 3.1,
  },
  // 8. EARLY STAGE STRUGGLING
  {
    client_id: 'client_h',
    client_name: 'StartupStruggle Inc',
    industry: 'Fintech',
    baseMRR: 18000,
    isGrowing: false,
    growthRate: -0.134, // -13.4% decline
    status: 'critical' as const,
    pipelineMultiplier: 2.2, // Decent pipeline but not converting
  },
];

// Generate historical data for a client
function generateHistoricalData(clientConfig: typeof clientConfigs[0]): HistoricalData[] {
  const historicalData: HistoricalData[] = [];
  const now = new Date();
  const weeklyGrowthRate = clientConfig.growthRate / 4; // Approximate weekly from monthly

  for (let week = 11; week >= 0; week--) {
    const date = new Date(now);
    date.setDate(date.getDate() - week * 7);

    // Calculate trend multiplier
    const trendMultiplier = clientConfig.isGrowing
      ? 1 - ((11 - week) * weeklyGrowthRate) // Growing trend (reverse calculation)
      : 1 + ((11 - week) * Math.abs(weeklyGrowthRate)); // Declining trend (reverse calculation)

    // Add some random noise (±3%)
    const noise = 1 + (Math.random() - 0.5) * 0.06;

    const mrr = Math.round(clientConfig.baseMRR * trendMultiplier * noise);
    const pipeline = Math.round(mrr * (clientConfig.pipelineMultiplier + (Math.random() - 0.5) * 0.5));
    const leads = Math.floor(Math.random() * 150) + 50;
    const conversions = Math.floor(leads * (0.03 + Math.random() * 0.07));
    const activities = Math.floor(Math.random() * 200) + 100;

    historicalData.push({
      client_id: clientConfig.client_id,
      date,
      mrr,
      pipeline_value: pipeline,
      leads,
      conversions,
      activities,
    });
  }

  return historicalData;
}

// Generate deals for a client
function generateDeals(clientConfig: typeof clientConfigs[0]): Deal[] {
  const deals: Deal[] = [];
  const dealStages: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation'];
  const dealCount = Math.floor(Math.random() * 8) + 5; // 5-12 deals per client

  const companyNames = [
    'Enterprise Co', 'Startup Inc', 'Tech Solutions', 'Digital Ventures',
    'Innovation Labs', 'Future Systems', 'Growth Partners', 'Scale Corp',
    'Nexus Group', 'Quantum Enterprises', 'Velocity Inc', 'Apex Solutions'
  ];

  for (let i = 0; i < dealCount; i++) {
    const stage = dealStages[Math.floor(Math.random() * dealStages.length)];
    const value = Math.floor(Math.random() * 20000) + 5000; // $5k-$25k
    
    let probability = 50;
    if (stage === 'lead') probability = Math.floor(Math.random() * 20) + 20; // 20-40%
    else if (stage === 'qualified') probability = Math.floor(Math.random() * 20) + 40; // 40-60%
    else if (stage === 'proposal') probability = Math.floor(Math.random() * 20) + 60; // 60-80%
    else if (stage === 'negotiation') probability = Math.floor(Math.random() * 20) + 75; // 75-95%

    const daysInStage = Math.floor(Math.random() * 30) + 1;
    const expectedCloseDate = new Date();
    expectedCloseDate.setDate(expectedCloseDate.getDate() + Math.floor(Math.random() * 60) + 15);

    deals.push({
      deal_id: `${clientConfig.client_id}_deal_${i + 1}`,
      client_id: clientConfig.client_id,
      deal_name: companyNames[i % companyNames.length],
      value,
      stage,
      probability,
      days_in_stage: daysInStage,
      expected_close_date: expectedCloseDate,
    });
  }

  return deals;
}

// Generate current metrics for a client
function generateClientMetrics(clientConfig: typeof clientConfigs[0]): ClientMetrics {
  const leads = Math.floor(Math.random() * 150) + 80;
  const conversions = Math.floor(leads * (0.03 + Math.random() * 0.07));
  const conversionRate = Number(((conversions / leads) * 100).toFixed(1));
  
  return {
    client_id: clientConfig.client_id,
    client_name: clientConfig.client_name,
    industry: clientConfig.industry,
    mrr: clientConfig.baseMRR,
    pipeline_value: Math.round(clientConfig.baseMRR * clientConfig.pipelineMultiplier),
    leads_count: leads,
    conversions_count: conversions,
    conversion_rate: conversionRate,
    cac: Math.floor(Math.random() * 500) + 600, // $600-$1100
    growth_rate: Number((clientConfig.growthRate * 100).toFixed(1)),
    status: clientConfig.status,
    last_updated: new Date(),
  };
}

// Generate complete portfolio data
export function generateMockData(): PortfolioData {
  const clients: ClientMetrics[] = [];
  const historicalData: HistoricalData[] = [];
  const deals: Deal[] = [];

  clientConfigs.forEach((config) => {
    clients.push(generateClientMetrics(config));
    historicalData.push(...generateHistoricalData(config));
    deals.push(...generateDeals(config));
  });

  return {
    clients,
    historicalData,
    deals,
  };
}

// Export initial data
export const mockPortfolioData = generateMockData();
