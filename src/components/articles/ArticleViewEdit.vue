<template>
  <div class="article-view-edit">
    <hr />
    <div class="post-wrapper">
      <div class="article-view-edit__title">
        <editor-title
          :placeholder="editorTitlePlaceholder"
          :content="article.title"
          :editable="articleIsEditable"
          @input="article.title = $event"
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
      />
      <div v-if="!articleIsEditable" class="article-view-edit__buttons">
        <edit-button @clicked="editArticle" />
        <remove-button @clicked="removeArticle" />
        <back-button @clicked="$router.go(-1)" />
      </div>
      <div v-else>
        <small class="article-view-edit__label">
          *Ao clicar em “Publicar”, você concorda com os termos de serviço,
          política de privacidade e política de Cookies</small
        >
        <div class="article-view-edit__buttons">
          <confirm-button :label="'Publicar'" @clicked="updateArticle" />
          <cancel-button :label="'Cancelar'" @clicked="cancelArticleEdit" />
        </div>
      </div>
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
        />
        <div
          v-if="!commentIsEditabled(index)"
          class="article-view-edit__buttons"
        >
          <edit-button @clicked="editComment(comment, index)" />
          <remove-button @clicked="removeComment(comment)" />
        </div>
        <div v-else>
          <small class="article-view-edit__label">
            *Ao clicar em “Publicar”, você concorda com os termos de serviço,
            política de privacidade e política de Cookies
          </small>
          <div class="article-view-edit__buttons">
            <confirm-button
              :label="'Publicar'"
              @clicked="updateComment(index)"
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
    />
    <small class="article-view-edit__label">
      *Ao clicar em “Publicar”, você concorda com os termos de serviço, política
      de privacidade e política de Cookies
    </small>
    <div class="article-view-edit__buttons">
      <confirm-button :label="'Publicar'" @clicked="createComment" />
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
import PostInfo from '@/components/shared/PostInfo'
import RemoveButton from '@/components/shared/RemoveButton'
import { htmlToText } from 'html-to-text'
import { mapActions, mapGetters } from 'vuex'
import {
  articlesCollection,
  createComment,
  deleteArticle,
  deleteComment,
  updateArticle
} from '@/services/articlesService'

export default {
  name: 'ArticleViewEdit',

  components: {
    BackButton,
    CancelButton,
    ConfirmButton,
    EditButton,
    EditorBody,
    EditorTitle,
    PostInfo,
    RemoveButton
  },

  data() {
    return {
      article: {},
      articleIsEditable: false,
      commentIsEditable: false,
      editableArticle: {},
      editableComment: {},
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...',
      editorCommentPlaceholder: 'Escreva aqui o seu comentário...',
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      newComment: {}
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    }),

    postInfo() {
      let user = this.user(this.article.author)
      let creationTime = this.article.creationTime
      return {
        ...user,
        creationTime
      }
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

  mounted() {
    this.initializeArticle()
  },

  destroyed() {
    this.unsubscribe()
    this.commitShowScrollPercentage(false)
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
      if (this.newComment.content?.length > 10) {
        const UTCStringCreationTime = new Date().toUTCString()
        this.newComment.author = this.authenticatedUser.uid
        this.newComment.creationTime = UTCStringCreationTime
        await createComment(this.article.id, this.newComment)
        this.newComment = {}
      }
    },

    editArticle() {
      this.articleIsEditable = true
      this.editableArticle = { ...this.article }
    },

    editComment(comment, commentIndex) {
      this.commentIsEditable = commentIndex
      this.editableComment = { ...comment }
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
      this.unsubscribe = articlesCollection
        .doc(this.$route.params.id)
        .onSnapshot(doc => {
          this.article = { ...doc.data() }
          this.article.id = doc.id
        })
    },

    async removeArticle() {
      await deleteArticle(this.article.id)
      this.$router.push({ name: 'ArticlesList' })
    },

    async removeComment(comment) {
      await deleteComment(this.article.id, comment)
    },

    async updateArticle() {
      if (this.article.content.length < 10 || this.article.title.length < 10) {
        return
      }
      const UTCStringCreationTime = new Date().toUTCString()
      this.article.author = this.authenticatedUser.uid
      this.article.creationTime = UTCStringCreationTime
      await updateArticle(this.article.id, this.article)
      this.articleIsEditable = false
    },

    async updateComment(commentId) {
      const UTCStringCreationTime = new Date().toUTCString()
      this.article.comments[commentId].creationTime = UTCStringCreationTime
      await updateArticle(this.article.id, {
        comments: this.article.comments
      })
      this.commentIsEditable = false
    }
  }
}
</script>

<style scoped>
.article-view-edit__title {
  margin-bottom: 10px;
}

.article-view-edit__label {
  font-size: 0.75em;
  opacity: 0.7;
}

.article-view-edit__buttons {
  align-items: baseline;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin: 5px 0;
}

.article-view-edit__confirm-button {
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
</style>
