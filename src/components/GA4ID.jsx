import { useState } from "react";
import Delete from "./UI/Delete";
import Duplicate from "./UI/Duplicate";
import ViewHisChange from "./UI/ViewHisChange";
import Toggle from "./UI/Toggle";
import CopyButton from "./UI/CopyButton";
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
const lineNumbers = [1, 2, 3, 4, 5];

const codeLines = [
  {
    indent: 0,
    content: [
      { type: "keyword", text: "if" },
      { type: "plain", text: " (" },
      { type: "variable", text: 'b["ut.env"]' },
      { type: "operator", text: " === " },
      { type: "string", text: '"dev"' },
      { type: "operator", text: " || " },
      { type: "variable", text: 'b["ut.env"]' },
      { type: "operator", text: " === " },
      { type: "string", text: '"qa"' },
      { type: "plain", text: ") {" },
    ],
  },
  {
    indent: 1,
    content: [
      { type: "variable", text: "b.ga4_measurement_id" },
      { type: "operator", text: " = " },
      { type: "string", text: '"G-YK3VEB6Z7F"' },
      { type: "plain", text: ";" },
    ],
  },
  { indent: 0, content: [{ type: "plain", text: "} else {" }] },
  {
    indent: 1,
    content: [
      { type: "variable", text: "b.ga4_measurement_id" },
      { type: "operator", text: " = " },
      { type: "string", text: '"G-DE8865ZXND"' },
      { type: "plain", text: ";" },
    ],
  },
  { indent: 0, content: [{ type: "plain", text: "}" }] },
];

function CodeToken({ type, text }) {
  const colors = {
    keyword: "text-blue-500 font-semibold",
    string: "text-emerald-600",
    operator: "text-gray-600",
    variable: "text-yellow-500",
    plain: "text-gray-400",
  };
  return <span className={colors[type] || "text-gray-200"}>{text}</span>;
}

export default function GA4ID() {
  const [enabled, setEnabled] = useState(true);
  const [occurrence, setOccurrence] = useState("always");
  const [scopeVars, setScopeVars] = useState("");

  return (
    <div className="flex items-start justify-center ">
      <div className="w-full  shadow-sm rounded">
        {/* ══ TABLE ROW ══ */}
        <div className="flex items-center border-b border-gray-300 px-4 py-2 bg-gray-50/50">
          {/* Toggle */}
          <div className="me-4">
            <Toggle />
          </div>
          {/* Título */}
          <div className="flex-1 text-sm font-medium text-gray-800">
            GA4 ID{" "}
          </div>

          {/* Type */}
          <div className="w-40 text-sm text-gray-600">Javascript Code</div>

          {/* Scope */}
          <div className="w-45 text-sm text-gray-600">Before Load Rules</div>
        </div>

        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-44 border-r border-gray-300 p-3 flex flex-col gap-1 bg-gray-50">
            {/* Actions */}
            <Delete />
            <Duplicate />
            <ViewHisChange />

            <hr className="my-2 border-gray-300" />

            {/* Labels */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Labels
              </span>
            </div>
            <p className="text-xs text-gray-400 italic">
              There are no labels assigned
            </p>

            <hr className="my-2 border-gray-300" />

            {/* Description */}
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Description
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                This code will be wrapped in a function call and passed two
                parameters (a,b).
                <br />
                <br />
                <span className="font-medium">a</span> is the event type
                <br />
                <span className="font-medium">b</span> is a reference to
                utag_data.
                <br />
                <br />
                Any output values should be set as b.OUTPUTNAME
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-5 space-y-5">
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-500 mb-1">Title</label>
              <input
                value={"GA4 id"}
                className="border border-gray-300 rounded px-2 py-1.5 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>

            {/* Scope */}
            <div className="mb-4">
              <label className="block text-gray-500 mb-1">Scope</label>
              <div className="flex items-center gap-3">
                <Select
                  value={"Before Load Rules"}
                  options={["Before Load Rules"]}
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
                      className="accent-blue-500"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <p className="text-gray-500 mb-2">Configuration</p>
            <div>
              {/* Scope Vars */}
              <div className="mb-3 flex items-center gap-2">
                <label className=" text-xs text-gray-600 mb-1">
                  Scope Vars:
                </label>
                <input
                  type="text"
                  value={scopeVars}
                  placeholder="Optional: Ex: objects,arrays,b,string,c,boolean,d"
                  className="w-100 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400"
                />
              </div>

              {/* Code Editor */}
              <div className="border border-gray-300 rounded overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 px-2 py-1">
                  <span className="text-xs text-gray-500">JavaScript</span>
                  <CopyButton
                    text={`if (b["ut.env"] === "dev" || b["ut.env"] === "qa") {
b.ga4_measurement_id = "G-YK3VE8627F"; 
} else {
b.ga4_measurement_id = "G-DEB0652XND"; 
}`}
                  />
                </div>

                {/* Code Area */}
                <div className="bg-white font-mono text-sm overflow-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {codeLines.map((line, i) => (
                        <tr
                          key={i}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {/* Line Number */}
                          <td className="select-none text-right text-gray-400 text-xs px-2 py-0.5 w-8 bg-gray-100 border-r border-gray-200 align-top">
                            {i + 1}
                          </td>
                          {/* Code */}
                          <td className="px-4 py-0.5 whitespace-pre">
                            <span
                              style={{ paddingLeft: `${line.indent * 16}px` }}
                              className="inline-block"
                            >
                              {line.content.map((token, j) => (
                                <CodeToken
                                  key={j}
                                  type={token.type}
                                  text={token.text}
                                />
                              ))}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer bar */}
                <div className="h-2.5 bg-gray-100 border-t border-gray-200 flex items-center">
                  <div className="ml-4 w-16 h-1.5 bg-gray-400 rounded-full opacity-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
