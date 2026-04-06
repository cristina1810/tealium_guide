const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { openai } = require('./openaiClient');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// ID del Assistant de OpenAI (configúralo en .env)
const MAIN_AGENT_ID = process.env.MAIN_AGENT_ID;

// Almacenamos los threads por sesión
const sessionThreads = new Map();

/**
 * Obtener o crear un thread para la sesión
 */
async function getOrCreateThread(sessionId) {
  if (sessionThreads.has(sessionId)) {
    return sessionThreads.get(sessionId);
  }
  
  const thread = await openai.beta.threads.create();
  sessionThreads.set(sessionId, thread.id);
  return thread.id;
}

/**
 * Ejecutar un Assistant y esperar la respuesta
 */
async function runAssistant(threadId, assistantId, message) {
  // Añadir mensaje del usuario al thread
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: message
  });

  // Ejecutar el assistant
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId
  });

  // Esperar a que termine (polling)
  let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
  
  while (runStatus.status !== 'completed') {
    if (runStatus.status === 'failed' || runStatus.status === 'cancelled' || runStatus.status === 'expired') {
      throw new Error(`Run ${runStatus.status}: ${runStatus.last_error?.message || 'Unknown error'}`);
    }
    
    // Si requiere acción, manejar (por ahora solo loggear)
    if (runStatus.status === 'requires_action') {
      throw new Error('El assistant requiere acciones que no están implementadas');
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1s
    runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
  }

  // Obtener la respuesta
  const messages = await openai.beta.threads.messages.list(threadId);
  const lastMessage = messages.data[0];
  
  return lastMessage.content[0]?.text?.value || 'No hay respuesta';
}

/**
 * Endpoint principal del chat
 */
app.post('/api/chat', async (req, res) => {
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
    const threadId = await getOrCreateThread(sessionId);
    console.log('🧵 Thread ID:', threadId);

    // 2. Ejecutar el agente principal
    const reply = await runAssistant(threadId, MAIN_AGENT_ID, message);
    console.log('🤖 Respuesta del agente:', reply.substring(0, 100) + '...');

    // 3. Responder
    res.json({ reply });

  } catch (err) {
    console.error('Error en /api/chat:', err);
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
});

/**
 * Endpoint para resetear conversación
 */
app.post('/api/chat/reset', async (req, res) => {
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
      sessionThreads.delete(sessionId);
    }
    
    res.json({ success: true, message: 'Conversación reiniciada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al resetear', details: err.message });
  }
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mainAgentConfigured: !!MAIN_AGENT_ID,
    timestamp: new Date().toISOString() 
  });
});

// Catch-all: servir el frontend para cualquier ruta que no sea API (producción)
if (process.env.NODE_ENV === 'production') {
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server en http://localhost:${PORT}`);
  console.log(`Main Agent ID: ${MAIN_AGENT_ID ? '✓ Configurado' : '✗ No configurado'}`);
});
