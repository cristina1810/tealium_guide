export default function StepBox({ number }) {
  return (
    <span
      className="inline-flex items-center justify-center w-12 h-12 rounded-xl font-extrabold text-xl flex-none
      bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700
      ring-1 ring-inset ring-blue-200/60 shadow-sm
      tabular-nums tracking-tight select-none"
    >
      {String(number).padStart(2, "0")}
    </span>
  );
}
