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
    <keyword-input
      class="article-create__keyword-input"
      :v="$v.keywords"
      name="keywords"
      v-model="keywords"
    />
    <div>
      <small class="article-create__label" v-if="!hasError">
        *Ao clicar em “Publicar”, você concorda com os termos de serviço e
        política de privacidade.
      </small>
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
import EditorTitle from '@/components/shared/EditorTitle.vue'
import KeywordInput from '@/components/shared/KeywordInput.vue'
import { createArticle } from '@/services/articlesService'
import { mapGetters } from 'vuex'
import { isKeywordValid } from '@/services/validatorsService'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'ArticleCreate',

  components: {
    CancelButton,
    ConfirmButton,
    EditorBody,
    EditorTitle,
    KeywordInput
  },

  data() {
    return {
      article: { keywords: [] },
      bodyHasError: false,
      editable: true,
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...',
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      isEmpty: false,
      keywords: '',
      titleHasError: false
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    }),

    hasError() {
      return (
        this.bodyHasError ||
        this.titleHasError ||
        this.isEmpty ||
        this.$v.keywords.$invalid
      )
    }
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
    async createArticle() {
      this.article.author = this.authenticatedUser.uid
      this.article.keywords = this.keywords
        .toLowerCase()
        .split(' ')
        .filter(item => item)

      this.article.comments = []
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
.article-create__label {
  font-size: 0.75em;
}

.article-create__keyword-input {
  margin: 25px 0;
}

.article-create__buttons {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin: 25px 0;
}
</style>
