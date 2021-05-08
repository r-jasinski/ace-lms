import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const usersCollection = db.collection('users')

export const createUser = async (userId, user) => {
  await usersCollection.doc(userId).set(user)
}

export const getUsers = async () => {
  const get = await usersCollection.get()
  return get.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const updateUser = async (userId, user) => {
  await usersCollection.doc(userId).update(user)
}
