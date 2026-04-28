import { Trash } from "lucide-react";
export default function Delete() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 -mx-1 rounded-md text-xs text-slate-700 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-150">
      <Trash size={14} className="text-red-500" />
      <span>Delete</span>
    </div>
  );
}
