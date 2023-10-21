import firebase_app from './config'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const db = getFirestore(firebase_app)

/** Add an item to a Firebase collection */
export default async function addToCollection(
  collectionName: string,
  newItem: { player: string; score: number }
) {
  const collectionRef = collection(db, collectionName)
  let error = null
  try {
    const docRef = await addDoc(collectionRef, newItem)
    return { docRef }
  } catch (e) {
    error = e
  }
  return { error }
}
