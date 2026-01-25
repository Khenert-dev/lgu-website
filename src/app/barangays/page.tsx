export default function BarangaysPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Barangays</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          "Barangay Pico",
          "Barangay Balili",
          "Barangay Betag",
          "Barangay Wangal",
          "Barangay Alapang",
        ].map((barangay, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <h2 className="font-semibold text-lg text-gray-800">
              {barangay}
            </h2>
            <p className="text-gray-500 mt-2">
              Barangay profile and information.
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
