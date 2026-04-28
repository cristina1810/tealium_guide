import { Minus } from "lucide-react";

export default function ButtonMinus({}) {
  return (
    <button
      type="button"
      aria-label="Quitar"
      title="Quitar"
      className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded text-blue-600 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-300 active:scale-95 transition-all duration-150 text-xs"
    >
      <Minus size={12} strokeWidth={4} />
    </button>
  );
}
