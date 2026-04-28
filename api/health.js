export default function handler(req, res) {
  const MAIN_AGENT_ID = process.env.MAIN_AGENT_ID;
  
  res.status(200).json({ 
    status: 'ok',
    mainAgentConfigured: !!MAIN_AGENT_ID,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
}
