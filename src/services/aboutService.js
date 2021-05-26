import { handleFirebaseErrors } from '@/services/errorsService'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const aboutCollection = db.collection('about')

export const createAbout = async (id, data) => {
  try {
    await aboutCollection.doc(id).set(data)
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getAbout = async user => {
  try {
    const about = await aboutCollection.doc(user).get()
    return about.data()
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

export const updateAbout = async (about, data) => {
  try {
    await aboutCollection.doc(about).update(data)
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}
