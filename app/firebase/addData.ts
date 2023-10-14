import firebase_app from './config'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const db = getFirestore(firebase_app)

export default async function addToCollection(
  collectionName: string,
  newItem: { player: string; score: number }
) {
  const collectionRef = collection(db, collectionName)

  let error = null

  try {
    const docRef = await addDoc(collectionRef, newItem)
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    error = e
  }

  return { error }
}
