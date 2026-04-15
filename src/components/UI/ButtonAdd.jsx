import { Plus } from "lucide-react";

export default function ButtonAdd({}) {
  return (
    <button className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded text-blue-600 hover:bg-gray-100 text-xs">
      <Plus size={12} strokeWidth={4} />
    </button>
  );
}
