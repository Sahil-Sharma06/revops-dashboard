import * as XLSX from 'xlsx';
import { ClientMetrics, HistoricalData, Deal, PortfolioData, ClientStatus, DealStage } from '../data/types';

interface ExcelRow {
  client_id?: string;
  client_name?: string;
  industry?: string;
  mrr?: number;
  pipeline_value?: number;
  leads_count?: number;
  conversions_count?: number;
  conversion_rate?: number;
  cac?: number;
  growth_rate?: number;
  status?: string;
  [key: string]: any;
}

/**
 * Parse Excel file and convert to PortfolioData format
 * Expected Excel format:
 * - client_id, client_name, industry, mrr, pipeline_value, leads_count, conversions_count, conversion_rate, cac, growth_rate, status
 */
export async function parseExcelFile(file: File): Promise<PortfolioData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length === 0) {
          throw new Error('Excel file is empty');
        }

        // Parse and validate data
        const clients: ClientMetrics[] = [];
        const historicalData: HistoricalData[] = [];
        const deals: Deal[] = [];

        jsonData.forEach((row, index) => {
          try {
            // Validate required fields
            if (!row.client_id || !row.client_name) {
              console.warn(`Row ${index + 2} is missing required fields (client_id or client_name)`);
              return;
            }

            // Parse status with validation
            const statusValue = (row.status || 'healthy').toLowerCase();
            let status: ClientStatus = 'healthy';
            if (statusValue === 'critical' || statusValue === 'at-risk' || statusValue === 'healthy') {
              status = statusValue as ClientStatus;
            }

            // Create client metrics
            const client: ClientMetrics = {
              client_id: String(row.client_id),
              client_name: String(row.client_name),
              industry: String(row.industry || 'Unknown'),
              mrr: Number(row.mrr || 0),
              pipeline_value: Number(row.pipeline_value || 0),
              leads_count: Number(row.leads_count || 0),
              conversions_count: Number(row.conversions_count || 0),
              conversion_rate: Number(row.conversion_rate || 0),
              cac: Number(row.cac || 0),
              growth_rate: Number(row.growth_rate || 0),
              status: status,
              last_updated: new Date(),
            };

            clients.push(client);

            // Generate historical data (mock data for 12 weeks based on current metrics)
            const historicalForClient = generateHistoricalDataForClient(client);
            historicalData.push(...historicalForClient);

            // Generate sample deals (mock data)
            const dealsForClient = generateDealsForClient(client);
            deals.push(...dealsForClient);

          } catch (error) {
            console.error(`Error parsing row ${index + 2}:`, error);
          }
        });

        if (clients.length === 0) {
          throw new Error('No valid client data found in Excel file');
        }

        resolve({
          clients,
          historicalData,
          deals,
        });

      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsBinaryString(file);
  });
}

/**
 * Generate historical data for a client based on current metrics
 */
function generateHistoricalDataForClient(client: ClientMetrics): HistoricalData[] {
  const historicalData: HistoricalData[] = [];
  const now = new Date();
  const weeklyGrowthRate = client.growth_rate / 100 / 4; // Convert to decimal and approximate weekly from monthly

  for (let week = 11; week >= 0; week--) {
    const date = new Date(now);
    date.setDate(date.getDate() - week * 7);

    // Calculate historical MRR with trend
    const weeksFromNow = 11 - week;
    const trendMultiplier = client.growth_rate >= 0
      ? 1 - (weeksFromNow * weeklyGrowthRate) // Growing (reverse)
      : 1 + (weeksFromNow * Math.abs(weeklyGrowthRate)); // Declining (reverse)

    // Add noise (±3%)
    const noise = 1 + (Math.random() - 0.5) * 0.06;

    const mrr = Math.round(client.mrr * trendMultiplier * noise);
    const pipelineRatio = client.pipeline_value / client.mrr || 2;
    const pipeline = Math.round(mrr * (pipelineRatio + (Math.random() - 0.5) * 0.5));
    
    const leads = client.leads_count > 0 
      ? Math.floor(client.leads_count * (0.8 + Math.random() * 0.4))
      : Math.floor(Math.random() * 150) + 50;
    
    const conversions = client.conversions_count > 0
      ? Math.floor(client.conversions_count * (0.8 + Math.random() * 0.4))
      : Math.floor(leads * 0.05);

    const activities = Math.floor(Math.random() * 200) + 100;

    historicalData.push({
      client_id: client.client_id,
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

/**
 * Generate sample deals for a client
 */
function generateDealsForClient(client: ClientMetrics): Deal[] {
  const deals: Deal[] = [];
  const dealStages: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation'];
  const dealCount = Math.floor(Math.random() * 6) + 3; // 3-8 deals per client

  const companyNames = [
    'Enterprise Co', 'Startup Inc', 'Tech Solutions', 'Digital Ventures',
    'Innovation Labs', 'Future Systems', 'Growth Partners', 'Scale Corp',
    'Nexus Group', 'Quantum Enterprises', 'Velocity Inc', 'Apex Solutions'
  ];

  for (let i = 0; i < dealCount; i++) {
    const stage = dealStages[Math.floor(Math.random() * dealStages.length)];
    const value = Math.floor(Math.random() * 20000) + 5000; // $5k-$25k
    
    let probability = 50;
    if (stage === 'lead') probability = Math.floor(Math.random() * 20) + 20;
    else if (stage === 'qualified') probability = Math.floor(Math.random() * 20) + 40;
    else if (stage === 'proposal') probability = Math.floor(Math.random() * 20) + 60;
    else if (stage === 'negotiation') probability = Math.floor(Math.random() * 20) + 75;

    const daysInStage = Math.floor(Math.random() * 30) + 1;
    const expectedCloseDate = new Date();
    expectedCloseDate.setDate(expectedCloseDate.getDate() + Math.floor(Math.random() * 60) + 15);

    deals.push({
      deal_id: `${client.client_id}_deal_${i + 1}`,
      client_id: client.client_id,
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

/**
 * Download sample Excel template
 */
export function downloadExcelTemplate() {
  const templateData = [
    {
      client_id: 'client_001',
      client_name: 'Example Corp',
      industry: 'SaaS',
      mrr: 50000,
      pipeline_value: 150000,
      leads_count: 120,
      conversions_count: 8,
      conversion_rate: 6.67,
      cac: 800,
      growth_rate: 15.5,
      status: 'healthy'
    },
    {
      client_id: 'client_002',
      client_name: 'Tech Startup Inc',
      industry: 'AI/ML',
      mrr: 35000,
      pipeline_value: 80000,
      leads_count: 85,
      conversions_count: 4,
      conversion_rate: 4.71,
      cac: 950,
      growth_rate: -8.3,
      status: 'at-risk'
    },
    {
      client_id: 'client_003',
      client_name: 'Enterprise Solutions',
      industry: 'Enterprise Software',
      mrr: 120000,
      pipeline_value: 240000,
      leads_count: 200,
      conversions_count: 12,
      conversion_rate: 6.0,
      cac: 750,
      growth_rate: 22.1,
      status: 'healthy'
    }
  ];

  const ws = XLSX.utils.json_to_sheet(templateData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Clients');
  
  // Download the file
  XLSX.writeFile(wb, 'revops_template.xlsx');
}
