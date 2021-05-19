<template>
  <div class="article-create">
    <div>
      <editor-title
        tabindex="0"
        :placeholder="editorTitlePlaceholder"
        :editable="editable"
        @input="article.title = $event"
        @title-has-error="titleHasError = $event"
      />
      <small class="article-create__label"
        >O título aparecerá na página inicial, portanto inclua um texto que
        possa ser utilizado logo após a sentença "Você sabia que..."</small
      >
    </div>
    <editor-body
      tabindex="1"
      class="article-create__editor-body"
      :placeholder="editorBodyPlaceholder"
      :editable="editable"
      @input="article.content = $event"
      @body-has-error="bodyHasError = $event"
      @body-is-empty="isEmpty = $event"
    />
    <div>
      <small class="article-create__label">
        *Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >
      <div class="article-create__buttons">
        <confirm-button
          :label="'Publicar'"
          @clicked="createArticle"
          :disabled="hasError"
        />
        <cancel-button
          :label="'Cancelar'"
          @clicked="$router.push({ name: 'ArticlesList' })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CancelButton from '@/components/shared/CancelButton'
import ConfirmButton from '@/components/shared/ConfirmButton'
import EditorBody from '@/components/shared/EditorBody'
import EditorTitle from '../shared/EditorTitle.vue'
import { createArticle } from '@/services/articlesService'
import { mapGetters } from 'vuex'

export default {
  name: 'ArticleCreate',

  components: { CancelButton, EditorBody, EditorTitle, ConfirmButton },

  data() {
    return {
      article: {},
      bodyHasError: true,
      editable: true,
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...',
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      isEmpty: false,
      titleHasError: true
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    }),
    hasError() {
      return this.bodyHasError || this.titleHasError || this.isEmpty
    }
  },

  methods: {
    async createArticle() {
      const UTCStringCreationTime = new Date().toUTCString()
      this.article.author = this.authenticatedUser.uid
      this.article.comments = []
      this.article.creationTime = UTCStringCreationTime
      const responseError = await createArticle(this.article)
      if (!responseError) {
        const message = `Artigo criado com sucesso!`
        this.$toast(message, { type: 'info' })
        this.$router.push({ name: 'ArticlesList' })
      }
    }
  }
}
</script>

<style scoped>
.article-create__editor-body {
  min-height: 40vh;
}

.article-create__label {
  font-size: 0.75em;
  opacity: 0.7;
}

.article-create__buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 25px 0;
  gap: 10px;
}
</style>
