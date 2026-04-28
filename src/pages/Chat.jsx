import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  Zap,
  User,
  Copy,
  Check,
  ArrowUp,
  Command,
  Loader,
} from "lucide-react";

const PRIMARY = "#095fae";
const PRIMARY_DIM = "#00539b";

function BotAvatar() {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 animate-pulse shadow-lg"
      style={{ backgroundColor: PRIMARY, boxShadow: `0 0 16px ${PRIMARY}20` }}
    >
      <Zap size={14} className="text-white" />
    </div>
  );
}

function BotLabel() {
  return (
    <span className="text-[0.6875rem] font-bold tracking-widest text-slate-500 uppercase">
      Tealium Assistant
    </span>
  );
}

function UserAvatar() {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md"
      style={{
        backgroundColor: PRIMARY,
        boxShadow: `0 0 12px ${PRIMARY}40`,
      }}
    >
      <User size={14} className="text-white" />
    </div>
  );
}

function CodeBlock({ inline, className, children, ...props }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  const copyCode = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className="bg-slate-100 text-slate-900 px-2 py-1 rounded text-[0.85em] font-mono">
        {children}
      </code>
    );
  }

  return (
    <div className="relative group">
      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto my-3 font-mono text-[0.8rem] leading-relaxed">
        {language && (
          <div className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider">
            {language}
          </div>
        )}
        <code>{children}</code>
      </pre>
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded transition-all opacity-0 group-hover:opacity-100 text-slate-300"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function MessageBubble({ message, isLoading }) {
  if (message.sender === "system") {
    return (
      <div className="text-center text-xs text-slate-500 uppercase tracking-widest py-4">
        {message.text}
      </div>
    );
  }

  const isUser = message.sender === "user";

  return (
    <div
      className={`flex flex-col gap-2 animate-fadeIn ${isUser ? "items-end" : "items-start"}`}
      style={{
        animation: "fadeIn 0.3s ease-out forwards",
      }}
    >
      <div className={`flex items-center gap-3 ${isUser ? "mr-4" : "ml-4"}`}>
        {isUser ? (
          <>
            <span className="text-[0.625rem] font-bold tracking-widest text-slate-500 uppercase">
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
        className={`p-5 rounded-2xl max-w-2xl message-bubble transition-all duration-200 ${
          isUser
            ? "text-white shadow-md"
            : "bg-white shadow-[0px_8px_24px_rgba(40,52,57,0.08)] border border-slate-100"
        }`}
        style={{
          backgroundColor: isUser ? PRIMARY : "white",
          color: isUser ? "white" : "#1e293b",
        }}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader size={16} className="animate-spin" />
            <span className="text-[0.875rem]">Analizando tu pregunta...</span>
          </div>
        ) : isUser ? (
          <p className="text-[0.875rem] leading-relaxed whitespace-pre-line">
            {message.text}
          </p>
        ) : (
          <div className="markdown-content text-[0.875rem] leading-relaxed space-y-3">
            <ReactMarkdown
              components={{
                code: CodeBlock,
                p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside space-y-1 ml-2"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside space-y-1 ml-2"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-[0.875rem]" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold text-slate-900" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic text-slate-700" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-blue-400 pl-4 py-2 italic text-slate-600"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-lg font-bold text-slate-900 mt-4 mb-2"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-base font-bold text-slate-800 mt-3 mb-2"
                    {...props}
                  />
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatInput({ value, setValue, onSubmit, disabled, compact }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && value.trim()) {
      e.preventDefault();
      onSubmit(value.trim());
      setValue("");
    }
  };

  return (
    <footer
      className={`shrink-0 bg-gradient-to-t from-white via-white to-transparent ${compact ? "p-3" : "p-6 pb-8"}`}
    >
      <div className={compact ? "" : "max-w-5xl mx-auto"}>
        <div className="relative group">
          {!compact && (
            <div
              className="absolute -inset-1 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-all duration-300"
              style={{ backgroundColor: `${PRIMARY}15` }}
            />
          )}

          <div
            className={`relative flex items-center bg-white rounded-2xl shadow-[0px_12px_32px_rgba(9,95,174,0.12)] overflow-hidden focus-within:ring-2 focus-within:ring-blue-300 transition-all duration-200 border border-slate-100 hover:border-slate-200`}
          >
            <input
              className={`w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 font-medium outline-none resize-none ${
                compact
                  ? "py-3 px-4 text-[0.8125rem]"
                  : "py-5 px-5 text-[0.9375rem]"
              }`}
              placeholder="Escribe tu consulta técnica aquí..."
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
            />

            <div
              className={`flex items-center gap-2 ${compact ? "pr-2" : "pr-3"}`}
            >
              {!compact && !disabled && value.trim() && (
                <div className="flex items-center gap-1 px-2 py-1 text-slate-400 text-[0.7rem] font-semibold uppercase tracking-wider">
                  <Command size={11} />
                  <span>Enter</span>
                </div>
              )}

              <button
                className={`rounded-xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 shadow-md text-white disabled:opacity-50 disabled:cursor-not-allowed ${
                  compact ? "w-9 h-9" : "w-11 h-11"
                }`}
                style={{
                  background: disabled
                    ? "#cbd5e1"
                    : `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DIM} 100%)`,
                  boxShadow: disabled ? "none" : `0 4px 12px ${PRIMARY}40`,
                }}
                onClick={() => {
                  if (value.trim() && !disabled) {
                    onSubmit(value.trim());
                    setValue("");
                  }
                }}
                disabled={disabled}
              >
                {disabled ? (
                  <Loader size={compact ? 16 : 20} className="animate-spin" />
                ) : (
                  <ArrowUp size={compact ? 16 : 20} />
                )}
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
      id: "welcome",
      sender: "bot",
      text: "¡Hola! 👋 Bienvenido a tu **Tealium Assistant**. Estoy aquí para ayudarte con dudas técnicas sobre:\n\n- 🎯 **Tealium iQ** - Implementación y configuración\n- 📊 **EventStream** - Recolección y procesamiento de eventos\n- 👥 **AudienceStream** - Gestión de audiencias y CDP\n- 🔧 **Certificación Profesional** - Preparación y exámenes\n\n¿En qué aspecto de la implementación necesitas profundizar hoy?",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const messageId = `user-${Date.now()}-${Math.random()}`;
    const respId = `bot-${Date.now()}-${Math.random()}`;

    setMessages((prev) => [
      ...prev,
      { id: messageId, sender: "user", text },
      { id: respId, sender: "bot", text: "", loading: true },
    ]);

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text, sessionId: "default" }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody?.error || "Error en el servidor");
      }

      const data = await res.json();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === respId
            ? {
                ...msg,
                text: data.reply || "No se obtuvo respuesta",
                loading: false,
              }
            : msg,
        ),
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === respId
            ? {
                ...msg,
                text: `❌ **Error de conexión**\n\nNo se pudo conectar al agente externo.\n\n**Detalles:** ${error.message}\n\nIntenta de nuevo.`,
                loading: false,
              }
            : msg,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const resetSession = async () => {
    await fetch("/api/chat/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "default" }),
    }).catch(() => null);

    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "¡Hola! 👋 Bienvenido a tu **Tealium Assistant**. Estoy aquí para ayudarte con dudas técnicas sobre:\n\n- 🎯 **Tealium iQ** - Implementación y configuración\n- 📊 **EventStream** - Recolección y procesamiento de eventos\n- 👥 **AudienceStream** - Gestión de audiencias y CDP\n- 🔧 **Certificación Profesional** - Preparación y exámenes\n\n¿En qué aspecto de la implementación necesitas profundizar hoy?",
      },
    ]);
    setInputValue("");
  };

  return (
    <main
      className={`flex-1 flex flex-col relative ${compact ? "h-full" : "h-screen"}`}
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          "radial-gradient(circle at 20% 50%, rgba(9,95,174,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(9,95,174,0.02) 0%, transparent 50%)",
      }}
    >
      <header
        className={`flex items-center justify-between shrink-0 backdrop-blur-sm border-b border-slate-100 ${
          compact ? "h-12 px-4" : "h-16 px-10"
        }`}
        style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${PRIMARY}15` }}
            >
              <Sparkles size={compact ? 16 : 18} style={{ color: PRIMARY }} />
            </div>
            <div>
              <h2
                className={`font-bold tracking-tight text-slate-900 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                Tealium Assistant
              </h2>
              <p className="text-[0.625rem] text-slate-500 font-medium">
                Powered by OpenAI
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={resetSession}
          disabled={loading}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Nueva Sesión
        </button>
      </header>

      <section
        className={`flex-1 overflow-y-auto scroll-smooth ${
          compact ? "px-4 py-4" : "px-10 py-8"
        }`}
      >
        <div
          className={`flex flex-col w-full ${
            compact ? "gap-4" : "gap-6 max-w-5xl mx-auto"
          }`}
        >
          {messages.map((message, idx) => (
            <MessageBubble
              key={message.id}
              message={message}
              isLoading={message.loading}
            />
          ))}
          <div ref={bottomRef} className={compact ? "h-4" : "h-8"} />
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
