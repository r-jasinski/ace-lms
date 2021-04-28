import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const articlesCollection = db.collection('articles')

export const createArticle = async data => {
  await articlesCollection.doc().set(data)
}

export const deleteArticle = async id => {
  await articlesCollection.doc(id).delete()
}

export const getArticle = async id => {
  const article = await articlesCollection.doc(id).get()
  return article.data()
}

export const getArticles = async () => {
  const get = await articlesCollection.get()
  return get.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const updateArticle = async (id, data) => {
  await articlesCollection.doc(id).update(data)
}
