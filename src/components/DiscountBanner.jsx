import { useState } from "react";
import Toggle from "./UI/Toggle";
import Delete from "./UI/Delete";
import Duplicate from "./UI/Duplicate";
import ViewHisChange from "./UI/ViewHisChange";
import ButtonAdd from "./UI/ButtonAdd";
import ButtonMinus from "./UI/ButtonMinus";
import { Info } from "lucide-react";

/* ══════════════════════════════════
 MICRO COMPONENTS
══════════════════════════════════ */
function Chevron() {
  return (
    <svg
      className="w-3 h-3 text-gray-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function Select({ value, onChange, options, className = "w-40" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-2 py-1 text-xs appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-300 pr-6"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center">
        <Chevron />
      </div>
    </div>
  );
}

/* ══════════════════════════════════
 CODE EDITOR
══════════════════════════════════ */
function CodeEditor({ value, onChange }) {
  const [copied, setCopied] = useState(false);
  const lineCount = value.split("\n").length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="border border-gray-300 rounded overflow-hidden">
      {/* ── Header bar con botón copiar ── */}
      <div className="flex items-center justify-end bg-gray-100 border-b border-gray-200 px-2 py-1">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-700 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              {/* Check icon */}
              <svg
                className="w-3.5 h-3.5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              {/* Copy icon */}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* ── Editor ── */}
      <div className="flex font-mono text-xs bg-white">
        <div className="bg-gray-100 border-r border-gray-200 px-2 pt-2 text-gray-400 select-none text-right min-w-[2.2rem] leading-5">
          {Array.from({ length: Math.max(lineCount, 2) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="flex-1 p-2 resize-none focus:outline-none text-blue-600 bg-white leading-5 min-h-[100px] text-xs"
        />
      </div>
      <div className="h-2.5 bg-gray-100 border-t border-gray-200 flex items-center">
        <div className="ml-4 w-16 h-1.5 bg-gray-400 rounded-full opacity-40" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════
 MAIN COMPONENT
══════════════════════════════════ */
const INIT_CODE = `<div style="width:100%; background:#794896; color:white; padding:10px; margin-top:10px; text-align:center;">Get 10% off for purchases above <strong>130.00</strong>.</div>`;
const INIT_CONDITIONS = [
  { id: 1, variable: "page_type (is)", operator: "equals", value: "product" },
  {
    id: 2,
    variable: "product_list_price (is)",
    operator: "greater than",
    value: "130",
  },
];

export default function DiscountBanner() {
  // Form state
  const [title, setTitle] = useState("Discount banner");
  const [scope, setScope] = useState("DOM Ready Extensions");
  const [occurrence, setOccurrence] = useState("Run Once");
  const [elementType, setElementType] = useState("xPath");
  const [identifier, setIdentifier] = useState("div.breadcrumbs");
  const [position, setPosition] = useState("Before Node");
  const [code, setCode] = useState(INIT_CODE);
  const [conditions, setConditions] = useState(INIT_CONDITIONS);
  const [nextId, setNextId] = useState(3);
  const [publishProd, setPublishProd] = useState(true);
  const [publishQA, setPublishQA] = useState(true);
  const [publishDev, setPublishDev] = useState(true);
  const [rowChecked, setRowChecked] = useState(false);

  const addCondition = () => {
    setConditions([
      ...conditions,
      { id: nextId, variable: "page_type (is)", operator: "equals", value: "" },
    ]);
    setNextId((n) => n + 1);
  };
  const removeCondition = (id) =>
    conditions.length > 1 &&
    setConditions(conditions.filter((c) => c.id !== id));
  const updateCond = (id, field, val) =>
    setConditions(
      conditions.map((c) => (c.id === id ? { ...c, [field]: val } : c)),
    );

  return (
    <div className="border rounded-lg border-gray-100 bg-white font-sans text-xs">
      {/* ══ TABLE ROW ══ */}
      <div className="flex items-center border-b border-gray-300 px-4 py-2 bg-gray-50/50">
        {/* Toggle */}
        <div className="me-4">
          <Toggle />
        </div>
        {/* Título */}
        <div className="flex-1 text-sm font-medium text-gray-800">
          Discount banner
        </div>

        {/* Type */}
        <div className="w-40 text-sm text-gray-600">Content Modification</div>

        {/* Scope */}
        <div className="w-40 text-sm text-gray-600">DOM Ready Extensions</div>
      </div>

      {/* ══ DETAIL PANEL ══ */}
      <div className="flex">
        {/* ── LEFT SIDEBAR ── */}
        <div className="w-52 bg-white border-r border-gray-200  p-3 flex flex-col gap-1">
          <Delete />
          <Duplicate />
          <ViewHisChange />

          <div className="flex items-center gap-1.5 mt-4 mb-1 flex-wrap">
            <span className="text-gray-600 font-medium">Labels</span>
          </div>
          <p className="text-gray-400 mb-4 leading-relaxed">
            There are no labels assigned
          </p>

          <h4 className="font-semibold text-gray-600 mb-1">Description</h4>
          <p className="text-gray-400 leading-relaxed">
            Use this extension to change the content of an HTML element. This
            can be used to show A/B content based on a condition.
          </p>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 px-8 py-5 overflow-y-auto">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Title</label>
            <input
              value={title}
              className="border border-gray-300 rounded px-2 py-1.5 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          {/* Scope */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Scope</label>
            <div className="flex items-center gap-3">
              <Select
                value={scope}
                options={["DOM Ready Extensions"]}
                className="w-52"
              />
              <button className="text-blue-500 hover:underline whitespace-nowrap">
                Edit Load Order...
              </button>
            </div>
          </div>

          {/* Occurrence */}
          <div className="mb-5">
            <label className="block text-gray-500 mb-1.5">Occurrence</label>
            <div className="flex flex-col gap-1.5">
              {["Run Always", "Run Once"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer text-gray-500"
                >
                  <input
                    type="radio"
                    name="occ"
                    value={opt}
                    checked={occurrence === opt}
                    onChange={() => setOccurrence(opt)}
                    className="accent-blue-500"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* Configuration label */}
          <p className="text-gray-500 mb-2">Configuration</p>

          {/* ── Configuration box ── */}
          <div className="border border-gray-200 rounded relative mb-6">
            {/* − + buttons top right */}
            <div className="absolute top-2 right-2 flex gap-1 z-10">
              <ButtonAdd />
              <ButtonMinus />
            </div>

            <div className="p-6 pt-5">
              {/* Element Type */}
              <div className="flex items-center gap-3 mb-3">
                <label className="text-gray-500 w-24 text-right shrink-0">
                  Element Type:
                </label>
                <div className="relative">
                  <button className="flex items-center gap-1.5 border border-gray-300 rounded px-2 py-1 text-xs bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300">
                    {elementType}
                    <svg
                      className="w-3 h-3 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Identifier */}
              <div className="flex items-center gap-3 mb-3">
                <label className="text-gray-500 w-24 text-right shrink-0">
                  Identifier:
                </label>
                <input
                  value={identifier}
                  className="border border-gray-300 rounded px-2 py-1 text-xs w-52 focus:outline-none focus:ring-1 focus:ring-blue-300"
                />
              </div>

              {/* Position */}
              <div className="flex items-center gap-3 mb-4">
                <label className="text-gray-500 w-24 text-right shrink-0">
                  Position
                </label>
                <Select
                  value={position}
                  options={["Before Node"]}
                  className="w-36"
                />
              </div>

              {/* Content editor */}
              <div className="flex items-start gap-3">
                <label className="text-gray-500 w-24 text-right shrink-0 mt-1.5">
                  Content:
                </label>
                <div className="flex-1 max-w-2xl">
                  <CodeEditor value={code} onChange={setCode} />
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Info size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400">
                      This content should be standard HTML content. Do not use
                      single quotes.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Conditions ── */}
          <div className="flex items-start gap-3">
            <label className="text-gray-500 w-16 shrink-0 pt-1.5">
              Condition
            </label>
            <div className="flex-1">
              <div className="border border-gray-200 rounded">
                {conditions.map((cond, idx) => (
                  <div
                    key={cond.id}
                    className={`flex items-center gap-2 px-3 py-2 ${idx < conditions.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    {/* "And:" label */}
                    <span className="text-gray-500 w-8 shrink-0 text-right text-[11px]">
                      {idx > 0 ? "And:" : ""}
                    </span>

                    {/* Variable */}
                    <Select
                      value={cond.variable}
                      onChange={(v) => updateCond(cond.id, "variable", v)}
                      options={[
                        "page_type (is)",
                        "product_list_price (is)",
                        "tealium_event (is)",
                        "dom_ready (is)",
                      ]}
                      className="w-40"
                    />

                    {/* Operator */}
                    <Select
                      value={cond.operator}
                      onChange={(v) => updateCond(cond.id, "operator", v)}
                      options={[
                        "equals",
                        "greater than",
                        "less than",
                        "contains",
                        "does not equal",
                      ]}
                      className="w-28"
                    />

                    {/* Value */}
                    <input
                      value={cond.value}
                      onChange={(e) =>
                        updateCond(cond.id, "value", e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-xs w-20 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    />

                    {/* + − inline */}
                    <ButtonAdd />
                    <ButtonMinus />
                  </div>
                ))}
              </div>
            </div>

            {/* Outer − + */}
            <div className="flex items-center gap-1 pt-1.5">
              <ButtonMinus />
              <ButtonAdd />
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
 SIDEBAR BUTTON
══════════════════════════════════ */
const ICONS = {
  trash:
    "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
};

function SidebarBtn({ icon, color, children }) {
  return (
    <button
      className={`flex items-center gap-2 w-full py-1.5 text-xs ${color} transition-colors`}
    >
      <svg
        className="w-3.5 h-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={ICONS[icon]}
        />
      </svg>
      {children}
    </button>
  );
}

/* ══════════════════════════════════
 PLUS / MINUS BUTTON PAIR
══════════════════════════════════ */
function PlusMinusBtn({ onPlus, onMinus }) {
  return (
    <div className="flex items-center gap-1 ml-1">
      <button
        onClick={onPlus}
        className="w-5 h-5 flex items-center justify-center text-blue-500 hover:bg-blue-50 border border-blue-300 rounded text-base leading-none"
      >
        +
      </button>
      <button
        onClick={onMinus}
        className="w-5 h-5 flex items-center justify-center text-blue-500 hover:bg-red-50 hover:text-red-500 border border-blue-300 rounded text-base leading-none"
      >
        −
      </button>
    </div>
  );
}
