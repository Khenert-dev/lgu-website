"use client"

const images = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/57/La_Trinidad_Strawberry_Farm.jpg",
    caption: "La Trinidad Strawberry Farm",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/1f/La_Trinidad_Benguet_Panorama.jpg",
    caption: "Panoramic View of La Trinidad",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/La_Trinidad_Public_Market.jpg",
    caption: "La Trinidad Public Market",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Benguet_State_University_Main_Gate.jpg",
    caption: "Benguet State University (Km 5)",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/89/Stobosa_Hillside_Homes_La_Trinidad.jpg",
    caption: "StoBoSa Hillside Homes Art",
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
