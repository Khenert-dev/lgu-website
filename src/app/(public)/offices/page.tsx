import Card from "@/components/ui/card"

const MUNICIPAL_OFFICES = [
  {
    name: "Office of the Municipal Mayor",
    description:
      "Provides executive leadership, public service direction, and community development initiatives.",
    icon: "/icons/mayor-office.svg",
  },
  {
    name: "Municipal Vice Mayor and Sangguniang Bayan",
    description:
      "Legislative body responsible for municipal ordinances, resolutions, and local policy making.",
    icon: "/icons/council.svg",
  },
  {
    name: "Municipal Treasurer’s Office",
    description:
      "Responsible for revenue collection, financial reporting, and fiscal management.",
    icon: "/icons/treasurer.svg",
  },
  {
    name: "Municipal Accounting Office",
    description:
      "Handles bookkeeping, financial records, and disbursements for municipal operations.",
    icon: "/icons/accounting.svg",
  },
  {
    name: "Municipal Budget Office",
    description:
      "Prepares the municipal budget, expenditure plans, and fiscal performance reports.",
    icon: "/icons/budget.svg",
  },
  {
    name: "Municipal Health Office",
    description:
      "Promotes public health, disease prevention, and medical services to constituents.",
    icon: "/icons/health.svg",
  },
  {
    name: "Municipal Social Welfare and Development Office",
    description:
      "Provides social services, welfare programs, and community support initiatives.",
    icon: "/icons/social-welfare.svg",
  },
  {
    name: "Municipal Engineering Office",
    description:
      "Oversees infrastructure development, public works, and civil engineering projects.",
    icon: "/icons/engineering.svg",
  },
  {
    name: "Municipal Agriculture Office",
    description:
      "Supports agricultural development, farm mechanization, and livelihood programs.",
    icon: "/icons/agriculture.svg",
  },
  {
    name: "Municipal Information Office",
    description:
      "Manages public information dissemination and communication with residents.",
    icon: "/icons/information.svg",
  },
]

export default function OfficesPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 py-32 space-y-24">

        {/* ================= PAGE HEADER ================= */}
        <header className="max-w-3xl space-y-6 text-center mx-auto">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-700">
            Municipal Government Services
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-green-900 leading-tight">
            Municipal Offices
          </h1>

          <p className="text-xl text-slate-700 leading-relaxed">
            Explore the different offices that make up the Municipality of La
            Trinidad local government — each playing a key role in public
            service and community development.
          </p>
        </header>

        {/* ================= OFFICES GRID ================= */}
        <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {MUNICIPAL_OFFICES.map((office) => (
            <Card
              key={office.name}
              className="p-8 space-y-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-green-100">
                <img
                  src={office.icon}
                  alt={office.name}
                  className="h-8 w-8 object-contain"
                />
              </div>

              <h2 className="text-xl font-semibold text-green-800">
                {office.name}
              </h2>

              <p className="text-slate-700 leading-relaxed">
                {office.description}
              </p>
            </Card>
          ))}
        </section>
      </div>
    </div>
  )
}
