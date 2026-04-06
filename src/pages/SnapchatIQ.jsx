import {
Search,
Tag,
Info,
ArrowRight,
Copy,
CheckCircle2,
Rocket,
} from 'lucide-react';

/* ── Reutilizable: número de paso ─────────────────────────── */
function StepBadge({ number, active = false }) {
return (
  <span
    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg font-bold text-xl flex-none
      ${active
        ? 'bg-blue-100 text-blue-700'
        : 'bg-slate-200 text-slate-500'}`}
  >
    {String(number).padStart(2, '0')}
  </span>
);
}

/* ── Card contenedor por paso ─────────────────────────────── */
function StepCard({ children }) {
return (
  <div className="bg-white p-8 rounded-lg shadow-[0px_12px_32px_rgba(40,52,57,0.06)] border border-slate-200/40">
    {children}
  </div>
);
}

/* ── Mapeo de datos ───────────────────────────────────────── */
const DATA_MAP = [
{ source: 'customer_id', dest: 'user_id'        },
{ source: 'page_name',   dest: 'page_location'  },
{ source: 'cart_total',  dest: 'value'          },
];

/* ════════════════════════════════════════════════════════════ */
export default function SnapchatIQ() {
return (
  <>
    {/* ── Header ── */}
    <header className="max-w-4xl mx-auto mb-16 flex justify-between items-end">
      <div>
        <span className="my-4 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-slate-500 mb-2 block">
          Implementation Guide
        </span>
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-800 leading-tight">
          Snapchat
        </h2>
        <p> Enunciado</p>
      </div>
     
    </header>

    {/* ── Steps ── */}
    <section className="max-w-4xl mx-auto space-y-24">

   
      <article>
        <div className="flex items-start gap-12">
          <StepBadge number={1} active />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Evento Add to Cart</h3>
            <StepCard>
              <p className="text-slate-500 leading-relaxed mb-6">
                Inicie el proceso localizando la etiqueta oficial de Google Analytics 4 en el
                Marketplace de Tealium iQ. Esta etiqueta está optimizada para el protocolo de
                medición de GA4.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-slate-100 flex items-center gap-4">
                  <Search size={20} className="text-blue-700 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">Búsqueda</p>
                    <p className="text-sm font-semibold text-slate-800">
                      Google Analytics 4 (GA4)
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-md bg-slate-100 flex items-center gap-4">
                  <Tag size={20} className="text-blue-700 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">Categoría</p>
                    <p className="text-sm font-semibold text-slate-800">
                      Analytics &amp; Metrics
                    </p>
                  </div>
                </div>
              </div>
            </StepCard>
          </div>
        </div>
      </article>

      {/* ── 02 Configurar Propiedades ── */}
      <article>
        <div className="flex items-start gap-12">
          <StepBadge number={2} />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Creación del tag</h3>
            <StepCard>
              <p className="text-slate-500 leading-relaxed mb-8">
                Defina los parámetros base de su propiedad. El Measurement ID es el
                identificador único necesario para dirigir los datos hacia su flujo de GA4.
              </p>
              <div className="space-y-6">
                {/* Measurement ID */}
                <div>
                  <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Measurement ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="G-XXXXXXXXXX"
                      className="w-full bg-slate-100 border-0 rounded-md p-4 font-mono text-sm text-slate-500 focus:ring-0 outline-none"
                    />
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-700 transition-colors"
                      onClick={() => navigator.clipboard.writeText('G-XXXXXXXXXX')}
                      title="Copiar"
                    >
                      <Copy size={17} />
                    </button>
                  </div>
                </div>

                {/* Info callout */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <Info size={18} className="text-blue-700 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800 italic leading-relaxed">
                    El Measurement ID se encuentra en el panel de administración de GA4 bajo
                    'Data Streams'.
                  </p>
                </div>
              </div>
            </StepCard>
          </div>
        </div>
      </article>

      
      {/* ── 04 Añadir Load Rule ── */}
      <article>
        <div className="flex items-start gap-12">
          <StepBadge number={4} />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Añadir Load Rule</h3>
            <StepCard>
              <p className="text-slate-500 leading-relaxed mb-8">
                Determine bajo qué condiciones se debe cargar esta etiqueta. Recomendamos
                utilizar una regla de exclusión para entornos de desarrollo si se encuentra
                en producción.
              </p>
              <div className="flex flex-col gap-4">
                {/* Active rule */}
                <div className="p-6 rounded-lg bg-slate-100 border-l-4 border-blue-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-blue-700 uppercase">
                      Active Rule
                    </span>
                    <CheckCircle2
                      size={18}
                      className="text-blue-700"
                      fill="currentColor"
                      strokeWidth={1}
                    />
                  </div>
                  <p className="font-bold text-slate-800 mb-2">All Pages Except Dev</p>
                  <code className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded">
                    domain IS NOT EQUAL TO dev.example.com
                  </code>
                </div>

              </div>
            </StepCard>
          </div>
        </div>
      </article>
      {/* ── 03 Mapeo de Datos ── */}
      <article>
        <div className="flex items-start gap-12">
          <StepBadge number={4} />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Mapeo de Datos</h3>
            <StepCard>
              <p className="text-slate-500 leading-relaxed mb-8">
                Vincule sus variables del Data Layer a los parámetros específicos de Google
                Analytics 4. Esto asegura que la semántica de los datos se mantenga íntegra.
              </p>
              <div className="overflow-hidden rounded-md border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="px-6 py-4">Data Source Variable</th>
                      <th className="px-6 py-4 text-center">
                        <ArrowRight size={14} className="inline-block" />
                      </th>
                      <th className="px-6 py-4">GA4 Destination</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DATA_MAP.map(({ source, dest }) => (
                      <tr key={source} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-blue-700">{source}</td>
                        <td className="px-6 py-4 text-center text-slate-400">→</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{dest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </StepCard>
          </div>
        </div>
      </article>

    </section>

    {/* ── Footer ── */}
    <footer className="max-w-4xl mx-auto mt-32 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start gap-8 opacity-60">
      <div className="max-w-xs">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          System Integrity
        </h4>
        <p className="text-[0.6875rem] leading-relaxed text-slate-600">
          Configuración validada para Tealium iQ v5.4. Los cambios realizados se guardarán
          localmente hasta que se realice un 'Publish'.
        </p>
      </div>
      <div className="flex gap-12">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            Version
          </h4>
          <p className="text-[0.6875rem] font-mono text-slate-600">1.0.4-stable</p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            Last Edit
          </h4>
          <p className="text-[0.6875rem] text-slate-600">Oct 24, 2023</p>
        </div>
      </div>
    </footer>
  </>
);
}