import { handleFirebaseErrors } from '@/services/errorsService'
import { getAuthenticatedUser } from '@/services/firebaseService'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

const rankingPointsMetric = {
  article: 12,
  question: 6,
  answer: 8,
  comment: 3
}

export const usersCollection = db.collection('users')

export const decrementAuthorRanking = async (authorId, content) => {
  try {
    await usersCollection.doc(authorId).update({
      rankingPoints: firebase.firestore.FieldValue.increment(
        -Math.abs(rankingPointsMetric[content])
      )
    })
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const incrementAuthenticatedUserRanking = async content => {
  try {
    const authenticatedUser = getAuthenticatedUser().uid
    await usersCollection.doc(authenticatedUser).update({
      rankingPoints: firebase.firestore.FieldValue.increment(
        rankingPointsMetric[content]
      )
    })
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}
