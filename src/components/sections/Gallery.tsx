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
    src: "/images/bsu.png",
    caption: "Benguet State University (Km 5)",
  },
  {
    src: "/images/Kalugong.png",
    caption: "Mt. Kalugong Viewpoint",
  },
]

export default function Gallery() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-green-900">
            LGU & Community Highlights
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Life, culture, and landmarks of La Trinidad
          </p>
        </div>

       
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[260px]">

        {images.map((img, i) => (
          <figure
            key={img.src}
            className={`
              group relative overflow-hidden rounded-3xl
              bg-white
              border border-green-100
              shadow-sm hover:shadow-xl
              transition
              ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            `}
          >
            {/* IMAGE */}
            <img
              src={img.src}
              alt={img.caption}
              className="
                absolute inset-0 h-full w-full object-cover
                transition-transform duration-[900ms] ease-out
                group-hover:scale-105
              "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-900/15 to-transparent" />

            {/* CAPTION */}
            <figcaption
              className="
                absolute bottom-4 left-4
                px-4 py-2
                rounded-xl
                bg-white/95
                text-slate-900
                text-xs font-semibold
                shadow
                backdrop-blur-sm
                transition
                group-hover:bg-white
              "
            >
              {img.caption}
            </figcaption>
          </figure>
        ))}

      </div>
    </section>
  )
}
