import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const questionsCollection = db.collection('questions')

export const createQuestion = async data => {
  await questionsCollection.doc().set(data)
}

export const getQuestion = async id => {
  const questions = await questionsCollection.doc(id).get()
  return questions.data()
}

export const getQuestions = async () => {
  const get = await questionsCollection.get()
  return get.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const updateQuestion = async (id, data) => {
  await questionsCollection.doc(id).update(data)
}
