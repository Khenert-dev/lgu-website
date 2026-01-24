export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Municipality of La Trinidad, Benguet
          </h1>
          <p className="mt-4 text-lg md:text-xl text-green-100 max-w-2xl">
            Official Local Government Unit Website providing public information,
            announcements, and services for our constituents.
          </p>
        </div>
      </section>

      {/* Announcements */}
      <section className="max-w-6xl mx-auto px-6 py-14 w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Latest Announcements
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Official notices and updates from the LGU
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-gray-600">
            No announcements available at the moment.  
            Updates will be posted here by the LGU administration.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-6xl mx-auto px-6 py-14 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Quick Access
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Municipal Officials",
            "Offices & Departments",
            "Barangays",
            "Transparency & Reports",
          ].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl border shadow-sm p-6 cursor-pointer
                         hover:shadow-md hover:border-green-600 transition"
            >
              <p className="font-medium text-gray-700">{item}</p>
              <p className="text-sm text-gray-500 mt-2">
                View information and details
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-800 text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm flex flex-col md:flex-row justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Municipality of La Trinidad, Benguet.
            All rights reserved.
          </p>
          <p className="text-gray-400">
            An official government website
          </p>
        </div>
      </footer>
    </main>
  );
}
