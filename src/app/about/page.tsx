import Card from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 space-y-16">
      {/* Page Header */}
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 tracking-tight">
          About the Municipality
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Learn about the history, role, and identity of the Municipality of
          La Trinidad, the heart of Benguet Province.
        </p>
      </header>

      {/* Overview */}
      <Card className="glass glass-hover p-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Overview
        </h2>
        <p className="text-lg leading-relaxed text-slate-700">
          La Trinidad is the capital municipality of Benguet Province and
          serves as the administrative, economic, and cultural center of the
          province. It is widely recognized for its agricultural heritage,
          particularly as the Strawberry Capital of the Philippines.
        </p>
      </Card>

      {/* Role & Governance */}
      <Card className="glass glass-hover p-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Role in the Province
        </h2>
        <p className="text-lg leading-relaxed text-slate-700">
          As the seat of the provincial government, La Trinidad hosts key
          institutions and public offices that support governance, public
          services, and regional development. The municipality plays a vital
          role in policy coordination, economic growth, and service delivery
          for the people of Benguet.
        </p>
      </Card>

      {/* Community & Identity */}
      <Card className="glass glass-hover p-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Community and Identity
        </h2>
        <p className="text-lg leading-relaxed text-slate-700">
          Home to diverse communities and vibrant barangays, La Trinidad
          values transparency, citizen participation, and sustainable
          development. The municipality is committed to preserving its
          cultural heritage while embracing innovation for future
          generations.
        </p>
      </Card>
    </div>
  )
}
