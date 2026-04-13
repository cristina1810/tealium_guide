import {
Search,
Tag,
Info,
ArrowRight,
Copy,
CheckCircle2,
Rocket,
} from 'lucide-react';
import DiscountBanner from '../components/DiscountBanner';
import DataLayer from '../components/DataLayer';
import SearchLowercase from '../components/SearchLowecase';
import ProductBrandEvent from '../components/ProductBrandEvent';

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
export default function GenConfigIQ() {
return (
  <>
    {/* ── Header ── */}
    <header className="max-w-5xl mx-auto mb-16 flex justify-between items-end">
      <div>
        <span className="my-4 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-slate-500 mb-2 block">
          Implementation Guide
        </span>
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-800 leading-tight">
          Configuración general
        </h2>
      </div>
      <div className="text-right pb-2">
        <span className="text-sm font-medium text-slate-500">Step 01 / 04</span>
      </div>
    </header>

    {/* ── Steps ── */}
    <section className="max-w-5xl mx-auto space-y-24">

      {/* ── 01 Seleccionar Tag ── */}
      <article>
        <div className="flex items-start gap-12">
          <StepBadge number={1} active />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Añadiendo variables a Data Layer</h3>
            <StepCard>
              <p className="text-slate-500 leading-relaxed mb-6">
                Vamos a comenzar añadiendo todas las variables que encontramos presentes en la página de e-commerce. Si quieres hacerlo de por tu cuenta puedes acceder aquí para saber como.
              </p>
               <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-100 mb-3">
                  <Info size={18} className="text-blue-700 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800 italic leading-relaxed">
                   Existe una opción "Add common variables" al deplegar la opción Add Variable que nos permite añadir variables comunes de e-commerce o de Tealium Built-in Data
                  </p>
                </div>
                <p className="text-slate-500 leading-relaxed mb-6">
                Si pulsas el botón "Copiar CSV", se copiará al portapapeles un CSV con el formato necesario para importar estas variables a Tealium iQ haciendo uso de la función de "Bulk Import" desplegando el botón "Add Variable".
              </p>
              <DataLayer / >
            </StepCard>
          </div>
        </div>
      </article>

      {/* ── 02 Configurar Propiedades ── */}
      <article>
        <div className="flex items-start gap-12">
          <StepBadge number={2} />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Configurar Propiedades</h3>
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
              <ProductBrandEvent / >
            </StepCard>
          </div>
        </div>
      </article>

      
      <article>
        <div className="flex items-start gap-12">
          <StepBadge number={3} />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Extensión: Search Lowercase</h3>
            <StepCard>
              <p className="text-slate-500 leading-relaxed mb-8">
                Con una sola extensión se pide poner en lowercase todas las búsquedas realizadas al usar el input de búsqueda. Se crea una extensión tipo Lowercase seleccionando la variable que se va a modificar:
              </p>
             
              <SearchLowercase / >
            </StepCard>
          </div>
        </div>
      </article>

      {/* ── 04 Añadir Load Rule ── */}
      <article>
        <div className="flex items-start gap-12">
          <StepBadge number={4} />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Extensión: Discount Banner</h3>
            <StepCard>
              <p className="text-slate-500 leading-relaxed mb-8">
                Determine bajo qué condiciones se debe cargar esta etiqueta. Recomendamos
                utilizar una regla de exclusión para entornos de desarrollo si se encuentra
                en producción.
              </p>
              <DiscountBanner/>
            </StepCard>
          </div>
        </div>
      </article>
    </section>

    
  </>
);
}