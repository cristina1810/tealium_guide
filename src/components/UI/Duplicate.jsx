import { Copy } from "lucide-react";
export default function Duplicate() {
  return (
    <div className="flex items-center">
      <Copy size={14} className="text-green-600" />
      <span className="ml-1 text-xs">Duplicate</span>
    </div>
  );
}
