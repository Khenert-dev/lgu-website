"use client"

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-100/40">

      {/* FLOATING CIRCLES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-24 left-16 h-40 w-40 rounded-full bg-green-400/30 blur-3xl"
          style={{ animation: "float 12s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/3 right-20 h-56 w-56 rounded-full bg-emerald-400/30 blur-3xl"
          style={{ animation: "float 14s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-32 left-1/4 h-32 w-32 rounded-full bg-green-300/30 blur-2xl"
          style={{ animation: "float 10s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-20 right-1/3 h-48 w-48 rounded-full bg-emerald-300/30 blur-3xl"
          style={{ animation: "float 16s ease-in-out infinite" }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative max-w-5xl mx-auto px-6 py-28 space-y-24">

        {/* HEADER */}
        <header className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
            Contact Us
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 tracking-tight">
            Get in Touch with the Municipality
          </h1>

          <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
            For inquiries, concerns, or official transactions, you may reach the
            Municipality of La Trinidad through the details below.
          </p>
        </header>

        {/* CONTACT CARDS */}
        <section className="grid gap-12 md:grid-cols-3">
          {[
            { title: "Email", value: "contact@latrinidad.gov.ph" },
            { title: "Phone", value: "(074) 123-4567" },
            { title: "Office Hours", value: "Monday – Friday\n8:00 AM – 5:00 PM" },
          ].map((item) => (
            <div
              key={item.title}
              className="
                group relative
                rounded-[32px]
                bg-white
                p-8
                border border-green-200/70
                shadow-[0_18px_45px_-30px_rgba(0,0,0,0.25)]
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-[0_30px_80px_-30px_rgba(16,185,129,0.45)]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute -inset-1
                  rounded-[36px]
                  opacity-0
                  blur-2xl
                  transition
                  group-hover:opacity-100
                  bg-gradient-to-br
                  from-green-400/30
                  via-emerald-400/30
                  to-green-500/30
                "
              />

              <div className="relative z-10 space-y-3">
                <h2 className="text-lg font-semibold text-green-800">
                  {item.title}
                </h2>
                <p className="text-slate-700 whitespace-pre-line">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* LOCATION */}
        <section
          className="
            group relative
            rounded-[40px]
            bg-white
            p-12
            border border-green-200/70
            shadow-[0_22px_60px_-35px_rgba(0,0,0,0.3)]
            transition-all duration-300
            hover:-translate-y-2
            hover:shadow-[0_40px_100px_-40px_rgba(16,185,129,0.45)]
          "
        >
          <div
            className="
              pointer-events-none
              absolute -inset-1
              rounded-[44px]
              opacity-0
              blur-3xl
              transition
              group-hover:opacity-100
              bg-gradient-to-br
              from-green-400/30
              via-emerald-400/30
              to-green-500/30
            "
          />

          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl font-semibold text-green-800">
              Visit Us
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Municipal Hall<br />
              La Trinidad, Benguet<br />
              Philippines
            </p>
          </div>
        </section>

      </div>

      {/* KEYFRAMES */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
