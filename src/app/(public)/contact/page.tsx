export default function ContactPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-8 py-32 space-y-24">

        {/* ================= PAGE HEADER ================= */}
        <header className="max-w-3xl space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-700">
            Get in Touch
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-green-900">
            Contact the Municipality
          </h1>

          <p className="text-xl text-slate-700 leading-relaxed">
            For inquiries, concerns, or feedback, you may reach out to the
            Municipality of La Trinidad through the form below.
          </p>
        </header>

        {/* ================= FORM ================= */}
        <section className="grid gap-16 md:grid-cols-2 items-start">

          {/* INFO SIDE */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-green-800">
              Public Assistance & Inquiries
            </h2>

            <p className="text-slate-700 leading-relaxed">
              Messages submitted through this form are forwarded to the
              appropriate municipal office. Please provide accurate contact
              details to ensure a timely response.
            </p>

            <div className="space-y-4 text-slate-700">
              <p>
                <strong>Office Hours:</strong><br />
                Monday – Friday, 8:00 AM – 5:00 PM
              </p>

              <p>
                <strong>Location:</strong><br />
                Municipal Hall, La Trinidad, Benguet
              </p>
            </div>
          </div>

          {/* FORM CARD */}
          <form
            className="
              bg-white/80
              backdrop-blur
              border border-green-200
              rounded-3xl
              p-10
              shadow-xl
              space-y-6
            "
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Juan Dela Cruz"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="juan@email.com"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message here…"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="
                w-full
                rounded-xl
                bg-green-700
                py-4
                text-white
                font-semibold
                hover:bg-green-800
                transition
              "
            >
              Submit Message
            </button>

            <p className="text-xs text-slate-500 text-center">
              Your information will be used solely for official communication.
            </p>
          </form>
        </section>

      </div>
    </div>
  )
}
