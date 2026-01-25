export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-green-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold">About the Municipality</h1>
          <p className="mt-3 text-green-100">
            Official information about the Municipality of La Trinidad, Benguet.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-gray-700 leading-relaxed">
            La Trinidad is the capital municipality of Benguet Province and serves
            as the administrative, economic, and cultural center of the province.
          </p>
        </div>
      </section>
    </main>
  );
}
