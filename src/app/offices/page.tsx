export default function OfficesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-10">
      <h1 className="text-4xl font-bold text-green-700">
        Municipal Offices
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="w-full border-collapse text-base">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left font-semibold">Office</th>
              <th className="p-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Mayor’s Office", "Executive administration"],
              ["Municipal Treasurer", "Revenue and finance"],
              ["Municipal Planning", "Development planning"],
              ["Health Office", "Public health services"],
            ].map(([office, desc]) => (
              <tr key={office} className="border-t">
                <td className="p-4">{office}</td>
                <td className="p-4 text-slate-600">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
