export default function SecondaryButton({ children }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-tight text-blue-700 bg-white border border-blue-700/70 rounded-md cursor-pointer select-none hover:bg-blue-50 hover:border-blue-700 hover:shadow-sm active:bg-blue-100 transition-all duration-200 ease-out group">
      {children}
    </div>
  );
}