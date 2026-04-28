export default function StepCard({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-[0px_12px_32px_rgba(40,52,57,0.06)] hover:shadow-[0px_18px_40px_rgba(40,52,57,0.09)] border border-slate-200/60 hover:border-slate-200 transition-all duration-300 ease-out overflow-hidden">
      {children}
    </div>
  );
}
