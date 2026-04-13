import { useState } from "react";

const SearchLowercase = () => {
const [title, setTitle] = useState("Search Lowercase");
const [allVarsLowerCase, setAllVarsLowerCase] = useState("no");
const [lowerCaseArrayItems, setLowerCaseArrayItems] = useState(true);
const [lowerCaseVars, setLowerCaseVars] = useState([
  { id: 1, value: "search_keyword (js)" },
]);
const [notes, setNotes] = useState("");
const [editingNotes, setEditingNotes] = useState(false);

const addVar = () => {
  setLowerCaseVars([
    ...lowerCaseVars,
    { id: Date.now(), value: "search_keyword (js)" },
  ]);
};

const removeVar = () => {
  if (lowerCaseVars.length > 1) {
    setLowerCaseVars(lowerCaseVars.slice(0, -1));
  }
};

return (
  <div className=" border rounded-lg border-gray-100 font-sans text-sm">
    {/* Top Navigation Bar */}
    <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center rounded-t-lg justify-between shadow-sm">
      <div className="flex items-center gap-2">
       
        <span className="text-gray-700 font-medium">Search Lowercase</span>
      </div>
      <div className="flex items-center gap-1 text-gray-500 text-xs">
        <span className="hover:underline cursor-pointer">Lower-Casing</span>
        <span className="mx-1">›</span>
        <span className="hover:underline cursor-pointer">Before Load Rules</span>
      </div>
    </div>

    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-52 bg-white border-r border-gray-200  p-3 flex flex-col gap-1">
        {/* Action Buttons */}
        <button className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-2 py-1.5 rounded text-xs w-full text-left">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>

        <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded text-xs w-full text-left">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Duplicate
        </button>

        <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded text-xs w-full text-left">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View Change History
        </button>

        {/* Labels Section */}
        <div className="mt-3 border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-700 text-xs">Labels</span>
            <button className="flex items-center gap-1 text-blue-600 text-xs hover:underline">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Apply Labels
            </button>
          </div>
          <p className="text-gray-400 text-xs italic">There are no labels assigned</p>
        </div>

        {/* Description Section */}
        <div className="mt-3 border-t border-gray-200 pt-3">
          <span className="font-semibold text-gray-700 text-xs block mb-1">Description</span>
          <p className="text-gray-500 text-xs leading-relaxed">
            Note: The data source for the trace id (cp.trace_id) is NOT lower cased.
            Use this customization to set JS, meta, query and cookie data to lower case.
            This is a best practice for data consistency.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="bg-white border border-gray-200 rounded shadow-sm p-6 max-w-2xl">
          {/* Title Field */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>

          {/* Scope Field */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Scope</label>
            <div className="flex items-center gap-2">
              <select className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-white">
                <option>Before Load Rules</option>
                <option>After Load Rules</option>
                <option>DOM Ready</option>
              </select>
              <button className="text-blue-600 text-xs hover:underline whitespace-nowrap">
                Edit Load Order...
              </button>
            </div>

            {/* Info Banner */}
            <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              This feature requires utag v4.38 or higher.
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 my-4" />

          {/* Configuration Section */}
          <div>
            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
              Configuration
            </h3>

            {/* All Variables to Lower Case */}
            <div className="flex items-center gap-6 mb-4">
              <span className="text-xs text-gray-700 font-medium w-48">
                All Variables to Lower Case:
              </span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="allVars"
                    value="yes"
                    checked={allVarsLowerCase === "yes"}
                    onChange={() => setAllVarsLowerCase("yes")}
                    className="accent-blue-500"
                  />
                  <span className="text-xs text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="allVars"
                    value="no"
                    checked={allVarsLowerCase === "no"}
                    onChange={() => setAllVarsLowerCase("no")}
                    className="accent-blue-500"
                  />
                  <span className="text-xs text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Lower Case Variables */}
            {allVarsLowerCase === "no" && (
              <div className="mb-4">
                <span className="block text-xs text-gray-700 font-medium mb-2">
                  Lower Case:
                </span>
                <div className="flex flex-col gap-2">
                  {lowerCaseVars.map((v) => (
                    <div key={v.id} className="flex items-center gap-2">
                      <select
                        defaultValue={v.value}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-white min-w-52"
                      >
                        <option>search_keyword (js)</option>
                        <option>page_name (js)</option>
                        <option>product_id (js)</option>
                      </select>
                      <button
                        onClick={addVar}
                        className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center text-sm font-bold flex-shrink-0"
                      >
                        +
                      </button>
                      <button
                        onClick={removeVar}
                        className="w-6 h-6 bg-gray-400 hover:bg-gray-500 text-white rounded flex items-center justify-center text-sm font-bold flex-shrink-0"
                      >
                        −
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lower Case Array Items */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs text-gray-700 font-medium">Lower case array items:</span>
              <input
                type="checkbox"
                checked={lowerCaseArrayItems}
                onChange={(e) => setLowerCaseArrayItems(e.target.checked)}
                className="w-3.5 h-3.5 accent-blue-500"
              />
            </div>
          </div>

        
        </div>
      </div>
    </div>
  </div>
);
};

export default SearchLowercase;