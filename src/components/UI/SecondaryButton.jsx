export default function SecondaryButton({ children }) {
return (
  <div className="inline-flex items-center px-3 py-1.5 overflow-hidden text-xs text-blue-700 border border-blue-700 font-medium transition-all  rounded-md group ">
    {children}
  </div>
);  
}