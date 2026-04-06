import {
LayoutDashboard,
Tag,
ListFilter,
Puzzle,
Brain,
CheckCircle2,
} from 'lucide-react';

/* ─── Design Tokens (sin modificar tailwind.config.js) ─────────────── */
const colors = {
primary:                '#095fae',
secondary:              '#546073',
surface:                '#f7fafc',
surfaceContainerLowest: '#ffffff',
surfaceContainerLow:    '#eff4f7',
surfaceContainerHigh:   '#dfeaef',
onSurface:              '#283439',
onSurfaceVariant:       '#546166',
outlineVariant:         '#a7b4ba',
secondaryContainer:     '#d8e3fa',
secondaryDim:           '#495467',
onPrimaryFixedVariant:  '#005cab',
onPrimary:              '#f6f7ff',
};

const atelierGradient = {
background: 'linear-gradient(135deg, #095fae 0%, #00539b 100%)',
};

/* ─── Sub-components ────────────────────────────────────────────────── */
const InfoChip = ({ title, body }) => (
<div className="p-5 rounded" style={{ backgroundColor: colors.surfaceContainerLow }}>
  <h4
    className="text-xs font-bold uppercase tracking-widest mb-2"
    style={{ color: colors.primary }}
  >
    {title}
  </h4>
  <p className="text-sm" style={{ color: colors.onSurface }}>{body}</p>
</div>
);

const DataLayerStep = ({ num, text }) => (
<div className="flex gap-4">
  <span className="text-2xl font-light shrink-0" style={{ color: colors.outlineVariant }}>
    {num}
  </span>
  <p className="text-sm" style={{ color: colors.onSurface }}>{text}</p>
</div>
);

