import firebase_app from './config'
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore'

const db = getFirestore(firebase_app)

export default async function removeFromCollection(
  collectionName: string,
  documentId: string
) {
  const collectionRef = collection(db, collectionName)
  const docRef = doc(collectionRef, documentId)

  let error = null

  try {
    await deleteDoc(docRef)
    return { docRef }
  } catch (e) {
    error = e
  }

  return { error }
}
