import { useState } from "react";
import { Info } from "lucide-react";

/* ══════════════════════════════════════════════════════
 RULES DATA
══════════════════════════════════════════════════════ */
const ALL_RULES = [
{ id: 5, name: "Add to cart", active: true },
{ id: 6, name: "Search and search exist", active: true },
{ id: 15, name: "TE - product_view", active: true },
];

const ruleDetail = {
id: 6,
name: "Search and search exist",
tags: 1,
conditions: [
  { variable: "js.search_keyword", operator: "DEFINED", value: "" },
  { type: "AND" },
  { variable: "js.search_results", operator: "GREATER_THAN", value: "0" },
],
};

/* ══════════════════════════════════════════════════════
 SHARED PRIMITIVES
══════════════════════════════════════════════════════ */
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
  code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
  edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
};
return (
  <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors">
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[icon]}</svg>
    {children}
  </button>
);
}

/* ══════════════════════════════════════════════════════
 RULES PANEL — SUB-COMPONENTS
══════════════════════════════════════════════════════ */
function DragHandle() {
return (
  <div className="flex flex-col gap-0.5 cursor-grab opacity-40 hover:opacity-70 shrink-0">
    {[0, 1].map((r) => (
      <div key={r} className="flex gap-0.5">
        {[0, 1].map((c) => (
          <div key={c} className="w-1 h-1 rounded-full bg-gray-500" />
        ))}
      </div>
    ))}
  </div>
);
}

function GreenDot() {
return <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />;
}

