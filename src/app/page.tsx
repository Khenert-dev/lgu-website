"use client";

import { useEffect, useState } from "react";

const announcements = [
  "Strawberry Festival preparations underway",
  "Municipal services schedule updated",
  "Public advisory on road maintenance",
];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  // Simple carousel autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* HERO / PARALLAX */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-100 via-green-50 to-white" />

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-green-800">
            Municipality of La Trinidad
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-green-700">
            The heart of Benguet — delivering transparent governance,
            community-centered services, and sustainable development.
          </p>
        </div>
      </section>

      {/* GLASS CARDS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
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
              className="backdrop-blur-md bg-white/60 border border-white/40
                         rounded-2xl p-6 shadow-lg hover:scale-[1.02]
                         transition-transform"
            >
              <h3 className="text-xl font-semibold text-green-800">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="bg-green-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Latest Announcements
          </h2>

          <div className="relative overflow-hidden rounded-xl bg-white shadow-md p-8">
            <p className="text-lg text-gray-700 transition-all duration-500">
              {announcements[index]}
            </p>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-green-800 mb-8">
          Quick Access
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Municipal Officials",
            "Offices & Departments",
            "Barangays",
            "Transparency Reports",
          ].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl border shadow-sm p-6
                         hover:border-green-400 hover:shadow-md
                         transition cursor-pointer"
            >
              <p className="font-medium text-gray-700">{item}</p>
              <p className="text-sm text-gray-500 mt-2">
                View detailed information
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-100 border-t">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-green-900 flex flex-col md:flex-row justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Municipality of La Trinidad, Benguet.
            All rights reserved.
          </p>
          <p className="text-green-700">
            An official government website
          </p>
        </div>
      </footer>
    </main>
  );
}
