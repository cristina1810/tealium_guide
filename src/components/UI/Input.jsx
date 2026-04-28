import { Children } from "react";

export default function Input({ label, children }) {
  return (
    <div className="mb-4">
      <input
        value={children}
        readOnly
        className="w-64 border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-gray-700 bg-white placeholder:text-gray-400 transition-colors duration-150 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-500"
      />
    </div>
  );
}
