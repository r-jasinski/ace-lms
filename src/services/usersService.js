import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const usersCollection = db.collection('users')

export const createUser = async (uid, data) => {
  await usersCollection.doc(uid).set(data)
}

export const getUsers = async () => {
  const snapshot = await usersCollection.get()
  return snapshot.docs.map(doc => ({
    id: doc.id,
    data: doc.data()
  }))
}

export const updateUser = async (user, data) => {
  await usersCollection.doc(user).update(data)
}
