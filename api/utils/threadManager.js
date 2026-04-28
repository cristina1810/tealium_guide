// ⚠️ NOTA: En producción con Vercel, los threads se pierden entre invocaciones
// Para producción, guarda los threads en una BD (MongoDB, PostgreSQL, etc.)
// Por ahora usamos una solución simple con almacenamiento en memoria

// Para una solución real, conecta esto a una BD
const sessionThreads = new Map();

async function getOrCreateThread(sessionId, openai) {
  if (!sessionId) {
    throw new Error('sessionId es requerido');
  }

  // Si ya existe un thread para esta sesión, devolverlo
  if (sessionThreads.has(sessionId)) {
    const existingThreadId = sessionThreads.get(sessionId);
    console.log('📎 Reutilizando thread existente:', existingThreadId);
    return existingThreadId;
  }
  
  // Crear nuevo thread
  const thread = await openai.beta.threads.create();
  
  if (!thread || !thread.id) {
    throw new Error('No se pudo crear el thread en OpenAI');
  }

  console.log('✨ Nuevo thread creado:', thread.id);
  sessionThreads.set(sessionId, thread.id);
  return thread.id;
}

async function runAssistant(threadId, assistantId, message, openai) {
  // Validar parámetros
  if (!threadId) {
    throw new Error('threadId es requerido');
  }
  if (!assistantId) {
    throw new Error('assistantId es requerido');
  }
  if (!message) {
    throw new Error('message es requerido');
  }

  console.log('🔄 Ejecutando assistant:', { threadId, assistantId, messageLength: message.length });

  // Añadir mensaje del usuario al thread
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: message
  });

  // Ejecutar el assistant y esperar a que termine
  console.log('🏃 Creando run y esperando respuesta...');
  
  const run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId
  });

  console.log('📊 Run completado con estado:', run.status);

  if (run.status !== 'completed') {
    throw new Error(`Run terminó con estado: ${run.status}. Error: ${run.last_error?.message || 'Unknown error'}`);
  }

  // Obtener la respuesta
  const messages = await openai.beta.threads.messages.list(threadId);
  const lastMessage = messages.data[0];
  
  return lastMessage.content[0]?.text?.value || 'No hay respuesta';
}

function deleteThread(sessionId) {
  if (sessionThreads.has(sessionId)) {
    sessionThreads.delete(sessionId);
  }
}

export {
  getOrCreateThread,
  runAssistant,
  deleteThread,
  sessionThreads
};
