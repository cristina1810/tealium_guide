import { useState, useCallback } from "react";
import {
FileText,
Search,
Filter,
Edit3,
Plus,
ChevronDown,
Info,
ChevronRight,
Upload,
List,
Menu,
Cookie,
Clipboard,
ClipboardCheck,
Box
} from "lucide-react";
import { variables } from "../js/data_layer";

// Formato correcto según spec de Tealium iQ Bulk Import
// Campos: Source, Type, Alias (opcional), Notes (opcional)
// Tipos válidos: UDO Variable | First Party Cookie | JavaScript Variable |
//                Meta Data Element | Querystring Parameter |
//                Local Storage Variable | Session Storage Variable
const TYPE_TO_CSV = {
"Universal Data Object": "UDO Variable",
"Cookie Value":          "First Party Cookie",
};

const initialData = variables.map((v, i) => ({
id: i + 1,
name: v.name,
type: v.type,
isDom:    v.type === "DOM Variable",
isCookie: v.type === "Cookie Value",
}));

const TYPE_STYLES = {
"DOM Variable": {
  icon:      <Box size={15} />,
  iconClass: "text-yellow-700",
  badge:     "text-gray-400",
},
"Universal Data Object": {
  icon:      <Menu size={15} strokeWidth={5} />,
  iconClass: "text-pink-800",
  badge:     "text-gray-400",
},
"Cookie Value": {
  icon:      <Cookie size={15} />,
  iconClass: "text-orange-600",
  badge:     "text-gray-400",
},
};

const RowIcon = ({ type }) => {
const config = TYPE_STYLES[type] ?? TYPE_STYLES["Universal Data Object"];
return (
  <div className={`w-6 h-6 flex items-center justify-center ${config.iconClass}`}>
    {config.icon}
  </div>
);
};

const TypeBadge = ({ type }) => {
const config = TYPE_STYLES[type] ?? TYPE_STYLES["Universal Data Object"];
return (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.badge}`}>
    {type}
  </span>
);
};

const Toast = ({ message, type }) => (
<div
  className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2
    px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-bounce-once
    ${type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
>
  {type === "success" ? <ClipboardCheck size={15} /> : null}
  {message}
</div>
);

export default function DataLayer() {
const [search, setSearch]         = useState("");
const [selected, setSelected]     = useState([]);
const [dropdownOpen, setDropdown] = useState(false);
const [copied, setCopied]         = useState(false);
const [toast, setToast]           = useState(null);

// ── Genera CSV con el formato correcto de Tealium iQ ──────────────────────
// Formato: Source,Type  (sin cabecera, una variable por línea)
const generateCsv = useCallback(() => {
  return initialData
    .filter((item) => !item.isDom)
    .map((item) => {
      const csvType = TYPE_TO_CSV[item.type] ?? "UDO Variable";
      return `${item.name},${csvType}`;
    })
    .join("\n");
}, []);

// ── Copia directamente al portapapeles ────────────────────────────────────
const handleCopyCsv = async () => {
  try {
    const csv = generateCsv();
    await navigator.clipboard.writeText(csv);

    setCopied(true);
    triggerToast(
      `${initialData.filter((i) => !i.isDom).length} variables copiadas al portapapeles`,
      "success"
    );
    setTimeout(() => setCopied(false), 2500);
  } catch {
    triggerToast("Error al copiar. Inténtalo de nuevo.", "error");
  }
};

const triggerToast = (message, type) => {
  setToast({ message, type });
  setTimeout(() => setToast(null), 3000);
};

// ── Tabla ─────────────────────────────────────────────────────────────────
const filtered = initialData.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
);

const selectableItems = filtered.filter((item) => !item.isDom);

const toggleSelect = (id) =>
  setSelected((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  );

const toggleAll = () => {
  const ids    = selectableItems.map((item) => item.id);
  const allSel = ids.every((id) => selected.includes(id));
  setSelected(allSel ? [] : ids);
};

const allSelected  = selectableItems.length > 0 && selectableItems.every((i) => selected.includes(i.id));
const someSelected = selectableItems.some((i) => selected.includes(i.id)) && !allSelected;
const nonDomCount  = initialData.filter((i) => !i.isDom).length;

return (
  <div className="min-h-screen font-sans border rounded-lg border-gray-100 text-sm">
    {/* Toast */}
    {toast && <Toast message={toast.message} type={toast.type} />}

    {/* Top Navigation Bar */}
    <div className="bg-white px-4 py-3 flex items-center gap-2">
      <div className="flex items-center gap-1">
        <span className="font-medium text-gray-700 ml-1">iQ Tag Management</span>
      </div>
      <ChevronRight size={14} className="text-gray-400" />
      <span className="text-gray-700 font-medium flex items-center gap-1">
        Data Layer
        <Info size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
      </span>
    </div>

    {/* Main Content */}
    <div className="bg-white ">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        {/* Search */}
        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded text-sm
                       focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* ── Copy CSV ─────────────────────────────────────────────────── */}
          <button
            onClick={handleCopyCsv}
            title={`Copiar ${nonDomCount} variables al portapapeles (formato Tealium iQ Bulk Import)`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium
              border transition-all duration-200
              ${copied
                ? "border-green-500 bg-green-500 text-white"
                : "border-dashed border-green-400 bg-green-50 text-green-700 hover:bg-green-100"
              }`}
          >
            {copied ? (
              <>
                <ClipboardCheck size={13} />
                ¡Copiado!
              </>
            ) : (
              <>
                <Clipboard size={13} />
                Copiar CSV
                <span className="ml-0.5 bg-green-200 text-green-800 text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {nonDomCount}
                </span>
              </>
            )}
          </button>

          {/* Filter */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={13} />
            Filter
            <ChevronDown size={12} />
          </button>

          {/* Edit All */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Edit3 size={13} />
            Edit All
          </button>

          {/* Add Variable Dropdown */}
          <div className="relative">
            <div className="flex">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-l text-sm hover:bg-blue-700 transition-colors">
                <Plus size={14} />
                Add Variable
              </button>
              <button
                onClick={() => setDropdown(!dropdownOpen)}
                className="px-2 py-1.5 bg-blue-600 text-white rounded-r border-l border-blue-500 hover:bg-blue-700 transition-colors"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg z-10">
                <button
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdown(false)}
                >
                  <Upload size={14} className="text-gray-500" />
                  Bulk Import From CSV...
                </button>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdown(false)}
                >
                  <List size={14} className="text-gray-500" />
                  Add Common Variables...
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="w-12 px-4 py-2.5 text-left">
              <input
              disabled
                type="checkbox"
                checked={allSelected}
                ref={(el) => { if (el) el.indeterminate = someSelected; }}
                onChange={toggleAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-56">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr
              key={item.id}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selected.includes(item.id) ? "bg-blue-50 hover:bg-blue-50" : ""
              }`}
            >
              <td className="px-4 py-3">
                {item.isDom ? (
                  <div className="flex items-center gap-1 pl-5">
                    <RowIcon type={item.type} />
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" disabled
                    />
                    <RowIcon type={item.type} />
                  </div>
                )}
              </td>
              <td className="px-3 py-3">
                <span className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                  {item.name}
                </span>
              </td>
              <td className="px-3 py-3">
                <TypeBadge type={item.type} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Search size={32} className="mb-2 opacity-30" />
          <p className="text-sm">No variables found matching your search.</p>
        </div>
      )}

      
    </div>
  </div>
);
}