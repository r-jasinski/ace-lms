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
