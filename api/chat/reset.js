const { openai } = require('../utils/openai');
const { deleteThread, sessionThreads } = require('../utils/threadManager');

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
    const { sessionId = 'default' } = req.body;
    
    // Eliminar el thread de la sesión
    if (sessionThreads.has(sessionId)) {
      const threadId = sessionThreads.get(sessionId);
      try {
        await openai.beta.threads.del(threadId);
      } catch (e) {
        console.warn('No se pudo eliminar el thread:', e.message);
      }
    }
    
    deleteThread(sessionId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Conversación reiniciada' 
    });
  } catch (err) {
    console.error('Error al resetear:', err);
    return res.status(500).json({ 
      error: 'Error al resetear', 
      details: err.message 
    });
  }
}
