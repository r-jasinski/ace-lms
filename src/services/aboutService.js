import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const aboutCollection = db.collection('about')

export const createAbout = async (uid, data) => {
  await aboutCollection.doc(uid).set(data)
}

export const getAbout = async user => {
  const about = await aboutCollection.doc(user).get()
  return about.data()
}

export const getAbouts = async () => {
  const get = await aboutCollection.get()
  return get.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const updateAbout = async (about, data) => {
  await aboutCollection.doc(about).update(data)
}
