import { useState } from "react";
import { Copy, Check } from "lucide-react";
export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-label={copied ? "Copiado" : "Copiar al portapapeles"}
      className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 px-2 py-1 rounded-md hover:bg-gray-100 active:scale-[0.97] transition-all duration-200"
      title="Copiar al portapapeles"
    >
      {copied ? (
        <>
          <Check size={13} className="text-green-600 animate-fadeIn" />
          <span className="text-green-600">Copiado</span>
        </>
      ) : (
        <>
          <Copy size={13} />
          <span>Copiar</span>
        </>
      )}
    </button>
  );
}
