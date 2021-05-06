import {
  decrementAuthenticatedUserRanking,
  incrementAuthenticatedUserRanking
} from '@/services/rankingService'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const questionsCollection = db.collection('questions')

export const createQuestion = async question => {
  await questionsCollection.doc().set(question)
  await incrementAuthenticatedUserRanking('question')
}

export const getQuestion = async questionId => {
  const question = await questionsCollection.doc(questionId).get()
  return question.data()
}

export const getQuestions = async () => {
  const get = await questionsCollection.get()
  return get.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const deleteQuestion = async questionId => {
  await questionsCollection.doc(questionId).delete()
  await decrementAuthenticatedUserRanking('question')
}

export const updateQuestion = async (questionId, question) => {
  await questionsCollection.doc(questionId).update(question)
}

export const createAnswer = async (questionId, answer) => {
  await questionsCollection.doc(questionId).update({
    answers: firebase.firestore.FieldValue.arrayUnion(answer)
  })
  await incrementAuthenticatedUserRanking('answer')
}

export const deleteAnswer = async (questionId, answer) => {
  await questionsCollection.doc(questionId).update({
    answers: firebase.firestore.FieldValue.arrayRemove(answer)
  })
  await decrementAuthenticatedUserRanking('answer')
}
