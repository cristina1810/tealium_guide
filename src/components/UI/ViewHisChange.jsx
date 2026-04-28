import { RotateCw } from "lucide-react";
export default function ViewHisChange() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 -mx-1 rounded-md text-xs text-slate-700 hover:text-blue-700 hover:bg-blue-50 cursor-pointer transition-colors duration-150">
      <RotateCw size={14} className="text-blue-500" />
      <span>View History Change</span>
    </div>
  );
}
