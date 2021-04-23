import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const usersCollection = db.collection('users')

export const createUser = async (uid, data) => {
  await usersCollection.doc(uid).set(data)
}

export const getUsers = async () => {
  const get = await usersCollection.get()
  return get.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const updateUser = async (user, data) => {
  await usersCollection.doc(user).update(data)
}
