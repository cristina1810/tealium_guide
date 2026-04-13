import {
Search,
Tag,
Info,
ArrowRight,
Copy,
CheckCircle2,
Rocket,
} from 'lucide-react';
import AddToCart from '../components/AddToCart';
import SnapPixel from '../components/SnapPixel';
import SnapPixelApp from '../components/SnapPixel';

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
    <header className="max-w-5xl mx-auto mb-16 flex justify-between items-end">
      <div>
        <span className="my-4 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-slate-500 mb-2 block">
          Implementation Guide
        </span>
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-800 leading-tight">
          Snapchat
        </h2>
        <p className='text-red-500'> The Tealium eCommerce company wants to use Snapchat for campaigns.

Please configure the following:

Page Views
Searches
Add to Cart events
Configuration

Pixel ID

3130cbed-9440-4af6-9184-9c6ca93b8a02

Hints:

Review the Snapchat documentation to better understand the requirements of Searches and Add to Cart events: Event Mapping Recommendations(opens in a new tab)

Consider installing the Snap Pixel Helper for Chrome to help you visualize the data being sent: Snap Pixel Helper(opens in a new tab)

Terms that are searched by the user should be in lowercase, as you should have an extension set up to facilitate this

Adding products to the shopping cart will need to trigger an event in Tealium iQ before you can configure it in the Snap Pixel

When configuring the event, you’ll need to “scrape” the quantity from the page using Javascript:

[document.querySelector('#qty').value]</p>
      </div>
     
    </header>

    {/* ── Steps ── */}
    <section className="max-w-5xl mx-auto space-y-24">

   
      <article>
        <div className="flex items-start gap-12">
          <StepBadge number={1} active />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Evento Add to Cart</h3>
            <StepCard>
              <p className="text-slate-500 leading-relaxed mb-6">
                Texto y pautas
              </p>
              <AddToCart />
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
                Configura el tag de Snapchat en Tealium iQ siguiendo las mejores prácticas.
              </p>
              
              <SnapPixelApp />
            </StepCard>
          </div>
        </div>
      </article>

      
      
     

    </section>

    {/* ── Footer ── */}
    <footer className="max-w-4xl mx-auto  pt-12 items-start gap-8 opacity-60">
      
    </footer>
  </>
);
}