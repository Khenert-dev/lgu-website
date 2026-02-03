export type HistoryItem = {
  year: string
  title: string
  description: string
}

export type AboutData = {
  overview: string
  role: string
  mission: string
  vision: string
  values: string[]
  sealMeaning: string
  sealImage?: string
  history: HistoryItem[]
}
