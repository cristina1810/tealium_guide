import { useState } from "react";
import SecondaryButton from "./UI/SecondaryButton";
import { Plus } from "lucide-react";

const initialVariables = [
{ id: 1, set: "product_list_price", to: "Data Layer Value", value: "add_to_cart" },
{ id: 2, set: "product_category", to: "Data Layer Value", value: "" },
{ id: 3, set: "product_id", to: "Data Layer Value", value: "" },
{ id: 4, set: "site_currency", to: "Data Layer Value", value: "" },
{ id: 5, set: "product_quantity", to: "JavaScript", value: "document.querySelector('#qty').value" },
{ id: 6, set: "tealium_event", to: "Text", value: "add_to_cart" },
];

const setOptions = [
"product_list_price","product_category","product_id",
"site_currency","product_quantity","tealium_event",
];

const toOptions = ["Data Layer Value", "JavaScript", "Text", "Query Parameter", "Cookie"];

export default function AddToCart() {
const [name, setName] = useState("Add to cart");
const [notes, setNotes] = useState("");
const [scope, setScope] = useState("DOM Ready");
const [trackingEvent, setTrackingEvent] = useState("Link");
const [publishLocations, setPublishLocations] = useState("");
const [trigger, setTrigger] = useState("Click");
const [elementSelector, setElementSelector] = useState(".btn-cart, .btn-cart span");
const [triggerFrequency, setTriggerFrequency] = useState("Always");
const [variables, setVariables] = useState(initialVariables);
const [nextId, setNextId] = useState(7);

const addVariable = () => {
  setVariables([...variables, { id: nextId, set: "", to: "Data Layer Value", value: "" }]);
  setNextId(nextId + 1);
};

const removeVariable = (id) => {
  setVariables(variables.filter((v) => v.id !== id));
};

const updateVariable = (id, field, val) => {
  setVariables(variables.map((v) => (v.id === id ? { ...v, [field]: val } : v)));
};

return (
  <div className="min-h-screen border rounded-lg border-gray-100 flex items-start justify-center ">
    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
      {/* Header */}
    
      {/* Configuration */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Configuration</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" disabled
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none" disabled
          />
        </div>

        {/* Scope */}
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1">Scope</label>
          <div className="relative">
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
              disabled
            >
              <option>DOM Ready</option>
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Tracking Event */}
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1">Tracking Event</label>
          <div className="relative">
            <select
              value={trackingEvent}
              onChange={(e) => setTrackingEvent(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
            >
              <option>Link</option>
            
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Publish Locations */}
        <div>
<label className="block text-xs text-gray-500 mb-1">Publish Locations</label>
<div className="flex gap-2 mt-1">
  {["DEV", "PROD", "QA"].map((location) => (
    <label key={location} className="flex items-center gap-2 text-sm text-gray-400 cursor-not-allowed">
      <input
        type="checkbox"
        checked
        disabled
        className="accent-blue-400 cursor-not-allowed"
      />
      {location}
    </label>
  ))}
</div>
</div>
      </div>

      {/* Event Triggers */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Event Triggers</h2>

        {/* Radio buttons */}
        <div className="flex flex-col gap-2 mb-4">
          {["Click", "Mousedown", "Mouseup"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="radio"
                name="trigger"
                value={opt}
                checked={trigger === opt}
                onChange={() => setTrigger(opt)}
                className="accent-blue-500"
              />
              {opt}
            </label>
          ))}
        </div>

        {/* Element Selector */}
        <div className="mb-1">
          <label className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            Element Selector
            <InfoIcon />
          </label>
          <input
            type="text"
            value={elementSelector}
            onChange={(e) => setElementSelector(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            disabled
          />
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Target a specific element by entering its ID, class, or another valid selector.
        </p>

        {/* Trigger Frequency */}
        <div className="mb-1">
          <label className="block text-xs text-gray-500 mb-1">Trigger Frequency</label>
          <div className="relative w-40">
            <select
              value={triggerFrequency}
              onChange={(e) => setTriggerFrequency(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
            >
              <option>Always</option>
              
            </select>
            <ChevronIcon />
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-5">Select to trigger this event always or once.</p>

        {/* New Variable Button */}
        <SecondaryButton className="ml-2">
          <Plus size={12} className="mr-2" />
          New Variable
        </SecondaryButton>
      </div>

      {/* Event Trigger Variables */}
      <div className="px-6 py-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Event Trigger Variables</h2>

        <div className="flex flex-col gap-2">
          {variables.map((v) => (
            <div
              key={v.id}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2"
            >
              {/* Set label */}
              <span className="text-xs text-gray-500 w-6 shrink-0">Set</span>

              {/* Set dropdown */}
              <div className="relative flex-1 min-w-0">
                <select
                  value={v.set}
                  onChange={(e) => updateVariable(v.id, "set", e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
                >
                  <option value="">Select variable...</option>
                  {setOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronIconSm />
              </div>

              {/* To label */}
              <span className="text-xs text-gray-500 w-4 shrink-0">To</span>

              {/* To dropdown */}
              <div className="relative flex-1 min-w-0">
                <select
                  value={v.to}
                  onChange={(e) => updateVariable(v.id, "to", e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
                >
                  {toOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronIconSm />
              </div>

              {/* Value input */}
              <input
                type="text"
                value={v.value}
                onChange={(e) => updateVariable(v.id, "value", e.target.value)}
                className="flex-[2] border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-0"
                placeholder="Value..."
              />

              {/* +/- buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={addVariable}
                  className="w-5 h-5 flex items-center justify-center text-blue-500 hover:text-blue-700 text-lg leading-none"
                >
                  +
                </button>
                <button
                  onClick={() => removeVariable(v.id)}
                  className="w-5 h-5 flex items-center justify-center text-blue-500 hover:text-red-500 text-lg leading-none"
                >
                  −
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

/* ── Helpers ── */
function ChevronIcon() {
return (
  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);
}

function ChevronIconSm() {
return (
  <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);
}

function InfoIcon() {
return (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);
}