import { useNavigate } from 'react-router-dom'
import { ArrowRight, MessageCircle, Layers, Network, Compass } from 'lucide-react'

export default function Home() {
const navigate = useNavigate()

return (
  // ← ml-72 eliminado: el wrapper de App.jsx ya gestiona el margen
  <main className="min-h-screen p-16 md:p-24 lg:p-32 flex flex-col">

    {/* ── Welcome Header ── */}
    <header className="max-w-4xl mb-24">
      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface mb-6 leading-tight">
        Bienvenido a la Guía de Certificación de Tealium.
      </h2>

    </header>

    {/* ── Bento Grid ── */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

      {/* Card: Chat / Theory */}
      <div className="lg:col-span-5 flex">
        <div
          onClick={() => navigate('/chat')}
          className="w-full bg-surface-container-lowest shadow-lg rounded-lg p-10 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:bg-surface-container-high relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Teoría</h3>
            <p className="text-on-surface-variant leading-relaxed">
             Usa el chat para responder a las preguntas en los exámenes de teoría.
            </p>
          </div>

          <div className="mt-12 flex items-center justify-between relative z-10 shadow-md p-3 rounded-lg group-hover:shadow-lg transition-shadow bg-surface-container-high cursor-pointer">
            <span className="text-sm font-semibold tracking-tight">Ir al chat</span>
            <div className="w-12 h-12flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
              <ArrowRight size={20} strokeWidth={1.75} />
            </div>
          </div>

          <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
            <MessageCircle size={180} strokeWidth={0.75} />
          </div>
        </div>
      </div>

      {/* Card: Practice / Platform Selection */}
      <div className="lg:col-span-7 flex">
        <div className="w-full bg-surface-container-lowest shadow-lg rounded-lg p-10 flex flex-col justify-between group relative overflow-hidden">
          <div className="relative z-10">
            
            <h3 className="text-3xl font-bold mb-4">Parte Práctica</h3>
            <p className="text-on-surface-variant leading-relaxed max-w-md">
             Accede a guías detalladas de cada apartado de la parte práctica de la certificación
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <button
              onClick={() => navigate('/tealium-iq')}
              className="atelier-gradient shadow-md text-on-primary py-4 px-6 rounded-lg text-sm font-bold flex items-center justify-between hover:opacity-90 transition-opacity"
            >
              <span>Tealium iQ</span>
          
            </button>
            <button
              onClick={() => navigate('/eventstream')}
              className="bg-surface-container-high shadow-md text-on-surface py-4 px-6 rounded-lg text-sm font-bold flex items-center justify-between hover:bg-surface-container-highest transition-colors"
            >
              <span>Eventstream</span>
            </button>
          </div>

          <div className="absolute -right-12 -bottom-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
            <Compass size={240} strokeWidth={0.5} />
          </div>
        </div>
      </div>

    </div>

  </main>
)
}