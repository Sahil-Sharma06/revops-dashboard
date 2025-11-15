# RevOps Command Center

Portfolio dashboard for monitoring SaaS companies with AI insights.

## Setup

```bash
npm install
npm start
```

Open http://localhost:3000

## Configuration (Optional)

Add `.env` file for AI insights:
```env
REACT_APP_GEMINI_API_KEY=your_api_key_here
```


## Features

- Monitor 8 portfolio companies
- Track MRR, Pipeline, Growth Rate
- View 12-week trend charts
- AI-powered insights (requires API key)
- Upload Excel data
- Generate reports

## Tech Stack

React + TypeScript + Tailwind CSS + Recharts + Google Gemini API

## Deploy

```bash
npm run build
```

Deploy the `build` folder to Vercel or Netlify.
