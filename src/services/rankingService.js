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

export const decrementAuthenticatedUserRanking = async content => {
  const authenticatedUser = getAuthenticatedUser().uid
  await usersCollection.doc(authenticatedUser).update({
    rankingPoints: firebase.firestore.FieldValue.increment(
      -Math.abs(rankingPointsMetric[content])
    )
  })
}

export const incrementAuthenticatedUserRanking = async content => {
  const authenticatedUser = getAuthenticatedUser().uid
  await usersCollection.doc(authenticatedUser).update({
    rankingPoints: firebase.firestore.FieldValue.increment(
      rankingPointsMetric[content]
    )
  })
}
