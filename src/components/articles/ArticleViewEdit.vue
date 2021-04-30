<template>
  <div class="post-view-edit">
    <hr />
    <div class="article-view-edit__title">
      <editor-title
        :placeholder="editorTitlePlaceholder"
        :content="article.title"
        :editable="editable"
        @input="article.title = $event"
      />
      <small v-if="editable" class="article-view-edit__label"
        >O título aparecerá na listagem inicial, portanto seja claro e
        objetivo</small
      >
    </div>
    <post-info :post-info="postInfo" />
    <editor-body
      class="article-view-edit__body"
      :placeholder="editorBodyPlaceholder"
      :content="article.content"
      :editable="editable"
      @input="article.content = $event"
    />
    <div v-if="!editable" class="article-view-edit__buttons">
      <edit-button @clicked="editable = true" />
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
        <cancel-button :label="'Cancelar'" @clicked="cancelEdit" />
      </div>
    </div>
    <hr />
    Comentários:
    <editor-body :placeholder="editorCommentPlaceholder" />
  </div>
</template>

<script>
import BackButton from '@/components/shared/BackButton'
import CancelButton from '@/components/shared/CancelButton'
import ConfirmButton from '@/components/shared/ConfirmButton'
import EditButton from '@/components/shared/EditButton'
import EditorBody from '@/components/shared/EditorBody'
import EditorTitle from '../shared/EditorTitle.vue'
import PostInfo from '@/components/shared/PostInfo'
import RemoveButton from '@/components/shared/RemoveButton'
import { htmlToText } from 'html-to-text'
import { mapActions, mapGetters } from 'vuex'
import {
  deleteArticle,
  articlesCollection,
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
      editable: false,
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...',
      editorCommentPlaceholder: 'Escreva aqui o seu comentário...',
      article: {}
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

    cancelEdit() {
      this.editable = false
      this.article.content += ' '
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

    async updateArticle() {
      if (this.article.content.length < 10 || this.article.title.length < 10) {
        return
      }
      const UTCStringCreationTime = new Date().toUTCString()
      this.article.author = this.authenticatedUser.uid
      this.article.creationTime = UTCStringCreationTime
      await updateArticle(this.article.id, this.article)
      this.editable = false
    }
  }
}
</script>

<style>
.article-view-edit__title {
  margin-bottom: 10px;
}

.article-view-edit__label {
  font-size: 0.75em;
  opacity: 0.7;
}

.article-view-edit__buttons {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin: 50px 0;
  gap: 10px;
}

.article-view-edit__confirm-button {
  margin: 25px 0;
}

.post-view-edit hr {
  width: 50%;
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
}
</style>
