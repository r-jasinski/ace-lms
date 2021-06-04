import { getArticle } from '@/services/articlesService'
import { handleFirebaseErrors } from '@/services/errorsService'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()
const recommendedArticlesDoc = 'apNGYtNw1lqnDgdxvStA'

export const recommendedArticlesCollection = db.collection(
  'recommendedArticles'
)

export const addRecommendedArticle = async articleId => {
  try {
    await recommendedArticlesCollection.doc(recommendedArticlesDoc).set(
      {
        articlesIds: firebase.firestore.FieldValue.arrayUnion(articleId)
      },
      { merge: true }
    )
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const removeRecommendedArticle = async articleId => {
  try {
    await recommendedArticlesCollection.doc(recommendedArticlesDoc).update({
      articlesIds: firebase.firestore.FieldValue.arrayRemove(articleId)
    })
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

export const getRecommendedArticle = async () => {
  try {
    const recommendedArticles = await recommendedArticlesCollection
      .doc(recommendedArticlesDoc)
      .get()
    let length = recommendedArticles.data().articlesIds.length
    let index = Math.floor(Math.random() * length)
    let recommendedArticleId = recommendedArticles.data().articlesIds[index]
    let recommendedArticle = await getArticle(recommendedArticleId)
    return { id: recommendedArticleId, ...recommendedArticle }
  } catch (error) {
    handleFirebaseErrors(error.code)
    return error
  }
}

// let index =
//   Math.floor(Math.random() * (recommendedArticles.length - 1 - 0 + 1)) + 0

// export const getQuote = () => recommendedArticles[index]

// export const deleteComment = async (articleId, comment) => {
//   try {
//     await recommendedArticles.doc(articleId).update({
//       comments: firebase.firestore.FieldValue.arrayRemove(comment)
//     })
//   } catch (error) {
//     handleFirebaseErrors(error.code)
//     return error
//   }
// }
