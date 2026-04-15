import { Trash } from "lucide-react";
export default function Delete() {
  return (
    <div className="flex items-center">
      <Trash size={14} className="text-red-500" />
      <span className="ml-1 text-xs">Delete</span>
    </div>
  );
}
