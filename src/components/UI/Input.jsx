import { Children } from "react";

export default function Input({ label,children }) {
return (
  <div className="mb-4">
  
    <input
     value={children}
      className="w-64 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1focus:ring-blue-400"
    />
    
  </div>
);
}
