export default function MainButton({ children }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs text-white font-semibold tracking-tight bg-blue-700 hover:bg-blue-800 active:bg-blue-900 shadow-sm hover:shadow-md rounded-md group cursor-pointer select-none transition-all duration-200 ease-out">
      {children}
    </div>
  );
}
