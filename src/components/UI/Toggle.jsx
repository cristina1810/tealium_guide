export default function Toggle ({ children, onClick }) {
return (
<label class="relative inline-flex items-center cursor-not-allowed">
<input type="checkbox" class="sr-only peer" value="" checked disabled />
<div
  class="group peer bg-white rounded-full duration-300 w-6 h-3 ring-2 ring-green-500 after:duration-300 after:bg-green-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-2 after:w-2 after:top-0.5 after:left-0.5 after:flex after:justify-center after:items-center peer-checked:after:translate-x-3 peer-hover:after:scale-95 opacity-70"
></div>
</label>
);
}