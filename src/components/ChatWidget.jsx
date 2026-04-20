import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Chat from '../pages/Chat';

const PRIMARY = '#095fae';
const PRIMARY_DIM = '#00539b';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Panel del chat */}
      <div
        className={`fixed z-[9999] overflow-hidden transition-all duration-300 origin-bottom-right
          inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px] sm:h-[600px] sm:rounded-2xl sm:shadow-2xl sm:border sm:border-slate-200
          ${open
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-90 opacity-0 pointer-events-none'
          }`}
      >
        <Chat compact />
      </div>

      {/* Botón flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
        style={{
          background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DIM} 100%)`,
        }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
