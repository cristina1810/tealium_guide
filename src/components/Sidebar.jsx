import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Layers,
  Network,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

// ─── Datos ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { to: "/", icon: Home, label: "Página Principal", end: true },
];

const TEALIUM_IQ_ITEMS = [
  { to: "/iq/interfaz", label: "Interfaz y primeros pasos" },
  { to: "/iq/configuracion", label: "Configuración general" },
  { to: "/iq/snapchat", label: "Snapchat" },
  { to: "/iq/chatling", label: "Chatling" },
  { to: "/iq/ga4", label: "Google Analytics 4" },
];

const EVENTSTREAM_ITEMS = [
  { to: "/es/interfaz", label: "Interfaz y primeros pasos" },

  { to: "/es/configuracion", label: "Configuración general" },
  { to: "/es/snapchat", label: "Snapchat" },
  { to: "/es/chatling", label: "Chatling" },
  { to: "/es/ga4", label: "Google Analytics 4" },
];

// ─── Estilos ──────────────────────────────────────────────────────────────────

const activeClass =
  "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 " +
  "font-semibold rounded-lg flex items-center px-4 py-3 gap-x-3 " +
  "transition-all duration-300 ease-out";

const inactiveClass =
  "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 " +
  "hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors duration-200 " +
  "flex items-center px-4 py-3 gap-x-3 rounded-lg";

// ─── Componentes internos ─────────────────────────────────────────────────────

function NavItem({ to, icon: Icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
    >
      <Icon size={16} strokeWidth={1.75} />
      <span className="text-sm antialiased tracking-tight">{label}</span>
    </NavLink>
  );
}

function SubNavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-x-3 px-3 py-2 rounded-lg " +
            "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 " +
            "font-semibold transition-all duration-300 ease-out"
          : "flex items-center gap-x-3 px-3 py-2 rounded-lg " +
            "text-slate-500 dark:text-slate-400 " +
            "hover:text-slate-800 dark:hover:text-slate-200 " +
            "hover:bg-slate-200/50 dark:hover:bg-slate-800/50 " +
            "transition-colors duration-200"
      }
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-50" />
      <span className="text-xs antialiased tracking-tight">{label}</span>
    </NavLink>
  );
}

function CollapsibleSection({ icon: Icon, label, subItems }) {
  const location = useLocation();
  const anyActive = subItems.some((item) =>
    location.pathname.startsWith(item.to),
  );
  const [isOpen, setIsOpen] = useState(anyActive);

  // Abre automáticamente si se navega a una sub-ruta
  useEffect(() => {
    if (anyActive) setIsOpen(true);
  }, [location.pathname, anyActive]);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={
          (anyActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold"
            : "text-slate-600 dark:text-slate-400 " +
              "hover:text-slate-900 dark:hover:text-slate-200 " +
              "hover:bg-slate-200/50 dark:hover:bg-slate-800/50") +
          " w-full flex items-center justify-between " +
          "px-4 py-3 rounded-lg transition-all duration-200"
        }
      >
        <span className="flex items-center gap-x-3">
          <Icon size={16} strokeWidth={1.75} />
          <span className="text-sm antialiased tracking-tight">{label}</span>
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-1 ml-4 pl-3 border-l-2 border-slate-200 dark:border-slate-700 space-y-0.5 py-1">
          {subItems.map((item) => (
            <SubNavItem key={item.to} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="pt-6 pb-2">
      <span className="px-4 text-[10px] font-bold uppercase tracking-widest text-outline">
        {children}
      </span>
    </div>
  );
}

// ─── Sidebar principal ────────────────────────────────────────────────────────

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Panel lateral */}
      <aside
        className={`h-screen w-72 fixed left-0 top-0 overflow-y-auto
        bg-white/50 dark:bg-slate-900/80 backdrop-blur-xl
        flex flex-col py-10 px-8 gap-y-1 z-50
        transition-transform duration-300 ease-in-out  shadow-lg
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo + botón cerrar */}
        <div className="mb-10 px-2 flex items-start justify-between">
          <div>
            <h1 className="text-md font-bold tracking-tighter text-slate-900 dark:text-slate-100">
              Tealium Certification Guide
            </h1>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            title="Ocultar sidebar"
            className="mt-1 p-1.5 rounded-lg text-slate-400
            hover:text-slate-600 dark:hover:text-slate-200
            hover:bg-slate-200/60 dark:hover:bg-slate-800/60
            transition-colors duration-200"
          >
            <PanelLeftClose size={16} strokeWidth={1.75} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}

          <SectionLabel>Práctico</SectionLabel>

          <CollapsibleSection
            icon={Layers}
            label="Tealium iQ"
            subItems={TEALIUM_IQ_ITEMS}
          />
          <CollapsibleSection
            icon={Network}
            label="EventStream"
            subItems={EVENTSTREAM_ITEMS}
          />
        </nav>
      </aside>

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        title="Mostrar sidebar"
        className={`fixed left-4 top-6 z-40 p-2 rounded-lg
        bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-xl
        border border-slate-200 dark:border-slate-700 shadow-sm
        text-slate-600 dark:text-slate-400
        hover:text-slate-900 dark:hover:text-slate-100
        hover:bg-white dark:hover:bg-slate-800
        transition-all duration-300
        ${isOpen ? "opacity-0 pointer-events-none -translate-x-2" : "opacity-100 translate-x-0"}`}
      >
        <PanelLeftOpen size={18} strokeWidth={1.75} />
      </button>
    </>
  );
}
