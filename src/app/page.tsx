"use client";

import { useEffect, useState } from "react";

const announcements = [
  "Strawberry Festival preparations underway",
  "Municipal services schedule updated",
  "Public advisory on road maintenance",
];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-3xl bg-white rounded-2xl p-10 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            Municipality of La Trinidad
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            The heart of Benguet — delivering transparent governance,
            community-centered services, and sustainable development.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Transparency",
              desc: "Access official reports, ordinances, and public disclosures.",
            },
            {
              title: "Public Services",
              desc: "Explore municipal services and citizen programs.",
            },
            {
              title: "Community",
              desc: "Learn about barangays, events, and local initiatives.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-green-700">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="max-w-3xl bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Latest Announcements
          </h2>
          <p className="text-gray-600">
            {announcements[index]}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-2">
          <p>
            © {new Date().getFullYear()} Municipality of La Trinidad, Benguet.
          </p>
          <p>An official government website</p>
        </div>
      </footer>
    </main>
  );
}
