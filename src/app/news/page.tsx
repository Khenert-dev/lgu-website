export default function NewsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        News & Announcements
      </h1>

      <div className="space-y-4">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-lg">
            No announcements available
          </h2>
          <p className="text-gray-500 mt-2">
            Official announcements and public notices will be posted here.
          </p>
        </div>
      </div>
    </main>
  );
}
