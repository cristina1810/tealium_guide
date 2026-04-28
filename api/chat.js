import { openai } from './utils/openai.js';
import { getOrCreateThread, runAssistant } from './utils/threadManager.js';

const MAIN_AGENT_ID = process.env.MAIN_AGENT_ID;

export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { message, sessionId = 'default' } = req.body;
    
    console.log('📩 Mensaje recibido:', message, 'SessionId:', sessionId);
    
    if (!message) {
      return res.status(400).json({ error: 'Falta el mensaje' });
    }

    if (!MAIN_AGENT_ID) {
      return res.status(500).json({ error: 'MAIN_AGENT_ID no configurado en el servidor' });
    }

    // 1. Obtener/crear thread para esta sesión
    const threadId = await getOrCreateThread(sessionId, openai);
    console.log('🧵 Thread ID:', threadId);

    // 2. Ejecutar el agente principal
    const reply = await runAssistant(threadId, MAIN_AGENT_ID, message, openai);
    console.log('🤖 Respuesta del agente:', reply.substring(0, 100) + '...');

    // 3. Responder
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Error en /api/chat:', err);
    return res.status(500).json({ 
      error: 'Error interno del servidor', 
      details: err.message 
    });
  }
}
