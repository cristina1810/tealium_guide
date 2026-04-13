import { useState } from "react";

const SelectField = ({ value, onChange, options, className = "" }) => (
<select
  value={value}
  onChange={(e) => onChange(e.target.value)}
  className={`border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 ${className}`}
>
  {options.map((opt) => (
    <option key={opt.value} value={opt.value}>
      {opt.label}
    </option>
  ))}
</select>
);

const InputField = ({ value, onChange, placeholder = "", className = "" }) => (
<input
  type="text"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  placeholder={placeholder}
  className={`border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 ${className}`}
/>
);

const jsOptions = [{ value: "js", label: "js" }];
const typeOptions = [
{ value: "Text", label: "Text" },
{ value: "Number", label: "Number" },
{ value: "Boolean", label: "Boolean" },
];
const operatorOptions = [
{ value: "equals", label: "equals" },
{ value: "contains", label: "contains" },
{ value: "starts_with", label: "starts with" },
{ value: "not_equals", label: "not equals" },
];

export default function ProductBrandEvent() {
const [enabled, setEnabled] = useState(true);
const [title, setTitle] = useState("Product brand and Event");
const [scope, setScope] = useState("Before Load Rules");

const [setRows, setSetRows] = useState([
  { id: 1, variable: "tealium_event", varType: "js", toType: "Text", toValue: "product_view" },
  { id: 2, variable: "product_brand", varType: "js", toType: "Text", toValue: "teal_ecomm" },
]);

const [conditions, setConditions] = useState([
  { id: 1, variable: "page_type", varType: "js", operator: "equals", value: "product" },
]);

const addSetRow = () => {
  setSetRows([...setRows, { id: Date.now(), variable: "", varType: "js", toType: "Text", toValue: "" }]);
};

const removeSetRow = (id) => {
  if (setRows.length > 1) setSetRows(setRows.filter((r) => r.id !== id));
};

const updateSetRow = (id, field, value) => {
  setSetRows(setRows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
};

const addCondition = () => {
  setConditions([...conditions, { id: Date.now(), variable: "", varType: "js", operator: "equals", value: "" }]);
};

const removeCondition = (id) => {
  if (conditions.length > 1) setConditions(conditions.filter((c) => c.id !== id));
};

const updateCondition = (id, field, value) => {
  setConditions(conditions.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
};

return (
  <div className="border rounded-lg border-gray-100 mt-4 font-sans">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">

      {/* ── Top Header Row ── */}
      <div className="flex items-center border-b border-gray-300 px-4 py-2 bg-gray-50">
        {/* Toggle */}
        <div className="flex items-center gap-2 mr-4">
          <div className="w-4 h-4 border border-gray-400 rounded-sm bg-white flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-sm" />
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
              enabled ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                enabled ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-xs font-semibold text-blue-600">{enabled ? "ON" : "OFF"}</span>
        </div>

        {/* Title */}
        <div className="flex-1 text-sm font-medium text-gray-800">Product brand and Event</div>

        {/* Type */}
        <div className="w-40 text-sm text-gray-600">Set Data Values</div>

        {/* Scope */}
        <div className="w-36 text-sm text-gray-600">Before Load Rules</div>
      </div>

      {/* ── Body ── */}
      <div className="flex">

        {/* ── Left Sidebar ── */}
        <div className="w-44 border-r border-gray-200 p-3 flex-shrink-0">
          {/* Actions */}
          <div className="space-y-1 mb-4">
            {[
              { icon: "🗑", label: "Delete", color: "text-red-500" },
              { icon: "⧉", label: "Duplicate", color: "text-blue-500" },
              { icon: "↻", label: "View Change History", color: "text-blue-500" },
            ].map(({ icon, label, color }) => (
              <button
                key={label}
                className={`flex items-center gap-1.5 text-xs ${color} hover:underline w-full text-left`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Labels */}
          <div className="mb-3">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs font-semibold text-gray-600">Labels</span>
              <button className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded hover:bg-blue-600">
                Apply Labels
              </button>
            </div>
            <p className="text-xs text-gray-400 italic">There are no labels assigned</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">Description</p>
            <p className="text-xs text-gray-400">
              Use this customization to set or default variable values based on a condition.
            </p>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 p-5 space-y-5">

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
            <InputField
              value={title}
              onChange={setTitle}
              className="w-full"
            />
          </div>

          {/* Scope */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Scope</label>
            <div className="flex items-center gap-2">
              <div className="border border-gray-300 rounded px-3 py-1 text-sm bg-gray-50 text-gray-700">
                {scope}
              </div>
              <button className="text-xs text-blue-500 hover:underline">Edit Load Order...</button>
            </div>
            {/* Info banner */}
            <div className="mt-2 flex items-start gap-1.5 bg-blue-50 border border-blue-200 rounded px-3 py-2">
              <span className="text-blue-500 text-sm mt-0.5">ℹ</span>
              <p className="text-xs text-blue-700">
                This feature requires utag v4.3B or higher.
              </p>
            </div>
          </div>

          {/* Configuration */}
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">Configuration</p>

            <div className="space-y-2">
              {setRows.map((row, idx) => (
                <div key={row.id} className="flex items-center gap-2">
                  {/* "Set:" label (only first row) */}
                  <span className="text-xs text-gray-500 w-6 flex-shrink-0">
                    {idx === 0 ? "Set:" : ""}
                  </span>

                  {/* Variable + type */}
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
                    <InputField
                      value={row.variable}
                      onChange={(v) => updateSetRow(row.id, "variable", v)}
                      className="border-0 rounded-none w-32 focus:ring-0"
                    />
                    <div className="border-l border-gray-300 px-2 py-1 bg-gray-50">
                      <SelectField
                        value={row.varType}
                        onChange={(v) => updateSetRow(row.id, "varType", v)}
                        options={jsOptions}
                        className="border-0 focus:ring-0 bg-transparent text-xs"
                      />
                    </div>
                  </div>

                  {/* To: */}
                  <span className="text-xs text-gray-500 flex-shrink-0">To:</span>

                  {/* To type */}
                  <SelectField
                    value={row.toType}
                    onChange={(v) => updateSetRow(row.id, "toType", v)}
                    options={typeOptions}
                    className="w-20"
                  />

                  {/* To value */}
                  <InputField
                    value={row.toValue}
                    onChange={(v) => updateSetRow(row.id, "toValue", v)}
                    className="w-28"
                  />

                  {/* ─ + buttons */}
                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={() => removeSetRow(row.id)}
                      className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-100 text-xs"
                    >
                      −
                    </button>
                    <button
                      onClick={addSetRow}
                      className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-100 text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-3" />

            {/* Conditions */}
            <div className="space-y-2">
              {conditions.map((cond, idx) => (
                <div key={cond.id} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16 flex-shrink-0">
                    {idx === 0 ? "Condition" : ""}
                  </span>

                  {/* Variable + type */}
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
                    <InputField
                      value={cond.variable}
                      onChange={(v) => updateCondition(cond.id, "variable", v)}
                      className="border-0 rounded-none w-28 focus:ring-0"
                    />
                    <div className="border-l border-gray-300 px-2 py-1 bg-gray-50">
                      <SelectField
                        value={cond.varType}
                        onChange={(v) => updateCondition(cond.id, "varType", v)}
                        options={jsOptions}
                        className="border-0 focus:ring-0 bg-transparent text-xs"
                      />
                    </div>
                  </div>

                  {/* Operator */}
                  <SelectField
                    value={cond.operator}
                    onChange={(v) => updateCondition(cond.id, "operator", v)}
                    options={operatorOptions}
                    className="w-24"
                  />

                  {/* Value */}
                  <InputField
                    value={cond.value}
                    onChange={(v) => updateCondition(cond.id, "value", v)}
                    className="w-24"
                  />

                  {/* + button inline */}
                  <button
                    onClick={addCondition}
                    className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-100 text-xs"
                  >
                    +
                  </button>

                  {/* ─ + buttons */}
                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={() => removeCondition(cond.id)}
                      className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-100 text-xs"
                    >
                      −
                    </button>
                    <button
                      onClick={addCondition}
                      className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-100 text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}