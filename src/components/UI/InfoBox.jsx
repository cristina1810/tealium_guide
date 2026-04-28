import { Info } from "lucide-react";

const colorVariants = {
  red: {
    container: "bg-red-50/80 border-red-100 ring-red-200/50",
    icon: "text-red-700",
    text: "text-red-800",
  },
  blue: {
    container: "bg-blue-50/80 border-blue-100 ring-blue-200/50",
    icon: "text-blue-700",
    text: "text-blue-800",
  },
  yellow: {
    container: "bg-yellow-50/80 border-yellow-100 ring-yellow-200/50",
    icon: "text-yellow-700",
    text: "text-yellow-800",
  },
  green: {
    container: "bg-green-50/80 border-green-100 ring-green-200/50",
    icon: "text-green-700",
    text: "text-green-800",
  },
};

export default function InfoBox({ children, color = "red" }) {
  const styles = colorVariants[color];

  return (
    <div
      role="note"
      className={`flex items-start gap-4 p-4 rounded-lg border ring-1 ring-inset shadow-sm my-4 ${styles.container}`}
    >
      <Info size={18} className={`mt-0.5 flex-shrink-0 ${styles.icon}`} aria-hidden="true" />
      <p className={`text-sm italic leading-relaxed ${styles.text}`}>
        {children}
      </p>
    </div>
  );
}
