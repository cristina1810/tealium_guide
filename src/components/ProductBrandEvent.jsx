import { useState } from "react";
import { jsOptions, typeOptions, operatorOptions } from "../js/general";
import Toggle from "./UI/Toggle";
import { Info, Trash } from "lucide-react";
import Delete from "./UI/Delete";
import Duplicate from "./UI/Duplicate";
import ViewHisChange from "./UI/ViewHisChange";
import ButtonAdd from "./UI/ButtonAdd";
import ButtonMinus from "./UI/ButtonMinus";

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

export default function ProductBrandEvent() {
  const [enabled, setEnabled] = useState(true);
  const [title, setTitle] = useState("Product brand and Event");
  const [scope, setScope] = useState("Before Load Rules");

  const [setRows, setSetRows] = useState([
    {
      id: 1,
      variable: "tealium_event",
      varType: "js",
      toType: "Text",
      toValue: "product_view",
    },
    {
      id: 2,
      variable: "product_brand",
      varType: "js",
      toType: "Text",
      toValue: "teal_ecomm",
    },
  ]);

  const [conditions, setConditions] = useState([
    {
      id: 1,
      variable: "page_type",
      varType: "js",
      operator: "equals",
      value: "product",
    },
  ]);

  const addSetRow = () => {
    setSetRows([
      ...setRows,
      {
        id: Date.now(),
        variable: "",
        varType: "js",
        toType: "Text",
        toValue: "",
      },
    ]);
  };

  const removeSetRow = (id) => {
    if (setRows.length > 1) setSetRows(setRows.filter((r) => r.id !== id));
  };

  const updateSetRow = (id, field, value) => {
    setSetRows(
      setRows.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  };

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: Date.now(),
        variable: "",
        varType: "js",
        operator: "equals",
        value: "",
      },
    ]);
  };

  const removeCondition = (id) => {
    if (conditions.length > 1)
      setConditions(conditions.filter((c) => c.id !== id));
  };

  const updateCondition = (id, field, value) => {
    setConditions(
      conditions.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  return (
    <div className=" mx-auto bg-white rounded-lg ">
      {" "}
      {/* ── Top Header Row ── */}
      <div className="flex items-center border-b border-gray-300 px-4 py-2 bg-gray-50/50">
        {/* Toggle */}
        <div className="me-4">
          <Toggle />
        </div>
        {/* Título */}
        <div className="flex-1 text-sm font-medium text-gray-800">
          Product brand and Event
        </div>

        {/* Type */}
        <div className="w-40 text-sm text-gray-600">Set Data Values</div>

        {/* Scope */}
        <div className="w-36 text-sm text-gray-600">Before Load Rules</div>
      </div>
      {/* ── Body ── */}
      <div className="flex">
        {/* ── BARRA IZQUIERDA ------------------------------*/}
        <div className="w-44 border-r border-gray-200 p-3 flex-shrink-0">
          {/* Actions */}
          <div className="space-y-1 mb-4">
            <Delete />
            <Duplicate />
            <ViewHisChange />
          </div>

          {/* Labels */}
          <div className="mb-3">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs font-semibold text-gray-600">
                Labels
              </span>
            </div>
            <p className="text-xs text-gray-400 italic">
              There are no labels assigned
            </p>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">
              Description
            </p>
            <p className="text-xs text-gray-400">
              Use this customization to set or default variable values based on
              a condition.
            </p>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 p-5 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Title
            </label>
            <InputField value={title} onChange={setTitle} className="w-full" />
          </div>

          {/* Scope */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Scope
            </label>
            <div className="flex items-center gap-2">
              <div className="border border-gray-300 rounded px-3 py-1 text-sm bg-gray-50 text-gray-700">
                {scope}
              </div>
              <button className="text-xs text-blue-500 hover:underline">
                Edit Load Order...
              </button>
            </div>
            {/* Info Banner */}
            <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
              <Info size={16} className="text-gray-400 flex-shrink-0" />
              This feature requires utag v4.38 or higher.
            </div>
          </div>

          {/* Configuration */}
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">
              Configuration
            </p>

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
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    To:
                  </span>

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
                    <ButtonMinus />
                    <ButtonAdd />
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

                  {/* ─ + buttons */}
                  <div className="flex items-center gap-1 ml-auto">
                    <ButtonMinus />
                    <ButtonAdd />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
