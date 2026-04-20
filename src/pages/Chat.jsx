import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Sparkles,
  Zap,
  User,
  History,
  Paperclip,
  ArrowUp,
  Command,
} from 'lucide-react';

const PRIMARY = '#095fae';
const PRIMARY_DIM = '#00539b';

function BotAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
      <Zap size={14} fill={PRIMARY} style={{ color: PRIMARY }} />
    </div>
  );
}

function BotLabel() {
  return (
    <span className="text-[0.6875rem] font-bold tracking-widest text-slate-600 uppercase">
      Tealium Assistant
    </span>
  );
}

function UserAvatar() {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: PRIMARY }}
    >
      <User size={14} className="text-white" />
    </div>
  );
}

function MessageBubble({ message }) {
  if (message.sender === 'system') {
    return (
      <div className="text-center text-xs text-slate-500 uppercase tracking-widest py-2">
        {message.text}
      </div>
    );
  }

  const isUser = message.sender === 'user';

  return (
    <div
      className={`flex flex-col gap-4 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div className={`flex items-center gap-3 ${isUser ? 'mr-4' : 'ml-4'}`}>
        {isUser ? (
          <>
            <span className="text-[0.6875rem] font-bold tracking-widest text-slate-600 uppercase">
              Tú 
            </span>
            <UserAvatar />
          </>
        ) : (
          <>
            <BotAvatar />
            <BotLabel />
          </>
        )}
      </div>

      <div
        className={`p-6 rounded-xl max-w-2xl message-bubble ${isUser ? 'text-white' : 'bg-white shadow-[0px_12px_32px_rgba(40,52,57,0.03)]'}`}
        style={{
          backgroundColor: isUser ? PRIMARY : 'white',
          color: isUser ? 'white' : '#0f172a',
        }}
      >
        {isUser ? (
          <p className="text-[0.875rem] leading-relaxed whitespace-pre-line">
            {message.text}
          </p>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatInput({ value, setValue, onSubmit, disabled, compact }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <footer
      className={`shrink-0 ${compact ? 'p-3' : 'p-6 pb-8'}`}
      style={{ backgroundColor: '#f7fafc' }}
    >
      <div className={compact ? '' : 'max-w-5xl mx-auto'}>
        <div className="relative group">
          {!compact && (
            <div
              className="absolute -inset-0.5 rounded-2xl blur opacity-75 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200"
              style={{ backgroundColor: 'rgba(9,95,174,0.05)' }}
            />
          )}

          <div className={`relative flex items-center bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.04)] overflow-hidden focus-within:ring-1 focus-within:ring-blue-200`}>
            {!compact && (
              <div className="pl-6 text-slate-400">
                <Paperclip size={18} />
              </div>
            )}

            <input
              className={`w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400/60 font-medium outline-none ${compact ? 'py-3 px-4 text-[0.8125rem]' : 'py-6 px-4 text-[0.875rem]'}`}
              placeholder="Escribe tu consulta técnica aquí..."
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
            />

            <div className={`flex items-center gap-4 ${compact ? 'pr-2' : 'pr-6'}`}>
              {!compact && (
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
                  <Command size={12} className="text-slate-600" />
                  <span className="text-[10px] font-bold text-slate-600">ENTER</span>
                </div>
              )}

              <button
                className={`rounded-xl flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-lg text-white ${compact ? 'w-9 h-9 m-1' : 'w-12 h-12'}`}
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DIM} 100%)`,
                }}
                onClick={() => {
                  if (value.trim() && !disabled) {
                    onSubmit(value.trim());
                    setValue('');
                  }
                }}
                disabled={disabled}
              >
                <ArrowUp size={compact ? 16 : 20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Chat({ compact = false }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text:
        'Bienvenido. Estoy aquí para asistirte con cualquier duda técnica sobre la certificación de Tealium iQ, EventStream o AudienceStream.\n\n¿En qué aspecto de la implementación necesitas profundizar hoy?',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const messageId = `user-${Date.now()}-${Math.random()}`;
    const respId = `bot-${Date.now()}-${Math.random()}`;

    setMessages((prev) => [
      ...prev,
      { id: messageId, sender: 'user', text },
      { id: respId, sender: 'bot', text: 'Escribiendo...', loading: true },
    ]);

    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text, sessionId: 'default' }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody?.error || 'Error en el servidor');
      }

      const data = await res.json();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === respId
            ? { ...msg, text: data.reply || 'No se obtuvo respuesta', loading: false }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === respId
            ? {
                ...msg,
                text: `No se pudo conectar al agente externo. Intenta de nuevo. (error: ${error.message})`,
                loading: false,
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const resetSession = async () => {
    await fetch('/api/chat/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: 'default' }),
    }).catch(() => null);

    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text:
          'Bienvenido a tu Tealium Guide Assistant. Estoy aquí para asistirte con cualquier duda técnica sobre la certificación de Tealium iQ o EventStream.\n\n¿En qué aspecto de la implementación necesitas profundizar hoy?',
      },
    ]);
    setInputValue('');
  };

  return (
    <main
      className={`flex-1 flex flex-col ${compact ? 'h-full' : 'h-screen'}`}
      style={{ backgroundColor: '#f7fafc' }}
    >
      <header
        className={`flex items-center justify-between shrink-0 backdrop-blur-md ${compact ? 'h-12 px-4' : 'h-16 px-10'}`}
        style={{ backgroundColor: 'rgba(247,250,252,0.9)' }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles size={compact ? 16 : 20} fill={PRIMARY} style={{ color: PRIMARY }} />
            <h2 className={`font-bold tracking-tight text-slate-800 ${compact ? 'text-xs' : 'text-sm'}`}>
              Tealium Assistant
            </h2>
          </div>
         
        </div>

        
      </header>

      <section className={`flex-1 overflow-y-auto ${compact ? 'px-4 py-4 pb-2' : 'px-10 py-8 pb-4'}`}>
        <div className={`flex flex-col gap-4 w-full ${compact ? '' : 'gap-6 max-w-5xl mx-auto'}`}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={bottomRef} />
        </div>
      </section>

      <ChatInput
        value={inputValue}
        setValue={setInputValue}
        onSubmit={sendMessage}
        disabled={loading}
        compact={compact}
      />
    </main>
  );
}