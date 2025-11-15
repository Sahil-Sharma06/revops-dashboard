export type ClientStatus = 'healthy' | 'at-risk' | 'critical';
export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';

export interface ClientMetrics {
  client_id: string;
  client_name: string;
  industry: string;
  mrr: number;
  pipeline_value: number;
  leads_count: number;
  conversions_count: number;
  conversion_rate: number;
  cac: number;
  growth_rate: number;
  status: ClientStatus;
  last_updated: Date;
}

export interface HistoricalData {
  client_id: string;
  date: Date;
  mrr: number;
  pipeline_value: number;
  leads: number;
  conversions: number;
  activities: number;
}

export interface Deal {
  deal_id: string;
  client_id: string;
  deal_name: string;
  value: number;
  stage: DealStage;
  probability: number;
  days_in_stage: number;
  expected_close_date: Date;
}

export interface Insight {
  severity: 'critical' | 'warning' | 'success';
  client: string;
  title: string;
  message: string;
  recommendation: string;
}

export interface PortfolioData {
  clients: ClientMetrics[];
  historicalData: HistoricalData[];
  deals: Deal[];
}
