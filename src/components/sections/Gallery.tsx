export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  ]

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-3xl font-bold text-green-700 mb-10">
        Community & Events
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="glass glass-hover rounded-2xl overflow-hidden"
          >
            <img
              src={src}
              alt=""
              className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
