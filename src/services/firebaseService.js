import { handleFirebaseErrors } from '@/services/errorsService'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import Vue from 'vue'

export const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_API_ID
}

export const getAuthenticatedUser = () => firebase.auth().currentUser

export const uploadBase64AsImage = async (file, fileName) => {
  const storageRef = firebase.storage().ref()
  const userImageRef = storageRef.child(`images/${fileName}.jpg`)
  await userImageRef.putString(file, 'base64', { contentType: 'image/jpg' })
}

export const getUserPhotoURL = async fileName => {
  const storageRef = firebase.storage().ref()
  const photoURLRef = storageRef.child(`images/${fileName}.jpg`)
  return await photoURLRef.getDownloadURL()
}

export const addUserWithLinkToEmail = async email => {
  const actionCodeSettings = {
    url: `${location.origin}/sign-in`,
    handleCodeInApp: true
  }
  await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
}

export const sendPasswordResetEmail = async email => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const resetPassword = async (oobCode, password) => {
  try {
    if (await firebase.auth().verifyPasswordResetCode(oobCode)) {
      await firebase.auth().confirmPasswordReset(oobCode, password)
    }
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const isSignInWithEmailLink = () => {
  return firebase.auth().isSignInWithEmailLink(window.location.href)
}

export const confirmAccount = async (email, name, password) => {
  try {
    await firebase.auth().signInWithEmailLink(email, window.location.href)
    const user = firebase.auth().currentUser
    await user.updateProfile({ displayName: name })
    await user.updatePassword(password)
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const updateUser = async (user, profile) => {
  try {
    user.updateProfile({ ...profile })
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const signIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    const authenticatedUser = firebase.auth().currentUser
    Vue.$toast(`Bem-vindo, ${authenticatedUser.displayName}`, {
      type: 'info'
    })
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const signOut = async () => {
  try {
    const authenticatedUser = firebase.auth().currentUser
    await firebase.auth().signOut()
    Vue.$toast(`Até mais, ${authenticatedUser.displayName}`, {
      type: 'info'
    })
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}
