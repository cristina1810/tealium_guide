import { useState } from "react";

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
    keyword: "text-blue-400 font-semibold",
    string: "text-green-400",
    operator: "text-gray-300",
    variable: "text-yellow-300",
    plain: "text-gray-200",
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
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-300">
          <div className="flex items-center gap-3">
            {/* Checkbox */}
            <input
              type="checkbox"
              className="w-4 h-4 border-gray-400 rounded"
              defaultChecked
            />
            {/* Toggle */}
            <button
              onClick={() => setEnabled(!enabled)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold border transition-colors ${
                enabled
                  ? "bg-green-500 border-green-600 text-white"
                  : "bg-gray-300 border-gray-400 text-gray-600"
              }`}
            >
              <span className={`w-3 h-3 rounded-full bg-white inline-block`} />
              {enabled ? "ON" : "OFF"}
            </button>
            <span className="text-sm font-medium text-gray-700">GA4 id</span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
              Javascript Code
            </span>
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer border-b-2 border-blue-500 pb-0.5 text-gray-800">
              Before Load Rules
            </span>
          </div>
        </div>

        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-44 border-r border-gray-300 p-3 flex flex-col gap-1 bg-gray-50">
            {/* Actions */}
            <button className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 px-2 py-1.5 rounded transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-100 px-2 py-1.5 rounded transition-colors">
              <svg
                className="w-4 h-4"
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
              Duplicate
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-100 px-2 py-1.5 rounded transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              View Change History
            </button>

            <hr className="my-2 border-gray-300" />

            {/* Labels */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Labels
              </span>
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                Apply Labels
              </button>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                defaultValue="GA4 id"
                className="w-72 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            {/* Scope */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scope
              </label>
              <div className="flex items-center gap-3">
                <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white">
                  <option>Before Load Rules</option>
                  <option>After Load Rules</option>
                  <option>DOM Ready</option>
                  <option>All Tags</option>
                </select>
                <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  Edit Load Order...
                </button>
              </div>

              {/* Info Banner */}
              <div className="flex items-center gap-2 mt-2 bg-blue-50 border border-blue-200 rounded px-3 py-2">
                <svg
                  className="w-4 h-4 text-blue-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs text-blue-700">
                  This feature requires utag v4.38 or higher.
                </span>
              </div>
            </div>

            {/* Occurrence */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occurrence
              </label>
              <div className="space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="occurrence"
                    value="always"
                    checked={occurrence === "always"}
                    onChange={() => setOccurrence("always")}
                    className="accent-red-500"
                  />
                  <span className="text-sm text-gray-700">Run Always</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="occurrence"
                    value="once"
                    checked={occurrence === "once"}
                    onChange={() => setOccurrence("once")}
                    className="accent-red-500"
                  />
                  <span className="text-sm text-gray-700">Run Once</span>
                </label>
              </div>
            </div>

            {/* Configuration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Configuration
              </label>

              {/* Scope Vars */}
              <div className="mb-3">
                <label className="block text-xs text-gray-600 mb-1">
                  Scope Vars:
                </label>
                <input
                  type="text"
                  value={scopeVars}
                  onChange={(e) => setScopeVars(e.target.value)}
                  placeholder="Optional: Ex: objects,arrays,b,string,c,boolean,d"
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400"
                />
              </div>

              {/* Code Editor */}
              <div className="border border-gray-300 rounded overflow-hidden">
                {/* Editor Header */}
                <div className="bg-gray-700 px-3 py-1 flex items-center gap-2">
                  <span className="text-xs text-gray-300">JavaScript</span>
                </div>

                {/* Code Area */}
                <div className="bg-gray-900 font-mono text-sm overflow-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {codeLines.map((line, i) => (
                        <tr
                          key={i}
                          className="hover:bg-gray-800 transition-colors"
                        >
                          {/* Line Number */}
                          <td className="select-none text-right text-gray-500 text-xs px-3 py-0.5 w-8 border-r border-gray-700 align-top">
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
                      {/* Empty lines to fill space */}
                      {Array.from({ length: 10 }).map((_, i) => (
                        <tr key={`empty-${i}`} className="hover:bg-gray-800">
                          <td className="select-none text-right text-gray-600 text-xs px-3 py-0.5 w-8 border-r border-gray-700">
                            {codeLines.length + i + 1}
                          </td>
                          <td className="px-4 py-0.5">&nbsp;</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Condition */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-700">
                Condition
              </span>
              <button className="text-sm text-blue-600 hover:text-blue-800 border border-blue-300 hover:border-blue-500 px-3 py-1 rounded transition-colors">
                Add Condition
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
