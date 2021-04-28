<template>
  <div class="article-create">
    <div>
      <editor-title
        :placeholder="editorTitlePlaceholder"
        :editable="editable"
        @input="article.title = $event"
      />
      <small class="article-create__label"
        >O título aparecerá na página inicial, portanto inclua um texto que
        possa ser utilizado logo após a sentença "Você sabia que..."</small
      >
    </div>
    <editor-body
      class="article-create__editor-body"
      :placeholder="editorBodyPlaceholder"
      :editable="editable"
      @input="article.content = $event"
    />
    <div>
      <small class="article-create__label">
        *Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >
      <div class="article-create__buttons">
        <confirm-button :label="'Publicar'" @clicked="createArticle" />
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
      editable: true,
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...',
      article: {}
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    })
  },

  methods: {
    async createArticle() {
      if (this.article.title.length > 8 && this.article.content.length > 30) {
        const UTCStringCreationTime = new Date().toUTCString()
        this.article.author = this.authenticatedUser.uid
        this.article.comments = []
        this.article.creationTime = UTCStringCreationTime
        await createArticle(this.article)
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
