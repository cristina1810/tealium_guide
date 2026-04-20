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
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      title="Copiar al portapapeles"
    >
      {copied ? (
        <>
          <Check size={13} className="text-green-500" />
          <span className="text-green-500">Copiado</span>
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
