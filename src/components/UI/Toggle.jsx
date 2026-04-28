export default function Toggle({ checked = true }) {
  return (
    <label
      className="relative inline-flex items-center cursor-not-allowed"
      title={checked ? "Activado" : "Desactivado"}
      aria-label={checked ? "Activado" : "Desactivado"}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        disabled
        readOnly
      />
      <div
        className={`group peer bg-white rounded-full transition-all duration-300 w-7 h-3.5 ring-2 after:duration-300 after:rounded-full after:absolute after:h-2.5 after:w-2.5 after:top-0.5 after:left-0.5 after:shadow-sm after:flex after:justify-center after:items-center peer-checked:after:translate-x-3.5 peer-hover:after:scale-95 opacity-80
        ${
          checked
            ? "ring-green-500 after:bg-green-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500"
            : "ring-gray-300 after:bg-gray-300"
        }`}
      />
    </label>
  );
}
