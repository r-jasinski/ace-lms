import { handleFirebaseErrors } from '@/services/errorsService'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const usersCollection = db.collection('users')

export const createUser = async (userId, user) => {
  try {
    await usersCollection.doc(userId).set(user)
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getUsers = async () => {
  try {
    const get = await usersCollection.get()
    return get.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const updateUser = async (userId, user) => {
  try {
    await usersCollection.doc(userId).update(user)
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}
