"use client"

const images = [
  {
    src: "/images/Strawberry.png",
    caption: "La Trinidad Strawberry Farm",
  },
  {
    src: "/images/latri.png",
    caption: "Panoramic View of La Trinidad",
  },
  {
    src: "/images/market.png",
    caption: "La Trinidad Public Market",
  },
  {
    src: "images/bsu.png",
    caption: "Benguet State University (Km 5)",
  },
  {
    src: "/images/Kalugong.png",
    caption: "Mt. Kalugong Viewpoint",
  },
]

export default function Gallery() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-3xl font-bold text-green-700 mb-10">
        LGU & Community Highlights
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img) => (
          <figure
            key={img.src}
            className="group overflow-hidden rounded-2xl shadow-lg bg-white"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="p-4 text-sm text-slate-600">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
