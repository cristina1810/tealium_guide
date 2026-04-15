import { useState } from "react";
import Toggle from "./UI/Toggle";
import Delete from "./UI/Delete";
import Duplicate from "./UI/Duplicate";
import ViewHisChange from "./UI/ViewHisChange";
import { Info } from "lucide-react";

const CodeEditor = ({ code }) => {
  const lines = code.split("\n");
  return (
    <div className="flex border border-gray-300 rounded font-mono text-xs bg-white overflow-auto">
      <div className="bg-gray-100 text-gray-400 select-none border-r border-gray-300 px-2 py-2 text-right min-w-[32px]">
        {lines.map((_, i) => (
          <div key={i} className="leading-5">
            {i + 1}
          </div>
        ))}
      </div>
      <pre className="px-3 py-2 text-gray-800 leading-5 whitespace-pre">
        {lines.map((line, i) => (
          <div key={i}>
            {line
              .split(
                /(\b(?:if|return|function|var|let|const|document|querySelector|value)\b|'[^']*'|===|\?|:)/g,
              )
              .map((part, j) => {
                if (/^'[^']*'$/.test(part))
                  return (
                    <span key={j} className="text-green-600">
                      {part}
                    </span>
                  );
                if (/^(if|return|function|var|let|const)$/.test(part))
                  return (
                    <span key={j} className="text-purple-600 font-semibold">
                      {part}
                    </span>
                  );
                if (/^(document|querySelector|value)$/.test(part))
                  return (
                    <span key={j} className="text-blue-600">
                      {part}
                    </span>
                  );
                if (/^(===|\?|:)$/.test(part))
                  return (
                    <span key={j} className="text-red-500">
                      {part}
                    </span>
                  );
                return <span key={j}>{part}</span>;
              })}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default function AddToCartExtension() {
  const [isOn, setIsOn] = useState(true);
  const [occurrence, setOccurrence] = useState("always");
  const [scopeVars, setScopeVars] = useState("");
  const [activeTab, setActiveTab] = useState("javascript");

  const code = `if (b.tealium_event === 'add_to_cart') {
b.product_quantity = document.querySelector('#qty')
  ? document.querySelector('#qty').value
  : 1;
}`;

  return (
    <div className="flex items-start justify-center">
      <div className="w-full rounded shadow-sm">
        {/* Top Header Bar */}
        <div className="flex items-center border-b border-gray-300 px-4 py-2 bg-gray-50/50">
          {/* Toggle */}
          <div className="me-4">
            <Toggle />
          </div>
          {/* Título */}
          <div className="flex-1 text-sm font-medium text-gray-800">
            Add to cart
          </div>

          {/* Type */}
          <div className="w-40 text-sm text-gray-600">Javascript Code</div>

          {/* Scope */}
          <div className="w-36 text-sm text-gray-600">Before Load Rules</div>
        </div>

        {/* Body */}
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-44 border-r border-gray-300 p-3 flex flex-col gap-1 bg-white min-h-[500px]">
            <Delete />
            <Duplicate />
            <ViewHisChange />

            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />

            {/* Labels */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500 font-medium">Labels</span>
            </div>
            <p className="text-xs text-gray-400 italic px-1">
              There are no labels assigned
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />

            {/* Description */}
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">
                Description
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                This code will be wrapped in a function call and passed two
                parameters (a,b):
              </p>
              <ul className="text-xs text-gray-500 mt-2 space-y-1 leading-relaxed">
                <li>
                  <span className="font-medium">a</span> is the event type
                </li>
                <li>
                  <span className="font-medium">b</span> is a reference to
                  utag_data
                </li>
                <li>Any output values should be set as b.OUTPUTNAME</li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-5 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                defaultValue="Add to cart"
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* Scope */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Scope
              </label>
              <div className="flex items-center gap-3">
                <select className="border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-white">
                  <option>Before Load Rules</option>
                </select>
                <button className="text-xs text-blue-500 hover:text-blue-700 hover:underline">
                  Edit Load Order...
                </button>
              </div>

              <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                <Info size={16} className="text-gray-400 flex-shrink-0" />
                This feature requires utag v4.38 or higher.
              </div>
            </div>

            {/* Occurrence */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Occurrence
              </label>
              <div className="flex flex-col gap-1.5">
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
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Configuration
              </label>

              {/* Scope Vars */}
              <div className="mb-3">
                <label className="block text-xs text-gray-500 mb-1">
                  Scope Vars:
                </label>
                <input
                  type="text"
                  value={scopeVars}
                  onChange={(e) => setScopeVars(e.target.value)}
                  placeholder="Optional: Ex: object,a,array,b,string,c,boolean,d"
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-500 focus:outline-none focus:border-blue-400 placeholder-gray-400"
                />
              </div>

              {/* Code Editor */}
              <CodeEditor code={code} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 px-5 py-3 flex items-center gap-3 bg-gray-50">
          <span className="text-xs text-gray-600 font-medium">Condition</span>
          <button className="text-xs text-blue-500 hover:text-blue-700 hover:underline">
            Add Condition
          </button>
        </div>
      </div>
    </div>
  );
}
