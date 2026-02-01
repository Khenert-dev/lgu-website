export type Barangay = {
  slug: string
  name: string
  description: string
  lat: number
  lng: number
  highlights?: string[]
}

export const BARANGAYS: Barangay[] = [
  {
    slug: "alapang",
    name: "Alapang",
    description:
      "Alapang is a peaceful upland barangay known for agriculture and cool mountain climate.",
    lat: 16.4705,
    lng: 120.5678,
    highlights: ["Agriculture", "Highland terrain"],
  },
  {
    slug: "alno",
    name: "Alno",
    description:
      "Alno is known for scenic landscapes and vegetable farming communities.",
    lat: 16.4721,
    lng: 120.5532,
  },
  {
    slug: "ambiong",
    name: "Ambiong",
    description:
      "Ambiong serves as a commercial and residential hub of La Trinidad.",
    lat: 16.4558,
    lng: 120.5959,
    highlights: ["Commercial center", "Schools"],
  },
  {
    slug: "balili",
    name: "Balili",
    description:
      "Balili is home to major educational and research institutions.",
    lat: 16.4686,
    lng: 120.5968,
  },
  {
    slug: "beckel",
    name: "Beckel",
    description:
      "Beckel is a growing residential barangay with mixed development.",
    lat: 16.4814,
    lng: 120.5961,
  },
  {
    slug: "betag",
    name: "Betag",
    description:
      "Betag is one of the most urbanized barangays in La Trinidad.",
    lat: 16.4579,
    lng: 120.5856,
  },
  {
    slug: "cruz",
    name: "Cruz",
    description:
      "Cruz is a culturally rich barangay with strong community traditions.",
    lat: 16.4632,
    lng: 120.5802,
  },
  {
    slug: "lubas",
    name: "Lubas",
    description:
      "Lubas features agricultural lands and expanding residential zones.",
    lat: 16.4435,
    lng: 120.6074,
  },
  {
    slug: "pico",
    name: "Pico",
    description:
      "Pico is a major gateway barangay with markets and transport terminals.",
    lat: 16.4589,
    lng: 120.5941,
    highlights: ["Transport hub", "Markets"],
  },
]
