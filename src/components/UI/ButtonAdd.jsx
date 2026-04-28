import { Plus } from "lucide-react";

export default function ButtonAdd({}) {
  return (
    <button
      type="button"
      aria-label="Añadir"
      title="Añadir"
      className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-300 active:scale-95 transition-all duration-150 text-xs"
    >
      <Plus size={12} strokeWidth={4} />
    </button>
  );
}
