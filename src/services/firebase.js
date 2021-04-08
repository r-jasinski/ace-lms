import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

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
  userImageRef.putString(file, 'base64', { contentType: 'image/jpg' })
}

export const addUserWithLinkToEmail = async email => {
  const actionCodeSettings = {
    url: `${location.origin}/sign-in`,
    handleCodeInApp: true
  }
  await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
}

export const sendPasswordResetEmail = async email =>
  await firebase.auth().sendPasswordResetEmail(email)

export const resetPassword = async (oobCode, password) => {
  if (await firebase.auth().verifyPasswordResetCode(oobCode)) {
    await firebase.auth().confirmPasswordReset(oobCode, password)
  }
}

export const isSignInWithEmailLink = () =>
  firebase.auth().isSignInWithEmailLink(window.location.href)

export const confirmAccount = async (email, name, password) => {
  await firebase.auth().signInWithEmailLink(email, window.location.href)
  const user = firebase.auth().currentUser
  await user.updateProfile({ displayName: name })
  await user.updatePassword(password)
}

export const signIn = async (email, password) =>
  await firebase.auth().signInWithEmailAndPassword(email, password)

export const signOut = async () => await firebase.auth().signOut()
