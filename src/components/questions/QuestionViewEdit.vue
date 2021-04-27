<template>
  <div class="question-view-edit">
    <hr />
    <div class="question-view-edit__title">
      <editor-title
        :placeholder="editorTitlePlaceholder"
        :content="question.title"
        :editable="editable"
      />
      <small v-if="editable" class="question-view-edit__label"
        >O título aparecerá na listagem inicial, portanto seja claro e
        objetivo</small
      >
    </div>
    <post-info :post-info="question" />
    <editor-body
      :placeholder="editorBodyPlaceholder"
      :content="question.text"
      :editable="editable"
    />
    <div v-if="!editable" class="question-view-edit__buttons">
      <edit-button @clicked="editQuestion" />
      <remove-button :remove="removeQuestion" />
    </div>
    <div v-else>
      <small class="question-view-edit__label">
        *Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >
      <confirm-button
        class="question-view-edit__confirm-button"
        :label="'Publicar'"
      />
    </div>
    <hr />
    Respostas:
    <editor-body :placeholder="editorAnswerPlaceholder" />
  </div>
</template>

<script>
import EditorBody from '@/components/shared/EditorBody'
import EditorTitle from '../shared/EditorTitle.vue'
import PostInfo from '@/components/shared/PostInfo'
import ConfirmButton from '@/components/shared/ConfirmButton'
import RemoveButton from '@/components/shared/RemoveButton'
import EditButton from '@/components/shared/EditButton'
import { htmlToText } from 'html-to-text'
import { mapActions } from 'vuex'
import { questionsCollection } from '@/services/questionsService'

export default {
  name: 'QuestionViewEdit',

  components: {
    RemoveButton,
    EditButton,
    EditorBody,
    EditorTitle,
    PostInfo,
    ConfirmButton
  },

  data() {
    return {
      editable: false,
      editorTitlePlaceholder: 'Escreva aqui o título da pergunta...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo da sua pergunta...',
      editorAnswerPlaceholder: 'Escreva aqui a sua resposta...',
      question: {}
    }
  },

  watch: {
    question() {
      if (!this.question.title) {
        return
      }
      const questionTitleText = htmlToText(this.question.title, {
        tags: { h1: { options: { uppercase: false } } }
      })
      this.commitDocumentTitle(questionTitleText)
    }
  },

  mounted() {
    this.initializeQuestion()
  },

  destroyed() {
    this.unsubscribe()
  },

  methods: {
    ...mapActions({
      commitDocumentTitle: 'documentTitle/commitDocumentTitle'
    }),

    removeQuestion() {
      this.question = {}
    },

    editQuestion() {
      this.editable = true
    },

    initializeQuestion() {
      this.unsubscribe = questionsCollection
        .doc(this.$route.params.id)
        .onSnapshot(doc => {
          this.question = { ...doc.data() }
        })
    }
  }
}
</script>

<style scoped>
.question-view-edit {
  padding: 0 5%;
}

.question-view-edit__title {
  margin-bottom: 10px;
}

.question-view-edit__label {
  font-size: 0.75em;
  opacity: 0.7;
}

.question-view-edit__buttons {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 10px;
}

.question-view-edit__confirm-button {
  margin-top: 25px;
}

.question-view-edit hr {
  width: 50%;
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
  margin-bottom: 50px;
}
</style>
