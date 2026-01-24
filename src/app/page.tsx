export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold">
            Municipality of La Trinidad, Benguet
          </h1>
          <p className="mt-4 text-lg text-green-100">
            Official Local Government Unit Website
          </p>
        </div>
      </section>

      {/* Announcements */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-4">
          Latest Announcements
        </h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          <p>
            No announcements available at the moment.
            Updates will be posted here by the LGU administration.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-4 font-medium">
            Municipal Officials
          </div>
          <div className="bg-white rounded-lg shadow p-4 font-medium">
            Offices & Departments
          </div>
          <div className="bg-white rounded-lg shadow p-4 font-medium">
            Barangays
          </div>
          <div className="bg-white rounded-lg shadow p-4 font-medium">
            Transparency & Reports
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm">
          <p>
            © {new Date().getFullYear()} Municipality of La Trinidad, Benguet.
            All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
