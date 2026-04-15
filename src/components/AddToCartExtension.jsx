export default function AddToCartExtension() {
  return (
    <div className="p-4 border rounded-lg border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Add To Cart Extension</h2>
      <div className="mb-4">
        <span className="block text-xs text-gray-700 font-medium mb-2">
          Extension Name:
        </span>
        <input
          value={"Add To Cart Extension"}
          className="w-64 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}
