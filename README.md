# RevOps Command Center

A unified dashboard system for Perfect Ventures to manage and monitor their SaaS portfolio companies. This application aggregates data from multiple clients, provides real-time performance visibility, generates AI-powered insights, and automates executive reporting.

![RevOps Dashboard](https://img.shields.io/badge/status-active-success.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

> **📋 Assignment Solution:** See [ASSIGNMENT_SOLUTION.md](./ASSIGNMENT_SOLUTION.md) for detailed mapping of how this prototype addresses all 11 assignment questions.

## 🎯 Problem Statement

Perfect Ventures faces critical operational inefficiencies:
- **Fragmented Data**: Each portfolio company uses different tools
- **Manual Reporting**: 10+ hours/week spent collecting metrics manually
- **No Unified View**: Leadership cannot quickly assess portfolio health
- **Poor Scalability**: Manual processes cannot handle 10+ simultaneous clients

## ✨ Solution

This RevOps Command Center provides:
- **Unified Dashboard**: Single pane of glass for 5 portfolio companies
- **Real-time Metrics**: MRR, Pipeline, Growth, Conversion Rates
- **AI Insights**: Automated anomaly detection and recommendations
- **Automated Reporting**: One-click executive report generation
- **Visual Analytics**: Interactive charts and trend analysis

## 🏢 Portfolio Companies

The dashboard tracks 8 diverse mock SaaS companies across different scenarios:

1. **RocketGrowth AI** (AI/ML SaaS) - $85K MRR, +24.7% growth ✅ Hyper-Growth
2. **LegacyTech Corp** (Legacy CRM) - $125K MRR, -18.9% growth 🔴 Critical Decline
3. **SlowBurn Analytics** (Data Analytics) - $42K MRR, -6.7% growth ⚠️ At Risk
4. **SteadyScale SaaS** (Project Mgmt) - $68K MRR, +3.4% growth ✅ Stable
5. **LeadFlood Pro** (Marketing Auto) - $55K MRR, +15.6% growth ✅ High Growth
6. **MegaCorp Solutions** (Enterprise ERP) - $210K MRR, +0.8% growth ⚠️ Stagnant
7. **PhoenixRising Tech** (Cybersecurity) - $38K MRR, +9.2% growth ✅ Turnaround
8. **StartupStruggle Inc** (Fintech) - $18K MRR, -13.4% growth 🔴 Early Stage Crisis

## 🚀 Features

### Core Features
- ✅ Multi-client dashboard with health status indicators (8 clients)
- ✅ Portfolio-level metrics (Total MRR, Pipeline, Average Growth)
- ✅ Interactive MRR trend charts (12-week historical data)
- ✅ Client cards with key performance indicators
- ✅ AI-powered insights using Gemini API
- ✅ Rule-based anomaly detection
- ✅ **Excel Upload Feature** - Upload your own client data from Excel files
- ✅ **Dynamic Data Updates** - Dashboard and AI insights update automatically
- ✅ **Template Download** - Get pre-formatted Excel template
- ✅ One-click executive report generation
- ✅ System architecture & automation metrics (39 hrs/week saved)
- ✅ Scalability indicators (50+ client capacity)
- ✅ Responsive design (mobile + desktop)

### AI Insights Engine
- Automatic anomaly detection (>10% negative growth = critical alert)
- Portfolio-level pattern analysis using Gemini AI
- Predictive alerts (low pipeline coverage, poor conversion rates)
- Actionable recommendations for each insight

### System Architecture Display (NEW)
- **Unified Data Sources**: Shows 4 integrated platforms (HubSpot, Notion, Sheets, Slack)
- **Data Accuracy Controls**: 4 validation mechanisms displayed
- **Automation Metrics**: 5 automated processes with time savings (39 hrs/week total)
- **Scalability Indicators**: Current capacity (8 clients) vs. max capacity (50+ clients)
- Predictive alerts (low pipeline coverage, poor conversion rates)
- Actionable recommendations for each insight
- Portfolio-level health assessment

### Automated Reporting
- Portfolio summary with key metrics
- Client performance rankings
- Critical insights and alerts
- Specific action items
- Downloadable as text file

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **Build Tool**: Create React App
- **Hosting**: Vercel (recommended)

## 📦 Installation

### Prerequisites
- Node.js 14+ and npm
- OpenAI API key (optional, for AI insights)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/revops-dashboard.git
   cd revops-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   
   # Edit .env.local and add your OpenAI API key
   REACT_APP_OPENAI_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## 🎨 Project Structure

```
revops-dashboard/
├── src/
│   ├── components/
│   │   ├── ClientCard.tsx          # Individual client metric card
│   │   ├── Dashboard.tsx           # Main dashboard layout
│   │   ├── FileUpload.tsx          # Excel upload component (NEW)
│   │   ├── InsightsPanel.tsx       # AI insights display
│   │   └── MRRTrendChart.tsx       # Revenue trend visualization
│   ├── data/
│   │   ├── types.ts                # TypeScript interfaces
│   │   └── mockData.ts             # Mock data generator
│   ├── utils/
│   │   ├── excelParser.ts          # Excel file parser (NEW)
│   │   ├── formatters.ts           # Currency/date formatting
│   │   └── insightGenerator.ts    # AI & rule-based insights
│   ├── App.tsx                     # Root component
│   └── index.css                   # Global styles
├── public/
├── EXCEL_UPLOAD_GUIDE.md          # Detailed upload documentation (NEW)
├── package.json
├── tailwind.config.js
└── README.md
```

## 📊 Excel Upload Feature

Upload your own client data to replace mock data and get personalized insights!

### Quick Start
1. Click **"Template"** button to download the Excel template
2. Fill in your client data (required: `client_id`, `client_name`)
3. Click **"Upload Excel"** and select your file
4. Dashboard automatically updates with your data

### Excel Format
Your Excel file should include these columns:
- `client_id` (required) - Unique identifier
- `client_name` (required) - Company name
- `industry`, `mrr`, `pipeline_value`, `leads_count`, `conversions_count`
- `conversion_rate`, `cac`, `growth_rate`, `status` (healthy/at-risk/critical)

**See [EXCEL_UPLOAD_GUIDE.md](./EXCEL_UPLOAD_GUIDE.md) for complete documentation.**

### Features
- ✅ Automatic data validation
- ✅ Historical trend generation based on growth rates
- ✅ AI insights updated with your data
- ✅ Client-side processing (data stays private)
- ✅ Error handling with helpful messages

## 📊 Data Model

### ClientMetrics
```typescript
{
  client_id: string
  client_name: string
  industry: string
  mrr: number
  pipeline_value: number
  leads_count: number
  conversions_count: number
  conversion_rate: number
  cac: number
  growth_rate: number
  status: 'healthy' | 'at-risk' | 'critical'
  last_updated: Date
}
```

### HistoricalData
- 12 weeks of historical data per client
- Tracks MRR, pipeline, leads, conversions, activities
- Realistic growth/decline trends

## 🤖 AI Insights

### Rule-Based Insights
- **Critical**: Revenue decline > 10%
- **Warning**: Pipeline coverage < 2x MRR
- **Warning**: Conversion rate < 3%
- **Success**: Growth rate > 10%

### OpenAI Integration
- Analyzes portfolio data with GPT-3.5-turbo
- Generates 2-3 strategic insights
- Identifies patterns across portfolio
- Provides actionable recommendations

**Note**: AI insights require a valid OpenAI API key. Without it, the app falls back to rule-based insights only.

## 📝 Usage

### Viewing the Dashboard
1. Open the application
2. See portfolio-level metrics at the top
3. View individual client cards with status indicators
4. Scroll down to see MRR trends over 12 weeks
5. Review AI-generated insights and recommendations

### Refreshing Insights
1. Click "Refresh Insights" button in header
2. AI will analyze current data
3. New insights will appear in seconds

### Generating Reports
1. Click "Generate Report" button
2. Executive report downloads automatically
3. Share with leadership team

## 🎯 Success Metrics

### Portfolio Health
- Total MRR: $195,000
- Total Pipeline: $510,000
- Average Growth: +2.1%
- Clients at Risk: 2 of 5

### Current Alerts
- 🔴 **Critical**: SalesBoost declining -15.2%
- ⚠️ **Warning**: TalentTrack pipeline coverage 2.0x
- ✅ **Success**: MarketMind strong growth +12.3%

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Build and deploy**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Add environment variables**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add `REACT_APP_OPENAI_API_KEY`

### Alternative: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy build folder**
   - Drag `build/` folder to Netlify
   - Or use Netlify CLI

## 🔧 Configuration

### Tailwind CSS
Custom colors defined in `tailwind.config.js`:
- `status-healthy`: #10b981 (Green)
- `status-warning`: #f59e0b (Orange)
- `status-critical`: #ef4444 (Red)

### Mock Data
Adjust client configurations in `src/data/mockData.ts`:
- Base MRR values
- Growth rates
- Pipeline multipliers
- Status indicators

## 🐛 Troubleshooting

### Charts not rendering
- Ensure Recharts is installed: `npm install recharts`
- Check browser console for errors

### AI insights not working
- Verify OpenAI API key in `.env.local`
- Check API key has sufficient credits
- Review browser console for API errors

### Styling issues
- Run `npm install -D tailwindcss postcss autoprefixer`
- Ensure Tailwind directives are in `index.css`

## 📈 Future Enhancements

### Phase 2 Features
- [ ] Individual client drill-down views
- [ ] Custom date range filtering
- [ ] Email report delivery
- [ ] Pipeline funnel visualization
- [ ] Deal-level tracking
- [ ] Search and filter functionality
- [ ] Export data to CSV
- [ ] Real-time data sync (Firebase/Supabase)
- [ ] User authentication
- [ ] Multi-team support

### Advanced Analytics
- [ ] Predictive revenue forecasting
- [ ] Churn risk scoring
- [ ] Cohort analysis
- [ ] Benchmark comparisons
- [ ] Custom metric builder

## 🤝 Contributing

This is a demonstration project for Perfect Ventures. For questions or suggestions:
1. Open an issue
2. Submit a pull request
3. Contact the development team

## 📄 License

MIT License - feel free to use this project as a template for your own RevOps dashboard.

## 🙏 Acknowledgments

- **Perfect Ventures** for the assignment brief
- **OpenAI** for GPT-3.5 API
- **Recharts** for beautiful charts
- **Tailwind CSS** for rapid styling
- **Lucide** for icons

---

**Built with ❤️ for Perfect Ventures RevOps Assignment**

Last Updated: November 2025
