<template>
  <div class="article-view-edit">
    <hr />
    <div class="article-view-edit__loader" v-if="loading">
      <dot-spinner :size="'40px'" :opacity="0.5" />
    </div>
    <div class="post-wrapper">
      <div class="article-view-edit__title">
        <editor-title
          :placeholder="editorTitlePlaceholder"
          :content="article.title"
          :editable="articleIsEditable"
          @input="article.title = $event"
          @title-has-error="articleHasError = $event"
        />
        <small v-if="articleIsEditable" class="article-view-edit__label"
          >O título aparecerá na listagem inicial, portanto seja claro e
          objetivo</small
        >
      </div>
      <post-info :post-info="postInfo" />
      <editor-body
        class="article-view-edit__body"
        :placeholder="editorBodyPlaceholder"
        :content="article.content"
        :editable="articleIsEditable"
        @input="article.content = $event"
        @body-has-error="articleHasError = $event"
      />
      <keyword-input
        class="article-view-edit__keyword-input"
        v-if="articleIsEditable"
        :v="$v.keywords"
        name="keywords"
        v-model="keywords"
      />
      <div v-if="!articleIsEditable" class="article-view-edit__buttons">
        <div v-if="isAdmin || isAuthor" class="article-view-edit__buttons">
          <edit-button @clicked="editArticle" tooltipContent="artigo" />
          <remove-button
            @clicked="openArticleDeleteConfirm"
            tooltipContent="artigo"
          />
        </div>
        <back-button
          @clicked="
            $router.push({
              name: 'ArticlesList',
              params: { savedPosition: false }
            })
          "
        />
      </div>
      <div v-else>
        <small class="article-view-edit__label" v-if="!disableArticlesEdit">
          *Ao clicar em “Publicar”, você concorda com os termos de serviço e
          política de privacidade.
        </small>
        <div class="article-view-edit__buttons">
          <confirm-button
            :label="'Publicar'"
            @clicked="updateArticle"
            :disabled="disableArticlesEdit"
          />
          <cancel-button :label="'Cancelar'" @clicked="cancelArticleEdit" />
        </div>
      </div>
    </div>
    <div class="article-view-edit__likes" @click="toggleLike">
      <like-button :active="liked" v-tooltip.top-start="whoLiked" />
      <small>{{ likesCount }}</small>
    </div>
    <hr />
    Comentários:
    <div class="article-view-edit__comments-wrapper">
      <div
        class="article-view-edit__comment"
        v-for="(comment, index) in article.comments"
        :key="index"
      >
        <post-info :post-info="getCommentInfo(comment)" />
        <editor-body
          class="article-view-edit__body"
          :content="comment.content"
          :editable="commentIsEditabled(index)"
          @input="article.comments[index].content = $event"
          @body-has-error="commentHasError = $event"
        />
        <div
          v-if="
            !commentIsEditabled(index) &&
              (isAdmin || comment.author === authenticatedUser.uid)
          "
          class="article-view-edit__buttons"
        >
          <edit-button @clicked="editComment(comment, index)" />
          <remove-button @clicked="openCommentDeleteConfirm(comment)" />
        </div>
        <div v-if="commentIsEditabled(index)">
          <small class="article-view-edit__label" v-if="!commentHasError">
            *Ao clicar em “Publicar”, você concorda com os termos de serviço e
            política de privacidade.
          </small>
          <div class="article-view-edit__buttons">
            <confirm-button
              :label="'Publicar'"
              @clicked="updateComment(index)"
              :disabled="commentHasError"
            />
            <cancel-button
              :label="'Cancelar'"
              @clicked="cancelCommentEdit(index)"
            />
          </div>
        </div>
      </div>
    </div>
    <editor-body
      :content="newComment.content"
      :placeholder="editorCommentPlaceholder"
      @input="newComment.content = $event"
      @body-has-error="newCommentHasError = $event"
      @body-is-empty="isEmpty = $event"
    />
    <small class="article-view-edit__label" v-if="!disableNewCommentCreate">
      *Ao clicar em “Publicar”, você concorda com os termos de serviço e
      política de privacidade.
    </small>
    <div class="article-view-edit__buttons">
      <confirm-button
        :label="'Publicar'"
        @clicked="createComment"
        :disabled="disableNewCommentCreate"
      />
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/shared/BackButton'
import CancelButton from '@/components/shared/CancelButton'
import ConfirmButton from '@/components/shared/ConfirmButton'
import EditButton from '@/components/shared/EditButton'
import EditorBody from '@/components/shared/EditorBody'
import EditorTitle from '@/components/shared/EditorTitle.vue'
import KeywordInput from '@/components/shared/KeywordInput.vue'
import LikeButton from '@/components/shared/LikeButton'
import PostInfo from '@/components/shared/PostInfo'
import RemoveButton from '@/components/shared/RemoveButton'
import { htmlToText } from 'html-to-text'
import { mapActions, mapGetters } from 'vuex'
import {
  articlesCollection,
  createComment,
  deleteArticle,
  deleteComment,
  like,
  dislike,
  updateArticle
} from '@/services/articlesService'
import { isKeywordValid } from '@/services/validatorsService'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'ArticleViewEdit',

  components: {
    BackButton,
    CancelButton,
    ConfirmButton,
    EditButton,
    EditorBody,
    EditorTitle,
    KeywordInput,
    LikeButton,
    PostInfo,
    RemoveButton
  },

  data() {
    return {
      article: {},
      articleHasError: false,
      articleIsEditable: false,
      commentHasError: false,
      commentIsEditable: false,
      editableArticle: {},
      editableComment: {},
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...',
      editorCommentPlaceholder: 'Escreva aqui o seu comentário...',
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      isEmpty: false,
      keywords: '',
      loading: false,
      maxNamesToShow: 5,
      newComment: {},
      newCommentHasError: false
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    }),

    disableArticlesEdit() {
      return this.$v.keywords.$invalid || this.articleHasError
    },
    disableNewCommentCreate() {
      return this.newCommentHasError || this.isEmpty
    },

    isAdmin() {
      return this.user(this.authenticatedUser.uid)?.isAdmin
    },

    isAuthor() {
      return this.article?.author === this.authenticatedUser.uid
    },

    postInfo() {
      let user = this.user(this.article.author)
      let creationTime = this.article.creationTime
      return {
        ...user,
        creationTime
      }
    },

    liked() {
      return this.article?.likes?.includes(this.authenticatedUser.uid) || false
    },

    likesCount() {
      return this.article?.likes?.length || 0
    },

    whoLiked() {
      let whoLikedList = ''
      let whoLiked = ''
      this.article?.likes?.forEach((element, index) => {
        if (index < this.maxNamesToShow) {
          whoLikedList += `${this.user(element).displayName} <br>`
        }
      })
      const namesLeft = this.likesCount - this.maxNamesToShow
      const quantity = namesLeft === 1 ? 'pessoa' : 'pessoas'
      whoLiked = namesLeft < 1 ? '' : `e mais ${namesLeft} ${quantity}<br>`
      return whoLikedList + whoLiked
    }
  },

  watch: {
    article() {
      if (!this.article.title) {
        return
      }
      const articleTitleText = htmlToText(this.article.title, {
        tags: { h1: { options: { uppercase: false } } }
      })
      this.commitDocumentTitle(articleTitleText)
    }
  },

  created() {
    this.initializeArticle()
  },

  destroyed() {
    this.unsubscribe()
    this.commitShowScrollPercentage(false)
  },

  validations: {
    keywords: {
      required,
      isKeywordValid,
      minLength: minLength(6),
      maxLength: maxLength(72)
    }
  },

  methods: {
    ...mapActions({
      commitShowScrollPercentage: 'miscellaneous/commitShowScrollPercentage',
      commitDocumentTitle: 'documentTitle/commitDocumentTitle'
    }),

    cancelArticleEdit() {
      this.articleIsEditable = false
      this.article = this.editableArticle
    },

    cancelCommentEdit(commentIndex) {
      this.commentIsEditable = false
      this.article.comments[commentIndex] = this.editableComment
    },

    commentIsEditabled(commentIndex) {
      return commentIndex === this.commentIsEditable
    },

    async createComment() {
      this.newComment.author = this.authenticatedUser.uid
      const responseError = await createComment(
        this.article.id,
        this.newComment
      )
      if (!responseError) {
        this.newComment = {}
      }
    },

    editArticle() {
      this.articleIsEditable = true
      this.editableArticle = { ...this.article }
      this.keywords = this.article.keywords
        ? this.article.keywords.join(' ')
        : ''
    },

    editComment(comment, commentIndex) {
      this.commentIsEditable = commentIndex
      this.editableComment = { ...comment }
    },

    ellipsizeHTML(text, length) {
      let commentText = htmlToText(text, {
        tags: { h1: { options: { uppercase: false } } }
      })
      if (commentText.length > length) {
        commentText = `${commentText.slice(0, 90)}...`
      }
      return commentText
    },

    getCommentInfo(comment) {
      let user = this.user(comment.author)
      let creationTime = comment.creationTime
      return {
        ...user,
        creationTime
      }
    },

    initializeArticle() {
      this.commitShowScrollPercentage(true)
      this.loading = true
      this.unsubscribe = articlesCollection
        .doc(this.$route.params.id)
        .onSnapshot(doc => {
          this.article = { ...doc.data() }
          this.article.id = doc.id
          this.loading = false
        })
    },

    async openArticleDeleteConfirm() {
      const articleTitleText = this.ellipsizeHTML(this.article.title, 90)
      const message = `Tem certeza que deseja remover o artigo <b>${articleTitleText}</b>?`
      try {
        await this.$dialog.confirm(message)
        this.removeArticle()
      } catch {
        return
      }
    },

    async openCommentDeleteConfirm(comment) {
      const commentText = this.ellipsizeHTML(comment.content, 90)
      const message = `Tem certeza que deseja remover o comentário <b>${commentText}</b>?`
      try {
        await this.$dialog.confirm(message)
        this.removeComment(comment)
      } catch {
        return
      }
    },

    async removeArticle() {
      const responseError = await deleteArticle(
        this.article.id,
        this.article.author
      )
      if (!responseError) {
        const message = `Artigo removido com sucesso!`
        this.$toast(message, { type: 'info' })
        this.$router.push({ name: 'ArticlesList' })
      }
    },

    async removeComment(comment) {
      await deleteComment(this.article.id, comment)
    },

    async toggleLike() {
      const article = this.article
      const user = this.authenticatedUser.uid
      if (!this.liked) {
        like(article, user)
        return
      }
      dislike(article, user)
    },

    async updateArticle() {
      this.article.keywords = this.keywords
        .toLowerCase()
        .split(' ')
        .filter(item => item)
      const responseError = await updateArticle(this.article.id, this.article)
      if (!responseError) {
        const message = `Artigo atualizado com sucesso!`
        this.$toast(message, { type: 'info' })
        this.articleIsEditable = false
      }
    },

    async updateComment() {
      const responseError = await updateArticle(this.article.id, {
        comments: this.article.comments
      })
      if (!responseError) {
        this.commentIsEditable = false
      }
    }
  }
}
</script>

<style scoped>
.article-view-edit {
  backdrop-filter: blur(3px);
  margin: 0 20px 0 0;
}

.article-view-edit__loader {
  align-items: center;
  display: flex;
  justify-content: center;
}

.article-view-edit__label {
  font-size: 0.75em;
}

.article-view-edit__keyword-input {
  margin: 25px 0;
}

.article-view-edit__buttons {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin: 25px 0;
}

.article-view-edit__comments-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
}

.article-view-edit__comment {
  background-color: var(--dark-20);
  border-radius: 10px;
  padding: 20px;
}

.article-view-edit hr {
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
  width: 50%;
}

.article-view-edit__likes {
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article-view-edit__likes small {
  opacity: 0.5;
}
</style>
