import { useState } from "react";
import { X, HelpCircle, ArrowRight, Plus } from "lucide-react";
import MainButton from "./UI/MainButton";

export default function ChatlingMapping() {
  const [activeTab, setActiveTab] = useState("text");
  const [customDestination, setCustomDestination] = useState("attribute.id");
  const [destinations, setDestinations] = useState(["attribute.id"]);
  const [selectedCategory, setSelectedCategory] = useState("add-custom");

  const handleAddDestination = () => {
    if (customDestination.trim()) {
      setDestinations([...destinations, customDestination.trim()]);
    }
  };

  const handleRemoveDestination = (dest) => {
    setDestinations(destinations.filter((d) => d !== dest));
  };

  return (
    <div className="bg-white rounded-lg mx-auto shadow-xl w-full  overflow-hidden">
      {/* Header */}
      <div className="bg-blue-500 text-white px-5 py-3 flex items-center justify-between">
        <h2 className="text-base font-medium">
          Map Custom Value to destination
        </h2>
        <button className="text-white hover:text-blue-100 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Top hint */}
      <div className="text-right px-5 py-2 text-sm text-gray-500">
        Click on a destination to edit
      </div>

      {/* Source → Destination Row */}
      <div className="px-5 pb-3 flex items-center gap-3">
        {/* Source input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            defaultValue="chatling-embed-script"
            className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 w-52 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <HelpCircle size={16} className="text-gray-400 cursor-pointer" />
        </div>

        {/* Arrow */}
        <ArrowRight className="text-blue-500" size={22} />

        {/* Destination pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {destinations.map((dest) => (
            <span
              key={dest}
              className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-sm px-3 py-1 rounded"
            >
              <button
                onClick={() => handleRemoveDestination(dest)}
                className="text-blue-400 hover:text-blue-600"
              >
                <X size={13} />
              </button>
              {dest}
            </span>
          ))}

          {/* Add Custom Destination button */}
          <button className="flex items-center gap-1 border border-blue-400 text-blue-500 text-sm px-3 py-1 rounded hover:bg-blue-50 transition-colors">
            <Plus size={14} />
            Add Custom Destination
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 pb-0 flex gap-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("text")}
          className={`px-4 py-1.5 text-sm rounded-t font-medium transition-colors ${
            activeTab === "text"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Text
        </button>
        <button
          onClick={() => setActiveTab("js")}
          className={`px-4 py-1.5 text-sm rounded-t font-medium transition-colors ${
            activeTab === "js"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          JS Code
        </button>
      </div>

      {/* Body */}
      <div className="flex min-h-[190px]">
        {/* Sidebar */}
        <div className="w-56 border-r border-gray-200 py-3">
          <p className="text-xs font-semibold text-gray-500 px-4 mb-2 tracking-wide">
            CATEGORY
          </p>
          <div
            onClick={() => setSelectedCategory("add-custom")}
            className={`flex items-center gap-2 px-4 py-2 text-sm cursor-pointer transition-colors ${
              selectedCategory === "add-custom"
                ? "border-l-4 border-blue-500 bg-blue-50 text-blue-700 font-medium"
                : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Plus size={14} />
            Add Custom Destination
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-5">
          <p className="text-sm text-gray-600 mb-5">
            Type in a custom destination value below
          </p>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700 whitespace-nowrap">
              Custom Destination:
            </label>
            <input
              type="text"
              value={customDestination}
              onChange={(e) => setCustomDestination(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 w-52 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddDestination}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded transition-colors"
            >
              <Plus size={14} />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200">
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          Cancel
        </button>
        <MainButton>Done</MainButton>
      </div>
    </div>
  );
}
