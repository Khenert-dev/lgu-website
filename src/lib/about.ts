import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

export async function getAboutContent() {
  const ref = doc(db, "about", "content")
  const snap = await getDoc(ref)

  if (!snap.exists()) return null
  return snap.data()
}
