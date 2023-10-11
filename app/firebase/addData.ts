import firebase_app from './config'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const db = getFirestore(firebase_app)
export default async function addData(
  colllection: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
) {
  let result = null
  let error = null

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    })
  } catch (e) {
    error = e
  }

  return { result, error }
}
