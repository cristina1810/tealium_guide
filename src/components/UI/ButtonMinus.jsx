import { Minus } from "lucide-react";

export default function ButtonMinus({}) {
  return (
    <button className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded text-blue-600 hover:bg-gray-100 text-xs">
      <Minus size={12} strokeWidth={4} />
    </button>
  );
}
