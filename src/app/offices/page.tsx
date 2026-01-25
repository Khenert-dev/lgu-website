export default function OfficesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Offices & Departments</h1>

      <div className="space-y-4">
        {[
          "Municipal Planning and Development Office",
          "Municipal Health Office",
          "Municipal Social Welfare and Development Office",
          "Municipal Engineering Office",
        ].map((office, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <h2 className="font-semibold text-lg text-gray-800">
              {office}
            </h2>
            <p className="text-gray-500 mt-2">
              Description and contact information will be available here.
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
