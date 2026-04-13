import { useState } from "react";
import { Info } from "lucide-react";

/* ══════════════════════════════════
 SHARED COMPONENTS
══════════════════════════════════ */

function Toggle({ checked, onChange }) {
return (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
      checked ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${
        checked ? "translate-x-4" : "translate-x-0"
      }`}
    />
  </button>
);
}

function SelectField({ value, onChange, options, className = "w-52" }) {
return (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded px-2 py-1 text-xs appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center">
      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);
}

const SnapLogo = () => (
<div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-yellow-400">
    <path d="M12.166 2C9.315 2 7.08 3.53 5.94 5.846c-.494 1.013-.6 2.05-.6 3.116 0 .26.013.52.026.773-.21.117-.448.182-.694.182-.378 0-.73-.143-1.004-.4a.65.65 0 0 0-.44-.165c-.365 0-.728.286-.728.67 0 .61.91 1.014 1.6 1.196l.3.078c-.078.222-.286.69-.676.69-.117 0-.247-.04-.378-.117a.62.62 0 0 0-.313-.091c-.378 0-.638.3-.638.612 0 .235.13.456.39.586.585.3 1.378.547 2.34.716.065.013.117.065.13.13.195.99 1.1 1.534 2.22 1.534.143 0 .287-.013.43-.026.442.507 1.066.988 1.95 1.326.39.143.599.533.507.936-.078.364-.39.585-.78.585-.053 0-.105-.013-.157-.026-.585-.13-1.066-.195-1.508-.195-1.027 0-1.612.39-1.664.43a.69.69 0 0 0-.247.534c0 .364.286.663.65.663.09 0 .182-.026.273-.065.014 0 .612-.26 1.547-.26.195 0 .403.013.624.052.572.104 1.066.533 1.196 1.118.312 1.417 1.638 2.34 3.406 2.34 1.768 0 3.094-.923 3.406-2.34.13-.585.624-1.014 1.196-1.118.22-.04.43-.052.624-.052.935 0 1.534.26 1.547.26.091.04.182.065.273.065.364 0 .65-.3.65-.663a.69.69 0 0 0-.247-.534c-.052-.04-.637-.43-1.664-.43-.442 0-.923.065-1.508.195l-.156.026c-.39 0-.703-.22-.781-.585-.092-.403.117-.793.507-.936.884-.338 1.508-.819 1.95-1.326.143.013.287.026.43.026 1.118 0 2.025-.546 2.22-1.534.013-.065.065-.117.13-.13.962-.17 1.755-.416 2.34-.716.26-.13.39-.351.39-.586 0-.312-.26-.612-.638-.612a.62.62 0 0 0-.313.091c-.13.078-.26.117-.378.117-.39 0-.598-.468-.676-.69l.3-.078c.689-.182 1.6-.585 1.6-1.196 0-.384-.364-.67-.729-.67a.65.65 0 0 0-.44.165c-.273.257-.625.4-1.003.4-.247 0-.484-.065-.695-.182.013-.254.026-.514.026-.773 0-1.066-.105-2.103-.598-3.116C17.086 3.53 14.85 2 12 2h.166z" />
  </svg>
</div>
);

/* ══════════════════════════════════
 TAB 1 — CONFIGURATION
══════════════════════════════════ */
function ConfigurationTab() {
const [title, setTitle] = useState("Snap Pixel");
const [notes, setNotes] = useState("");
const [pixelId, setPixelId] = useState("");
const [genEventId, setGenEventId] = useState("False");
const [publishDev, setPublishDev] = useState(true);
const [publishQa, setPublishQa] = useState(true);
const [publishProd, setPublishProd] = useState(true);
const [publishCustom, setPublishCustom] = useState("");
const [bundleFlag, setBundleFlag] = useState(false);
const [tagTiming, setTagTiming] = useState("DOM Ready (default)");
const [sendFlag, setSendFlag] = useState(true);
const [syncLoad, setSyncLoad] = useState(false);
const [customScript, setCustomScript] = useState("");

const publishToggles = [
  { label: "Publish to DEV", val: publishDev, set: setPublishDev },
  { label: "Publish to QA", val: publishQa, set: setPublishQa },
  { label: "Publish to PROD", val: publishProd, set: setPublishProd },
];

return (
  <div className="flex">
    {/* ── Left ── */}
    <div className="flex-1 px-6 py-5 ">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Configuration</h2>

      <SectionTitle>Properties</SectionTitle>

      <Field label="Title">
        <input value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-64 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
        <Helper>Assign a unique name when using multiple tags by the same vendor.</Helper>
      </Field>

      <Field label="Notes">
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
          className="w-64 border border-gray-300 rounded px-2 py-1 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-blue-400" />
      </Field>

      <div className="mb-5">
        <BlueButton icon="code">Extract From Code</BlueButton>
      </div>

      <Field label="Pixel ID">
        <input value={pixelId} onChange={(e) => setPixelId(e.target.value)}
          className="w-64 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
        <Helper>Found in your Snapchat Ads Manager.</Helper>
      </Field>

      <Field label="Generate Event ID">
        <SelectField value={genEventId} onChange={setGenEventId}
          options={["False", "True"]} className="w-36" />
        <Helper>Automatically generate an Event ID for every Snap tracking event.</Helper>
      </Field>

      <SectionTitle className="mt-4">Publish Locations</SectionTitle>

      {publishToggles.map(({ label, val, set }) => (
        <div key={label} className="flex items-center gap-3 mb-3">
          <Toggle checked={val} onChange={set} />
          <span className="text-xs text-gray-600">{label}</span>
          <span className="text-xs text-gray-400">{val ? "On" : "Off"}</span>
        </div>
      ))}

      <Field label="Publish to Custom" className="mt-1">
        <SelectField value={publishCustom} onChange={setPublishCustom}
          options={[{ value: "", label: "Select..." }, "Custom Env 1", "Custom Env 2"]}
          className="w-64" />
      </Field>

      <div className="mt-3 mb-1 flex items-center gap-3">
        <Toggle checked={bundleFlag} onChange={setBundleFlag} />
        <span className="text-xs font-medium text-gray-600">Bundle Flag</span>
        <span className="text-xs text-gray-400">{bundleFlag ? "On" : "Off"}</span>
      </div>
      <p className="text-xs text-gray-400 mb-1">
        This flag determines if the tag code is bundled into using.js. This will reduce the number of server requests.
      </p>
      <p className="text-xs text-gray-400 mb-5">
        A full list of bundled tags is available in the Publish Settings dialog.
      </p>

      <SectionTitle>Advanced Settings</SectionTitle>

      <Field label="Tag Timing">
        <SelectField value={tagTiming} onChange={setTagTiming}
          options={["DOM Ready (default)", "Before Load Rules", "Page Bottom"]}
          className="w-52" />
        <Helper>
          Determines the timing of the tag firing. Pre-load tags fire immediately on page loads.
          DOM Ready tags wait to fire until the page HTML has been completely loaded by the browser (the default).
        </Helper>
      </Field>

      <div className="flex items-center gap-3 mb-1">
        <Toggle checked={sendFlag} onChange={setSendFlag} />
        <span className="text-xs font-medium text-gray-600">Send Flag</span>
        <span className="text-xs text-gray-400">{sendFlag ? "On" : "Off"}</span>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        This flag determines whether or not this library has event-level data sent to the tracking. The default for this config is yes.
      </p>

      <div className="flex items-center gap-3 mb-1">
        <Toggle checked={syncLoad} onChange={setSyncLoad} />
        <span className="text-xs font-medium text-gray-600">Synchronous Load Type</span>
        <span className="text-xs text-gray-400">{syncLoad ? "On" : "Off"}</span>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        This value is set when the library needs to be loaded synchronously.
      </p>

      <Field label="Custom Script Source">
        <input value={customScript} onChange={(e) => setCustomScript(e.target.value)}
          className="w-64 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
        <Helper>
          This value is set when the library that supports this tag is served from an alternate location.
          If you are using an absolute URL, it is recommended to use a relative path.
        </Helper>
      </Field>

      <div className="mt-5">
        <BlueButton icon="edit">Edit Template</BlueButton>
      </div>
    </div>

    {/* ── Right Sidebar ── */}
   
  </div>
);
}

/* ══════════════════════════════════
 TAB 2 — RULES AND EVENTS
══════════════════════════════════ */
const RULES_DATA = [
{ id: 1, name: "Add to cart", uid: 5 },
{ id: 2, name: "Search and search exist", uid: 6 },
{ id: 3, name: "TE - product_view", uid: 15 },
];

function RulesAndEventsTab() {
const [subTab, setSubTab] = useState("Rules");
const [search, setSearch] = useState("");
const [hoverDrop, setHoverDrop] = useState(null);

const filtered = RULES_DATA.filter((r) =>
  r.name.toLowerCase().includes(search.toLowerCase())
);

return (
  <div className="flex flex-col ">

    {/* ── Info box arriba del todo ── */}
    <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-100 mx-4 mt-4">
      <Info size={18} className="text-red-700 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-red-800 italic leading-relaxed">
       No debemos de modificar nada en esta sección
      </p>
    </div>

    {/* ── Contenido principal ── */}
    <div className="flex flex-1">

      {/* ── Left ── */}
      <div className="flex-1 border-r border-gray-200 px-6 py-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Set Rules and Events</h2>
        <p className="text-xs text-gray-500 mb-4">
          Tag will fire when the following rule and event conditions are true:
        </p>

        {/* Info box secundario */}
        <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded p-3 mb-5">
          <svg className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
          <p className="text-xs text-blue-700">
            By default, the tag will fire on all pages and when any configured event occurs.
          </p>
        </div>

        {/* Drop zone — INCLUDE */}
        <DropZone label="Drag a rule here" id="include" hoverDrop={hoverDrop} setHoverDrop={setHoverDrop} />

        <p className="text-xs font-semibold text-gray-500 my-4">AND NOT</p>

        {/* Drop zone — EXCLUDE */}
        <DropZone label="Drag a rule here" id="exclude" hoverDrop={hoverDrop} setHoverDrop={setHoverDrop} />
      </div>

      {/* ── Right ── */}
      <div className="w-80 shrink-0 px-4 py-5">
        {/* Sub-tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          {["Rules", "Events"].map((t) => (
            <button key={t} onClick={() => setSubTab(t)}
              className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
                subTab === t ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500 mr-auto">{filtered.length} Rules</span>
          <div className="relative">
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="border border-gray-300 rounded pl-6 pr-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 w-28" />
            <svg className="w-3 h-3 text-gray-400 absolute left-1.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <button className="flex items-center gap-0.5 text-blue-600 text-xs font-medium hover:text-blue-700">
            <span className="text-base leading-none">+</span> Add Rule
          </button>
        </div>

        {/* Table */}
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-t border-gray-200">
              <th className="text-left px-2 py-2 text-gray-500 font-medium">
                Name <span className="text-gray-400">↑</span>
              </th>
              <th className="text-right px-2 py-2 text-gray-500 font-medium">
                UID <span className="text-gray-400">↑</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rule) => (
              <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-xs select-none">⋮⋮</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <span className="text-blue-600 hover:underline cursor-pointer">{rule.name}</span>
                  </div>
                </td>
                <td className="px-2 py-2 text-right text-gray-500">{rule.uid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
);
}

function DropZone({ label, id, hoverDrop, setHoverDrop }) {
return (
  <div className="border-l-4 border-blue-500 pl-1">
    <div
      onDragOver={(e) => { e.preventDefault(); setHoverDrop(id); }}
      onDragLeave={() => setHoverDrop(null)}
      onDrop={() => setHoverDrop(null)}
      className={`border-2 border-dashed rounded mx-1 py-8 flex items-center justify-center text-xs text-gray-400 transition-colors cursor-default ${
        hoverDrop === id ? "border-blue-400 bg-blue-50 text-blue-400" : "border-gray-300"
      }`}
    >
      {label}
    </div>
  </div>
);
}

/* ══════════════════════════════════
 TAB 3 — MAPPED VARIABLES
══════════════════════════════════ */
const VARS_DATA = [
{ id: 1, variable: "search_keyword",    type: "UDO Variable", destination: "SEARCH.search_string",      destColor: "blue"   },
{ id: 2, variable: "product_id",        type: "UDO Variable", destination: "ADD_CART.item_ids",         destColor: "orange" },
{ id: 3, variable: "product_category",  type: "UDO Variable", destination: "ADD_CART.item_category",    destColor: "orange" },
{ id: 4, variable: "product_quantity",  type: "UDO Variable", destination: "ADD_CART.number_items",     destColor: "orange" },
{ id: 5, variable: "tealium_event",     type: "UDO Variable", destination: "add_to_cartADD_CART",       destColor: "blue"   },
{ id: 6, variable: "search_event",      type: "UDO Variable", destination: "search.SEARCH",             destColor: "blue"   },
{ id: 7, variable: "site_currency",     type: "UDO Variable", destination: "ADD_CART.currency",         destColor: "orange" },
{ id: 8, variable: "product_list_price",type: "UDO Variable", destination: "ADD_CART.price",            destColor: "orange" },
];

// Mapa de colores para la destination
const DEST_COLOR_MAP = {
blue:   { line: "bg-blue-400",   badge: "bg-blue-100 text-black-700"     },
orange: { line: "bg-blue-400", badge: "bg-orange-100 text-black-700" },
};
function MappedVariablesTab() {
const [vars, setVars] = useState(VARS_DATA);
const [filter, setFilter] = useState("Browser Height");

return (
  <div className="px-6 py-5">
    <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-100 my-4">
      <Info size={18} className="text-red-700 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-red-800 italic leading-relaxed">
       En azul: al seleccionar la variable que aparece en azul para mapear, vamos al apartado Event-specific parameters e introducimos el nombre de la variable tal y como aparece en la documentación.

Mapping de eventos — Add mapping - events


      </p>
    </div>
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold text-gray-700">Mapped Variables</h2>
      <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors">
        + Add Mapping
      </button>
    </div>

    {/* Filter */}
    <div className="mb-4">
      <SelectField value={filter} onChange={setFilter}
        options={["Browser Height", "All Variables", "Add to Cart"]}
        className="w-44" />
    </div>

    {/* Table */}
    <div className="border border-gray-200 rounded overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-2.5 text-gray-500 font-medium w-5/12">Variable</th>
            <th className="text-left px-4 py-2.5 text-gray-500 font-medium w-6/12">Destination</th>
            <th className="w-1/12" />
          </tr>
        </thead>
        <tbody>
          {vars.map((v) => (
            <tr key={v.id} className="border-b border-gray-100 hover:bg-gray-50 group">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-red-400 cursor-move select-none text-sm">≡</span>
                  <div>
                    <div className="font-medium text-gray-700">{v.variable}</div>
                    <div className="text-gray-400">{v.type}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2.5">
{(() => {
  const colors = DEST_COLOR_MAP[v.destColor] ?? DEST_COLOR_MAP.blue;
  return (
    <div className="flex items-center gap-2">
      <div className={`h-px w-10 ${colors.line} shrink-0`} />
      <span className={`${colors.badge} px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap`}>
        {v.destination}
      </span>
    </div>
  );
})()}
</td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button onClick={() => setVars(vars.filter((x) => x.id !== v.id))}
                    className="text-gray-400 hover:text-red-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}



/* ══════════════════════════════════
 SMALL HELPERS
══════════════════════════════════ */
function SectionTitle({ children, className = "" }) {
return (
  <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 ${className}`}>
    {children}
  </h3>
);
}