function RulePopover({ rule, onClose }) {
return (
  <div className="absolute left-2 top-full mt-1 z-50 w-72 bg-white border border-gray-200 rounded-lg shadow-xl">
    {/* Header */}
    <div className="flex items-start justify-between p-3 border-b border-gray-100">
      <div>
        <p className="text-sm font-semibold text-gray-800">{rule.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">Rule (UID: {rule.id})</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none ml-2">×</button>
    </div>
    {/* Body */}
    <div className="p-3">
      <div className="flex items-center gap-1.5 mb-3 text-sm text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span className="text-xs">{rule.tags} Tag</span>
      </div>
      <div className="border-l-2 border-blue-400 pl-3 space-y-1">
        {rule.conditions.map((cond, i) =>
          cond.type === "AND" ? (
            <p key={i} className="text-xs font-semibold text-gray-500">AND</p>
          ) : (
            <p key={i} className="text-xs text-gray-700">
              <span className="font-mono text-gray-600">{cond.variable}</span>{" "}
              <span className="font-semibold text-gray-800">{cond.operator}</span>
              {cond.value && <span className="ml-1 text-gray-600">{cond.value}</span>}
            </p>
          )
        )}
      </div>
    </div>
    <div className="flex justify-end px-3 pb-3">
      <button className="text-sm text-blue-500 hover:text-blue-700 font-medium">Edit</button>
    </div>
  </div>
);
}

function RuleChip({ rule, showPopover, onToggle, onRemove }) {
return (
  <div className="relative">
    <div
      onClick={onToggle}
      className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors border ${
        showPopover ? "bg-blue-50 border-blue-300" : "bg-blue-50 border-blue-100 hover:border-blue-300"
      }`}
    >
      <div className="flex items-center gap-2">
        <DragHandle />
        <GreenDot />
        <span className="text-xs font-medium text-blue-600">{rule.name}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-400">{rule.id}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="text-gray-300 hover:text-gray-500 text-base leading-none"
        >×</button>
      </div>
    </div>
    {showPopover && <RulePopover rule={ruleDetail} onClose={onToggle} />}
  </div>
);
}

function RulesDragZone({ id, active, onDragEnter, onDragLeave, onDrop }) {
return (
  <div
    onDragOver={(e) => { e.preventDefault(); onDragEnter(id); }}
    onDragLeave={() => onDragLeave()}
    onDrop={() => onDrop(id)}
    className={`border-2 border-dashed rounded py-5 text-center text-xs transition-colors ${
      active ? "border-blue-400 bg-blue-50 text-blue-400" : "border-gray-300 text-gray-400"
    }`}
  >
    Drag a rule here
  </div>
);
}

/* ══════════════════════════════════════════════════════
 TAB 2 — RULES AND EVENTS (integrated)
══════════════════════════════════════════════════════ */
function RulesAndEventsTab() {
const [subTab, setSubTab] = useState("Rules");
const [search, setSearch] = useState("");
const [sortDir, setSortDir] = useState("asc");
const [hoveredZone, setHoveredZone] = useState(null);
const [popoverRuleId, setPopoverRuleId] = useState(6);
const [activeRules, setActiveRules] = useState([
  { id: 6, name: "Search and search exist" },
]);

const removeRule = (id) => {
  setActiveRules((prev) => prev.filter((r) => r.id !== id));
  if (popoverRuleId === id) setPopoverRuleId(null);
};

const togglePopover = (id) =>
  setPopoverRuleId((prev) => (prev === id ? null : id));

const filteredList = ALL_RULES.filter((r) =>
  r.name.toLowerCase().includes(search.toLowerCase())
).sort((a, b) =>
  sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
);

return (
  <div className="flex flex-col">
   
    {/* ── Main row ── */}
    <div className="flex flex-1 min-h-0">

      {/* ════ LEFT — builder ════ */}
      <div className="flex-1 border-r border-gray-200 px-6 py-5 overflow-y-auto">
        <h2 className="text-sm font-semibold text-gray-800 mb-1">Set Rules and Events</h2>
        <div className="border-b border-gray-200 mb-4" />
        <p className="text-xs text-gray-500 mb-5">
          Tag will fire when the following rule and event conditions are true:
        </p>

        {/* AND block */}
        <div className="border-l-4 border-blue-500 bg-white rounded-r-lg border border-gray-200 p-4 mb-4">
          <div className="space-y-2">
            {activeRules.map((rule, idx) => (
              <div key={rule.id}>
                {idx > 0 && (
                  <div className="flex items-center gap-2 my-2">
                    <span className="text-xs font-bold text-gray-400">OR</span>
                    <div className="flex-1 border-t border-dashed border-gray-200" />
                  </div>
                )}
                <RuleChip
                  rule={rule}
                  showPopover={popoverRuleId === rule.id}
                  onToggle={() => togglePopover(rule.id)}
                  onRemove={() => removeRule(rule.id)}
                />
              </div>
            ))}

            {/* OR separator + drop zone */}
            {activeRules.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-bold text-gray-400">OR</span>
                <div className="flex-1 border-t border-dashed border-gray-200" />
              </div>
            )}
            <RulesDragZone
              id="or-zone"
              active={hoveredZone === "or-zone"}
              onDragEnter={setHoveredZone}
              onDragLeave={() => setHoveredZone(null)}
              onDrop={() => setHoveredZone(null)}
            />

            {/* AND separator + drop zone */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-gray-400">AND</span>
              <div className="flex-1 border-t border-dashed border-gray-200" />
            </div>
            <RulesDragZone
              id="and-zone"
              active={hoveredZone === "and-zone"}
              onDragEnter={setHoveredZone}
              onDragLeave={() => setHoveredZone(null)}
              onDrop={() => setHoveredZone(null)}
            />
          </div>
        </div>

        {/* + AND button */}
        <button className="flex items-center gap-1.5 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 mb-5 transition-colors">
          <span className="text-blue-500 font-bold text-sm">+</span> AND
        </button>

        {/* AND NOT */}
        <p className="text-xs font-semibold text-gray-600 mb-2">AND NOT</p>
        <div className="border-l-4 border-blue-500 rounded-r-lg border border-gray-200 p-4">
          <RulesDragZone
            id="not-zone"
            active={hoveredZone === "not-zone"}
            onDragEnter={setHoveredZone}
            onDragLeave={() => setHoveredZone(null)}
            onDrop={() => setHoveredZone(null)}
          />
        </div>
      </div>

      {/* ════ RIGHT — rules list ════ */}
      <div className="w-80 shrink-0 px-4 py-5">

        {/* Sub-tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          {["Rules", "Events"].map((t) => (
            <button
              key={t}
              onClick={() => setSubTab(t)}
              className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
                subTab === t
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500 mr-auto whitespace-nowrap">
            {filteredList.length} Rules
          </span>
          <div className="relative">
            <svg className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="border border-gray-300 rounded pl-6 pr-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 w-28"
            />
          </div>
          <button className="flex items-center gap-0.5 border border-blue-500 text-blue-600 hover:bg-blue-50 text-xs font-medium px-2 py-1 rounded whitespace-nowrap transition-colors">
            <span className="text-sm leading-none font-bold">+</span> Add Rule
          </button>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded overflow-hidden">
          {/* Header */}
          <div className="flex items-center bg-gray-50 px-3 py-2 border-b border-gray-200">
            <div className="w-8" />
            <div className="w-5" />
            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="flex-1 flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-700"
            >
              Name
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 w-10 justify-end">
              UID
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </div>

          {/* Rows */}
          {filteredList.map((rule) => {
            const isActive = activeRules.some((r) => r.id === rule.id);
            return (
              <div
                key={rule.id}
                draggable
                className={`flex items-center px-3 py-2.5 border-b border-gray-100 last:border-0 cursor-grab hover:bg-gray-50 transition-colors ${
                  isActive ? "bg-blue-50" : ""
                }`}
              >
                <div className="w-8 flex justify-center">
                  <DragHandle />
                </div>
                <div className="w-5 flex justify-center">
                  <GreenDot />
                </div>
                <span
                  className={`flex-1 text-xs font-medium truncate ${
                    isActive ? "text-blue-600" : "text-blue-500 hover:text-blue-700"
                  }`}
                >
                  {rule.name}
                </span>
                <span className="text-xs text-gray-400 w-10 text-right">{rule.id}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
  </div>
);
}

/* ══════════════════════════════════════════════════════
 TAB 1 — CONFIGURATION
══════════════════════════════════════════════════════ */
function ConfigurationTab() {
const [title, setTitle] = useState("Chatling");
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
  { label: "Publish to DEV",  val: publishDev,  set: setPublishDev },
  { label: "Publish to QA",   val: publishQa,   set: setPublishQa },
  { label: "Publish to PROD", val: publishProd, set: setPublishProd },
];

return (
  <div className="px-6 py-5">
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
        DOM Ready tags wait to fire until the page HTML has been completely loaded by the browser.
      </Helper>
    </Field>

    <div className="flex items-center gap-3 mb-1">
      <Toggle checked={sendFlag} onChange={setSendFlag} />
      <span className="text-xs font-medium text-gray-600">Send Flag</span>
      <span className="text-xs text-gray-400">{sendFlag ? "On" : "Off"}</span>
    </div>
    <p className="text-xs text-gray-400 mb-4">
      This flag determines whether or not this library has event-level data sent to the tracking.
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
      </Helper>
    </Field>

    <div className="mt-5">
      <BlueButton icon="edit">Edit Template</BlueButton>
    </div>
    
  </div>
);
}

/* ══════════════════════════════════════════════════════
 TAB 3 — MAPPED VARIABLES
══════════════════════════════════════════════════════ */
const VARS_DATA = [
{ id: 1, variable: "Custom Value", type: "2367823816",          destination: "attribute.data-id", destColor: "blue" },
{ id: 2, variable: "Custom Value", type: "chatling-embed-script", destination: "attribute.id",    destColor: "blue" },
];
const DEST_COLOR_MAP = {
blue:   { line: "bg-blue-400",   badge: "bg-blue-100 text-blue-800" },
orange: { line: "bg-orange-400", badge: "bg-orange-100 text-orange-800" },
};

function MappedVariablesTab() {
const [vars, setVars] = useState(VARS_DATA);
const [filter, setFilter] = useState("Browser Height");

return (
  <div className="px-6 py-5">
    <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-100 mb-5">
      <Info size={16} className="text-red-600 mt-0.5 shrink-0" />
      <p className="text-xs text-red-700 italic leading-relaxed">
        En azul: al seleccionar la variable que aparece en azul para mapear, vamos al apartado
        Event-specific parameters e introducimos el nombre de la variable tal y como aparece en
        la documentación. Mapping de eventos — Add mapping - events
      </p>
    </div>

    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold text-gray-700">Mapped Variables</h2>
      <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors">
        + Add Mapping
      </button>
    </div>

    <div className="mb-4">
      <SelectField value={filter} onChange={setFilter}
        options={["Browser Height", "All Variables", "Add to Cart"]}
        className="w-44" />
    </div>

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
          {vars.map((v) => {
            const colors = DEST_COLOR_MAP[v.destColor] ?? DEST_COLOR_MAP.blue;
            return (
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
                  <div className="flex items-center gap-2">
                    <div className={`h-px w-10 ${colors.line} shrink-0`} />
                    <span className={`${colors.badge} px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap`}>
                      {v.destination}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => setVars(vars.filter((x) => x.id !== v.id))}
                      className="text-gray-400 hover:text-red-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    
  </div>
);
}

/* ══════════════════════════════════════════════════════
 ROOT APP
══════════════════════════════════════════════════════ */
const TABS = [
{ id: "configuration", label: "Configuration",   component: ConfigurationTab  },
{ id: "rules",         label: "Rules and Events", component: RulesAndEventsTab },
{ id: "mapped",        label: "Mapped Variables", component: MappedVariablesTab },
];

export default function Chatling() {
const [activeTab, setActiveTab] = useState("configuration");
const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component ?? ConfigurationTab;

return (
  <div className="flex items-start justify-center min-h-screen bg-gray-100 p-6">
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
                  <path fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd" />
                </svg>
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      <ActiveComponent />
    </div>
  </div>
);
}