import { handleFirebaseErrors } from '@/services/errorsService'
import {
  decrementArticleAuthorRanking,
  decrementAuthorRanking,
  incrementArticleAuthorRanking,
  incrementAuthenticatedUserRanking
} from '@/services/rankingService'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const articlesCollection = db.collection('articles')

export const createArticle = async article => {
  try {
    const creationTime = firebase.firestore.FieldValue.serverTimestamp()
    await articlesCollection.doc().set({ ...article, creationTime })
    await incrementAuthenticatedUserRanking('article')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getArticle = async articleId => {
  try {
    const article = await articlesCollection.doc(articleId).get()
    return article.data()
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

let lastVisible

export const getArticles = async (orderBy = 'creationTime', limit = 1000) => {
  try {
    const articles = await articlesCollection
      .orderBy(orderBy, 'desc')
      .limit(limit)
      .get()
    lastVisible = articles.docs[articles.size - 1]
    return articles.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getNextArticles = async (
  orderBy = 'creationTime',
  limit = 1000
) => {
  try {
    const nextArticles = await articlesCollection
      .orderBy(orderBy, 'desc')
      .startAfter(lastVisible)
      .limit(limit)
      .get()
    lastVisible = nextArticles.docs[nextArticles.size - 1] || lastVisible

    return nextArticles.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const deleteArticle = async (articleId, authorId) => {
  try {
    await articlesCollection.doc(articleId).delete()
    await decrementAuthorRanking(authorId, 'article')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const updateArticle = async (articleId, article) => {
  try {
    await articlesCollection.doc(articleId).update(article)
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const createComment = async (articleId, comment) => {
  try {
    const creationTime = new Date()
    await articlesCollection.doc(articleId).update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        ...comment,
        creationTime
      })
    })
    await incrementAuthenticatedUserRanking('comment')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const deleteComment = async (articleId, comment) => {
  try {
    await articlesCollection.doc(articleId).update({
      comments: firebase.firestore.FieldValue.arrayRemove(comment)
    })
    await decrementAuthorRanking(comment.author, 'comment')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const like = async (article, userId) => {
  try {
    await articlesCollection.doc(article.id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(userId)
    })
    await incrementArticleAuthorRanking(article.author, 'like')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const dislike = async (article, userId) => {
  try {
    await articlesCollection.doc(article.id).update({
      likes: firebase.firestore.FieldValue.arrayRemove(userId)
    })
    await decrementArticleAuthorRanking(article.author, 'like')
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}
