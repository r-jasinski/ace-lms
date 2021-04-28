<template>
  <div class="question-create">
    <div>
      <editor-title
        :placeholder="editorTitlePlaceholder"
        :editable="editable"
        @input="question.title = $event"
      />
      <small class="question-create__label"
        >O título aparecerá na listagem inicial, portanto seja claro e
        objetivo</small
      >
    </div>
    <editor-body
      class="question-create__editor-body"
      :placeholder="editorBodyPlaceholder"
      :editable="editable"
      @input="question.content = $event"
    />
    <div>
      <small class="question-create__label">
        *Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >
      <div class="question-create__buttons">
        <confirm-button :label="'Publicar'" @clicked="createQuestion" />
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
      editable: true,
      editorTitlePlaceholder: 'Escreva aqui o título da pergunta...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo da sua pergunta...',
      question: {}
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    })
  },

  methods: {
    async createQuestion() {
      if (this.question.title.length > 8 && this.question.content.length > 30) {
        const UTCStringCreationTime = new Date().toUTCString()
        this.question.answers = []
        this.question.author = this.authenticatedUser.uid
        this.question.creationTime = UTCStringCreationTime
        await createQuestion(this.question)
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
