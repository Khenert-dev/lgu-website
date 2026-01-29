import Card from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-12">
      <h1 className="text-4xl font-bold text-green-700">
        About the Municipality
      </h1>

      <Card>
        <p className="text-lg leading-relaxed text-slate-700">
          La Trinidad is the capital municipality of Benguet Province and
          serves as the administrative, economic, and cultural center
          of the province.
        </p>
      </Card>
    </div>
  )
}
