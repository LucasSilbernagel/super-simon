import firebase_app from './config'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const db = getFirestore(firebase_app)

export default async function getCollection(collectionName: string) {
  const collectionRef = collection(db, collectionName)

  const results: { id: string; player: string; score: number }[] = []
  let error = null

  try {
    const querySnapshot = await getDocs(collectionRef)

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      results.push({
        id: doc.id,
        player: data.player,
        score: data.score,
      })
    })
  } catch (e) {
    error = e
  }

  return { results, error }
}
