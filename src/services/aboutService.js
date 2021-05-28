import { handleFirebaseErrors } from '@/services/errorsService'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const aboutCollection = db.collection('about')

export const createAbout = async about => {
  try {
    const creationTime = firebase.firestore.FieldValue.serverTimestamp()
    await aboutCollection.doc().set({ ...about, creationTime })
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getAbout = async () => {
  try {
    const about = await aboutCollection
      .orderBy('creationTime', 'desc')
      .limit(1)
      .get()
    return about.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getAbouts = async () => {
  try {
    const abouts = await aboutCollection.get()
    return abouts.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const updateAbout = async (aboutId, about) => {
  try {
    await aboutCollection.doc(aboutId).update(about)
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}