function Field({ label, children, className = "" }) {
return (
  <div className={`mb-4 ${className}`}>
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    {children}
  </div>
);
}

function Helper({ children }) {
return <p className="text-xs text-gray-400 mt-1">{children}</p>;
}

function BlueButton({ icon, children }) {
const icons = {
  code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>,
  edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>,
};
return (
  <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors">
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[icon]}</svg>
    {children}
  </button>
);
}

/* ══════════════════════════════════
 MAIN APP
══════════════════════════════════ */
const TABS = [
{ id: "configuration", label: "Configuration", component: ConfigurationTab },
{ id: "rules", label: "Rules and Events", component: RulesAndEventsTab },
{ id: "mapped", label: "Mapped Variables", component: MappedVariablesTab },

];

export default function SnapPixelApp() {
const [activeTab, setActiveTab] = useState("configuration");
const visited = { configuration: true, rules: activeTab !== "configuration", mapped: false };

const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component ?? ConfigurationTab;

return (
  <div className="flex items-start justify-center">
    <div className="w-full max-w-6xl bg-white shadow-md rounded-xl overflow-hidden">

      {/* ── Tab Nav ── */}
      <div className="flex border-b border-gray-200 bg-white">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDone = tab.id === "configuration" && activeTab !== "configuration";
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {isDone && (
                <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Content ── */}
      <ActiveComponent />
    </div>
  </div>
);
}