import {
  decrementAuthenticatedUserRanking,
  incrementAuthenticatedUserRanking
} from '@/services/rankingService'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const articlesCollection = db.collection('articles')

export const createArticle = async article => {
  await articlesCollection.doc().set(article)
  await incrementAuthenticatedUserRanking('article')
}

export const getArticle = async articleId => {
  const article = await articlesCollection.doc(articleId).get()
  return article.data()
}

export const getArticles = async () => {
  const get = await articlesCollection.get()
  return get.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const deleteArticle = async articleId => {
  await articlesCollection.doc(articleId).delete()
  await decrementAuthenticatedUserRanking('article')
}

export const updateArticle = async (articleId, article) => {
  await articlesCollection.doc(articleId).update(article)
}

export const createComment = async (articleId, comment) => {
  await articlesCollection.doc(articleId).update({
    comments: firebase.firestore.FieldValue.arrayUnion(comment)
  })
  await incrementAuthenticatedUserRanking('comment')
}

export const deleteComment = async (articleId, comment) => {
  await articlesCollection.doc(articleId).update({
    comments: firebase.firestore.FieldValue.arrayRemove(comment)
  })
  await decrementAuthenticatedUserRanking('comment')
}
