export default function VideoButton() {
  return (
    <button
      type="button"
      className="relative flex items-center px-5 py-1.5 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group shadow-sm hover:shadow-md active:scale-[0.98]"
    >
      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
      </span>
      <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
      </span>
      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0" />
      <span className="relative w-full text-sm font-semibold tracking-tight text-left text-white transition-colors duration-200 ease-in-out">
        Ver vídeo
      </span>
    </button>
  );
}
