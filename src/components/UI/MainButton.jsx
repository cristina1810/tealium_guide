export default function MainButton({ children }) {
return (
  <div className="inline-flex items-center px-3 py-1.5 overflow-hidden text-xs text-white font-medium transition-all bg-blue-700 rounded-md group ">
    {children}
  </div>
);  
}