/* ─── Page ──────────────────────────────────────────────────────────── */
const InterfaceIQ = () => {
return (
  <main
    className=" min-h-screen px-14 py-20 flex flex-col max-w-7xl"
    style={{ backgroundColor: colors.surface }}
  >
    {/* ── Header ── */}
    <header className="mb-16">
      <div className="flex justify-between items-end mb-4">
        <span
          className="font-medium text-[0.6875rem] uppercase tracking-wider"
          style={{ color: colors.secondary }}
        >
          Módulo de Arquitectura
        </span>
        <span
          className="font-medium text-[0.6875rem] uppercase tracking-wider"
          style={{ color: colors.secondary }}
        >
          Paso 03 / 12
        </span>
      </div>
      <h2
        className="text-5xl font-extrabold tracking-tight mb-6 leading-tight"
        style={{ color: colors.onSurface }}
      >
        Navegación por la Interfaz de Tealium iQ
      </h2>
      <p className="text-lg max-w-3xl leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
        Domine los componentes centrales del Tag Management System. Esta guía técnica desglosa
        la anatomía de Tealium iQ para asegurar una implementación precisa y eficiente.
      </p>
    </header>

    {/* ── Bento Grid ── */}
    <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">

      {/* Dashboard Card — spans 8 */}
      <div
        className="md:col-span-8 p-10 rounded-lg flex flex-col justify-between"
        style={{ backgroundColor: colors.surfaceContainerLowest }}
      >
        <div>
          <div className="flex items-center gap-3 mb-6">
            <LayoutDashboard size={32} style={{ color: colors.primary }} />
            <h3 className="text-2xl font-bold tracking-tight" style={{ color: colors.onSurface }}>
              Dashboard Central
            </h3>
          </div>
          <p className="text-base leading-relaxed mb-8" style={{ color: colors.onSurfaceVariant }}>
            El centro neurálgico donde visualiza el estado global de su perfil. Desde aquí puede
            acceder a versiones guardadas, historial de publicaciones y métricas de salud de las
            etiquetas en tiempo real.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <InfoChip
              title="Punto Clave"
              body="Control de versiones asincrónico para múltiples entornos (Dev, QA, Prod)."
            />
            <InfoChip
              title="Tip de Examen"
              body="Identifique la diferencia entre 'Save' y 'Publish' para preguntas de flujo de trabajo."
            />
          </div>
        </div>
      </div>

      {/* Tags Card — spans 4 */}
      <div
        className="md:col-span-4 p-10 rounded-lg border-l-4"
        style={{
          backgroundColor: colors.surfaceContainerLow,
          borderLeftColor: colors.primary,
        }}
      >
        <Tag size={32} className="mb-6" style={{ color: colors.primary }} />
        <h3 className="text-xl font-bold mb-4" style={{ color: colors.onSurface }}>
          Tags (Etiquetas)
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: colors.onSurfaceVariant }}>
          Contenedores de código de terceros. Tealium ofrece una biblioteca de más de 1000
          integraciones llave en mano.
        </p>
        <ul className="space-y-3">
          {['MarketPlace integrations', 'Custom Containers'].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs font-medium"
              style={{ color: colors.onSurface }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                style={{ backgroundColor: colors.primary }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Load Rules Card — spans 4 */}
      <div
        className="md:col-span-4 p-10 rounded-lg"
        style={{ backgroundColor: colors.surfaceContainerLowest }}
      >
        <ListFilter size={32} className="mb-6" style={{ color: colors.secondary }} />
        <h3 className="text-xl font-bold mb-4" style={{ color: colors.onSurface }}>
          Load Rules
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: colors.onSurfaceVariant }}>
          La lógica condicional que determina cuándo y dónde se activan las etiquetas
          basándose en datos del Data Layer.
        </p>
        <div
          className="p-4 rounded border"
          style={{
            backgroundColor: `${colors.secondaryContainer}4D`, // ~30% opacity
            borderColor: `${colors.secondary}1A`,               // ~10% opacity
          }}
        >
          <p
            className="text-[11px] font-bold uppercase mb-1"
            style={{ color: colors.secondary }}
          >
            Concepto Crítico
          </p>
          <p className="text-xs italic" style={{ color: colors.onSurface }}>
            "All Pages" es la regla por defecto para etiquetas globales.
          </p>
        </div>
      </div>

      {/* Extensions Card — spans 8 */}
      <div
        className="md:col-span-8 p-10 rounded-lg flex gap-10 items-center"
        style={{ backgroundColor: colors.surfaceContainerHigh }}
      >
        <div className="flex-1">
          <Puzzle size={40} className="mb-6" style={{ color: colors.primary }} />
          <h3 className="text-2xl font-bold mb-4" style={{ color: colors.onSurface }}>
            Extensions (Extensiones)
          </h3>
          <p className="text-base leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
            Transforme, limpie y manipule sus datos sin necesidad de escribir JavaScript
            complejo. Las extensiones permiten modificar valores del Data Layer antes de que
            se envíen a las etiquetas.
          </p>
        </div>
        <div className="w-48 hidden lg:block shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfPjEQdXY798PIj-UjbCQdRxRRpImEcnMI_9Mh-eMqtyRzh4nyUbNbKV-7BxopYHDoX2s1PggosLnHo03_d2CmNg9vXzPA6_pqmIhDjcvQK2Czi0zLHVbu-pg2sNEwaH4YDnUoe_Z1I_EaB0N4K1c9Ritm0kWZqxIa2-9KdkLWzyipW52W-9l2dIh4e6ufsc6IXso2FUBB61wdHisDkePYDIrVXCYNEDcBVIih9s2aDPltVF8Prf1JYb_68vfILqUmb9zAbEG7i7or"
            alt="Abstracción técnica"
            className="rounded-lg object-cover h-40 w-full opacity-60 mix-blend-multiply"
          />
        </div>
      </div>

      {/* Data Layer Card — spans 12 */}
      <div
        className="md:col-span-12 p-10 rounded-lg flex flex-col md:flex-row gap-12 items-start"
        style={{ backgroundColor: colors.surfaceContainerLowest }}
      >
        {/* Left column */}
        <div className="md:w-1/3">
          <h3
            className="text-3xl font-black tracking-tighter uppercase mb-2"
            style={{ color: colors.onSurface }}
          >
            Data Layer
          </h3>
          <p className="text-sm font-semibold mb-6" style={{ color: colors.primary }}>
            LA FUNDACIÓN DE TODO
          </p>
          <div className="space-y-4">
            <DataLayerStep num="01" text="Variables de UDO (Universal Data Object)" />
            <DataLayerStep num="02" text="Variables de Query String y Cookies" />
            <DataLayerStep num="03" text="Variables de Meta Tags y DOM" />
          </div>
        </div>

        {/* Right column */}
        <div
          className="md:w-2/3 p-8 rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <h4
            className="text-base font-bold mb-4 flex items-center gap-2"
            style={{ color: colors.onSurface }}
          >
            <Brain size={20} style={{ color: colors.primary }} />
            Estrategia de Certificación
          </h4>
          <p className="text-sm leading-relaxed mb-6" style={{ color: colors.onSurfaceVariant }}>
            El Data Layer es el primer paso en la ejecución de Tealium. Casi todas las
            preguntas del examen técnico giran en torno a cómo el Data Layer alimenta a las
            Load Rules y Tags. Recuerde la jerarquía: El UDO siempre es prioritario sobre las
            variables capturadas del DOM.
          </p>
          <button
            className="px-6 py-3 rounded-md text-sm font-bold tracking-tight hover:opacity-90 transition-opacity"
            style={{ ...atelierGradient, color: colors.onPrimary }}
          >
            Ver Guía de Implementación UDO
          </button>
        </div>
      </div>
    </section>

    {/* ── Footer ── */}
    <footer
      className="mt-auto pt-16 flex flex-col md:flex-row justify-between items-center gap-6"
      style={{
        borderTop: `1px solid ${colors.surfaceContainerHigh}`,
        color: colors.secondaryDim,
      }}
    >
      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
            Última Actualización
          </span>
          <span className="text-sm font-medium">Octubre 2023 - v4.52</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
            Estado de Progreso
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Navegación Completada</span>
            <CheckCircle2 size={18} className="text-green-600" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="text-sm font-bold px-4 py-2 rounded transition-colors hover:bg-[#dfeaef]"
          style={{ color: colors.onPrimaryFixedVariant }}
        >
          Anterior
        </button>
        <button
          className="px-8 py-2 rounded font-bold text-sm hover:opacity-90 transition-opacity"
          style={{ ...atelierGradient, color: colors.onPrimary }}
        >
          Siguiente Lección
        </button>
      </div>
    </footer>
  </main>
);
};

export default InterfaceIQ;