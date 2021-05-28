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

export const getUser = async userId => {
  try {
    const user = await usersCollection.doc(userId).get()
    return {
      id: user.id,
      ...user.data()
    }
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const filterUsersBy = async (field, value) => {
  try {
    const users = await usersCollection
      .orderBy(field)
      .orderBy('rankingPoints', 'desc')
      .where(field, '>=', value)
      .where(field, '<=', value + '\uf8ff')
      .get()
    return users.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

let lastVisible

export const getUsers = async (
  orderBy = 'creationTime',
  sort = 'desc',
  limit = 1000
) => {
  try {
    const users = await usersCollection
      .orderBy(orderBy, sort)
      .limit(limit)
      .get()
    lastVisible = users.docs[users.size - 1]
    return users.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getNextUsers = async (
  orderBy = 'creationTime',
  sort = 'desc',
  limit = 1000
) => {
  try {
    const nextUsers = await usersCollection
      .orderBy(orderBy, sort)
      .startAfter(lastVisible)
      .limit(limit)
      .get()
    lastVisible = nextUsers.docs[nextUsers.size - 1] || lastVisible

    return nextUsers.docs.map(doc => ({
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

export const updateUserEmail = async (user, email) => {
  try {
    await user.updateEmail(email)
  } catch (error) {
    handleFirebaseErrors(error.code, 'atualizar email')
    return error
  }
}

export const updateUserPassword = async (user, password) => {
  try {
    await user.updatePassword(password)
  } catch (error) {
    handleFirebaseErrors(error.code, 'atualizar senha')
    return error
  }
}
