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
        >O título aparecerá na listagem inicial, portanto seja claro e
        objetivo</small
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
    <div>
      <small class="question-create__label">
        *Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >
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
import EditorTitle from '../shared/EditorTitle.vue'
import { createQuestion } from '@/services/questionsService'
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionCreate',

  components: { CancelButton, EditorBody, EditorTitle, ConfirmButton },

  data() {
    return {
      bodyHasError: true,
      editable: true,
      editorBodyPlaceholder: 'Escreva aqui o conteúdo da sua pergunta...',
      editorTitlePlaceholder: 'Escreva aqui o título da pergunta...',
      isEmpty: false,
      question: {},
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
    async createQuestion() {
      const UTCStringCreationTime = new Date().toUTCString()
      this.question.answers = []
      this.question.author = this.authenticatedUser.uid
      this.question.creationTime = UTCStringCreationTime
      const responseError = await createQuestion(this.question)
      if (!responseError) {
        this.$router.push({ name: 'QuestionsList' })
      }
    }
  }
}
</script>

<style scoped>
.question-create__editor-body {
  min-height: 40vh;
}

.question-create__label {
  font-size: 0.75em;
  opacity: 0.7;
}

.question-create__buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 25px 0;
  gap: 10px;
}
</style>
