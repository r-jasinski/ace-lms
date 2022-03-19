<template>
  <div class="question-create">
    <div>
      <editor-title
        tabindex="0"
        :placeholder="editorTitlePlaceholder"
        :editable="editable"
        @input="question.title = $event"
        @title-has-error="titleHasError = $event"
      />
      <small class="question-create__label"
        >O título aparecerá na listagem principal, portanto seja claro e
        objetivo. Lembre-se: se você fizer uma pergunta vaga, terá uma resposta
        vaga. Porém, se você der detalhes e contexto, certamente encontrará uma
        resposta útil.</small
      >
    </div>
    <editor-body
      tabindex="1"
      class="question-create__editor-body"
      :placeholder="editorBodyPlaceholder"
      :editable="editable"
      @input="question.content = $event"
      @body-has-error="bodyHasError = $event"
      @body-is-empty="isEmpty = $event"
    />
    <keyword-input
      class="question-create__keyword-input"
      :v="$v.keywords"
      name="keywords"
      v-model="keywords"
    />
    <div>
      <small class="question-create__label" v-if="!hasError">
        *Ao clicar em “Publicar”, você concorda com os termos de serviço e
        política de privacidade.
      </small>
      <div class="question-create__buttons">
        <confirm-button
          :label="'Publicar'"
          @clicked="createQuestion"
          :disabled="hasError"
        />
        <cancel-button
          :label="'Cancelar'"
          @clicked="$router.push({ name: 'QuestionsList' })"
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
import { createQuestion } from '@/services/questionsService'
import { mapGetters } from 'vuex'
import { isKeywordValid } from '@/services/validatorsService'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'QuestionCreate',

  components: {
    CancelButton,
    ConfirmButton,
    EditorBody,
    EditorTitle,
    KeywordInput
  },

  data() {
    return {
      question: { keywords: [] },
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
    async createQuestion() {
      this.question.author = this.authenticatedUser.uid
      this.question.keywords = this.keywords
        .toLowerCase()
        .split(' ')
        .filter(item => item)

      this.question.answers = []
      const responseError = await createQuestion(this.question)
      if (!responseError) {
        const message = `Artigo criado com sucesso!`
        this.$toast(message, { type: 'info' })
        this.$router.push({ name: 'QuestionsList' })
      }
    }
  }
}
</script>

<style scoped>
.question-create__label {
  font-size: 0.75em;
}

.question-create__keyword-input {
  margin: 25px 0;
}

.question-create__buttons {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin: 25px 0;
}
</style>
