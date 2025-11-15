import { ClientMetrics, Insight } from '../data/types';

// Generate rule-based insights
export function generateRuleBasedInsights(clients: ClientMetrics[]): Insight[] {
  const insights: Insight[] = [];

  clients.forEach((client) => {
    // Critical: Significant revenue decline
    if (client.growth_rate < -10) {
      insights.push({
        severity: 'critical',
        client: client.client_name,
        title: 'Significant Revenue Decline',
        message: `${client.client_name} MRR dropped ${Math.abs(client.growth_rate)}% this month`,
        recommendation: 'Schedule emergency leadership call to identify churn factors and retention strategy',
      });
    }

    // Warning: Low pipeline coverage
    const pipelineRatio = client.pipeline_value / client.mrr;
    if (pipelineRatio < 2) {
      insights.push({
        severity: 'warning',
        client: client.client_name,
        title: 'Low Pipeline Coverage',
        message: `${client.client_name} pipeline only ${pipelineRatio.toFixed(1)}x of MRR`,
        recommendation: 'Increase prospecting efforts and accelerate deal velocity to maintain growth',
      });
    }

    // Warning: Poor conversion performance
    if (client.conversion_rate < 3) {
      insights.push({
        severity: 'warning',
        client: client.client_name,
        title: 'Poor Conversion Performance',
        message: `Only ${client.conversion_rate}% of leads converting`,
        recommendation: 'Audit sales process and lead qualification criteria',
      });
    }

    // Warning: Moderate decline
    if (client.growth_rate < -5 && client.growth_rate >= -10) {
      insights.push({
        severity: 'warning',
        client: client.client_name,
        title: 'Revenue Decline Detected',
        message: `${client.client_name} showing ${Math.abs(client.growth_rate)}% decline`,
        recommendation: 'Review customer satisfaction scores and competitive positioning',
      });
    }

    // Success: Strong performance
    if (client.growth_rate > 10) {
      insights.push({
        severity: 'success',
        client: client.client_name,
        title: 'Strong Performance',
        message: `${client.client_name} achieved ${client.growth_rate}% growth`,
        recommendation: 'Document successful strategies to replicate across portfolio',
      });
    }

    // Success: Healthy growth with good pipeline
    if (client.growth_rate > 5 && client.growth_rate <= 10 && pipelineRatio >= 2.5) {
      insights.push({
        severity: 'success',
        client: client.client_name,
        title: 'Healthy Growth Trajectory',
        message: `${client.client_name} showing steady growth with strong pipeline`,
        recommendation: 'Maintain current strategy and consider scaling successful initiatives',
      });
    }
  });

  // Portfolio-level insights
  const criticalClients = clients.filter((c) => c.status === 'critical').length;
  const atRiskClients = clients.filter((c) => c.status === 'at-risk').length;

  if (criticalClients > 0 || atRiskClients > 1) {
    insights.push({
      severity: 'critical',
      client: 'Portfolio',
      title: 'Portfolio Health Alert',
      message: `${criticalClients + atRiskClients} of ${clients.length} clients need immediate attention`,
      recommendation: 'Prioritize retention efforts and allocate resources to at-risk accounts',
    });
  }

  return insights;
}

// Generate AI-powered insights using Google Gemini
export async function generateAIInsights(clients: ClientMetrics[]): Promise<Insight[]> {
  // FIX 1: Access environment variable correctly for browser
  // Cast import.meta to any to avoid TypeScript error when using Vite's import.meta.env
  const apiKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;

  console.log('🤖 [AI INSIGHTS] Starting AI insight generation...');
  console.log('🔑 [AI INSIGHTS] API Key status:', apiKey ? 
    (apiKey === 'your_gemini_api_key_here' ? '❌ Not configured (using placeholder)' : '✅ Configured') : 
    '❌ Missing');

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn('⚠️  [AI INSIGHTS] Gemini API key not configured. Using rule-based insights only.');
    console.warn('💡 [AI INSIGHTS] To enable AI insights: Create .env file with REACT_APP_GEMINI_API_KEY=your_key (CRA) or VITE_GEMINI_API_KEY=your_key (Vite)');
    return [];
  }

  try {
    const portfolioSummary = clients.map((client) => ({
      name: client.client_name,
      industry: client.industry,
      mrr: client.mrr,
      growth_rate: client.growth_rate,
      pipeline_value: client.pipeline_value,
      conversion_rate: client.conversion_rate,
      status: client.status,
    }));

    console.log('📊 [AI INSIGHTS] Portfolio summary prepared for AI:', {
      clientCount: portfolioSummary.length,
      totalMRR: portfolioSummary.reduce((sum, c) => sum + c.mrr, 0),
      criticalClients: portfolioSummary.filter(c => c.status === 'critical').length,
    });

    const prompt = `You are a RevOps analyst for Perfect Ventures. Analyze this portfolio data and provide insights:

Portfolio Data:
${JSON.stringify(portfolioSummary, null, 2)}

Generate 2-3 strategic insights that:
1. Identify patterns across the portfolio
2. Provide actionable recommendations
3. Focus on growth opportunities or risk mitigation

Format as a JSON array with this structure:
[
  {
    "severity": "critical" | "warning" | "success",
    "client": "client name or 'Portfolio'",
    "title": "Brief title",
    "message": "Detailed message",
    "recommendation": "Specific action item"
  }
]

Return ONLY valid JSON, no markdown or additional text.`;

    console.log('🌐 [AI INSIGHTS] Calling Gemini API...');
    const startTime = Date.now();

    // FIX: Updated endpoint to the current recommended model name (gemini-2.5-flash)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    const responseTime = Date.now() - startTime;
    console.log(`⏱️  [AI INSIGHTS] API response received in ${responseTime}ms`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [AI INSIGHTS] Gemini API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      // The console error from your image will be caught here and re-thrown
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 [AI INSIGHTS] Raw API response:', JSON.stringify(data, null, 2));

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
    console.log('📝 [AI INSIGHTS] Extracted content:', content);
    
    // Try to extract JSON from potential markdown code blocks
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;
    
    console.log('🔍 [AI INSIGHTS] Parsing JSON...');
    const aiInsights: Insight[] = JSON.parse(jsonString);
    
    console.log(`✅ [AI INSIGHTS] Successfully generated ${aiInsights.length} AI insights!`);
    console.log('💡 [AI INSIGHTS] AI Insights:', aiInsights);
    
    return aiInsights;
  } catch (error) {
    console.error('💥 [AI INSIGHTS] Error generating AI insights:', error);
    if (error instanceof Error) {
      console.error('📋 [AI INSIGHTS] Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    return [];
  }
}

// Combine rule-based and AI insights
export async function generateAllInsights(clients: ClientMetrics[]): Promise<Insight[]> {
  const ruleBasedInsights = generateRuleBasedInsights(clients);
  const aiInsights = await generateAIInsights(clients);

  // Combine and limit to top 7 insights
  const allInsights = [...ruleBasedInsights, ...aiInsights];
  
  // Sort by severity (critical > warning > success)
  const severityOrder = { critical: 0, warning: 1, success: 2 };
  allInsights.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return allInsights.slice(0, 7);
}