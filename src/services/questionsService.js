import { handleFirebaseErrors } from '@/services/errorsService'
import {
  decrementAuthorRanking,
  incrementAuthenticatedUserRanking
} from '@/services/rankingService'
import firebase from 'firebase/app'

const db = firebase.firestore()

export const questionsCollection = db.collection('questions')

export const createQuestion = async question => {
  try {
    const creationTime = firebase.firestore.FieldValue.serverTimestamp()
    await questionsCollection.doc().set({ ...question, creationTime })
    await incrementAuthenticatedUserRanking('question')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getQuestion = async questionId => {
  try {
    const question = await questionsCollection.doc(questionId).get()
    return question.data()
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const filterQuestionsBy = async (field, arrayFilter) => {
  try {
    const questions = await questionsCollection
      .where(field, 'array-contains-any', [...arrayFilter])
      .get()
    return questions.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

let lastVisible

export const getQuestions = async (
  orderBy = 'creationTime',
  sort = 'desc',
  limit = 1000
) => {
  try {
    const questions = await questionsCollection
      .orderBy(orderBy, sort)
      .limit(limit)
      .get()
    lastVisible = questions.docs[questions.size - 1]
    return questions.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getNextQuestions = async (
  orderBy = 'creationTime',
  sort = 'desc',
  limit = 1000
) => {
  try {
    const nextQuestions = await questionsCollection
      .orderBy(orderBy, sort)
      .startAfter(lastVisible)
      .limit(limit)
      .get()
    lastVisible = nextQuestions.docs[nextQuestions.size - 1] || lastVisible
    return nextQuestions.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const deleteQuestion = async (questionId, authorId) => {
  try {
    await questionsCollection.doc(questionId).delete()
    await decrementAuthorRanking(authorId, 'question')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const updateQuestion = async (questionId, question) => {
  try {
    await questionsCollection.doc(questionId).update(question)
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const createAnswer = async (questionId, answer) => {
  try {
    const creationTime = new Date()
    await questionsCollection.doc(questionId).update({
      answers: firebase.firestore.FieldValue.arrayUnion({
        ...answer,
        creationTime
      }),
      answersCount: firebase.firestore.FieldValue.increment(1)
    })
    await incrementAuthenticatedUserRanking('answer')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const deleteAnswer = async (questionId, answer) => {
  try {
    await questionsCollection.doc(questionId).update({
      answers: firebase.firestore.FieldValue.arrayRemove(answer),
      answersCount: firebase.firestore.FieldValue.increment(-1)
    })
    await decrementAuthorRanking(answer.author, 'answer')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}
