<template>
  <div class="question-view-edit">
    <hr />
    <div class="question-view-edit__title">
      <editor-title
        :placeholder="editorTitlePlaceholder"
        :content="question.title"
        :editable="editable"
        @input="question.title = $event"
      />
      <small v-if="editable" class="question-view-edit__label"
        >O título aparecerá na listagem inicial, portanto seja claro e
        objetivo</small
      >
    </div>
    <post-info :post-info="postInfo" />
    <editor-body
      :placeholder="editorBodyPlaceholder"
      :content="question.content"
      :editable="editable"
      @input="question.content = $event"
    />
    <div v-if="!editable" class="question-view-edit__buttons">
      <edit-button @clicked="editable = true" />
      <remove-button @clicked="removeQuestion" />
      <back-button @clicked="$router.go(-1)" />
    </div>
    <div v-else>
      <small class="question-view-edit__label">
        *Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >
      <div class="question-view-edit__buttons">
        <confirm-button :label="'Publicar'" @clicked="updateQuestion" />
        <cancel-button :label="'Cancelar'" @clicked="cancelEdit" />
      </div>
    </div>
    <hr />
    Respostas:
    <editor-body :placeholder="editorAnswerPlaceholder" />
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
  deleteQuestion,
  questionsCollection,
  updateQuestion
} from '@/services/questionsService'

export default {
  name: 'QuestionViewEdit',

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
      editorAnswerPlaceholder: 'Escreva aqui a sua resposta...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo da sua pergunta...',
      editorTitlePlaceholder: 'Escreva aqui o título da pergunta...',
      question: {}
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    }),

    postInfo() {
      let user = this.user(this.question.author)
      let creationTime = this.question.creationTime
      return {
        ...user,
        creationTime
      }
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

    cancelEdit() {
      this.editable = false
      this.question.content += ' '
    },

    initializeQuestion() {
      this.unsubscribe = questionsCollection
        .doc(this.$route.params.id)
        .onSnapshot(doc => {
          this.question = { ...doc.data() }
          this.question.id = doc.id
        })
    },

    async removeQuestion() {
      await deleteQuestion(this.question.id)
      this.$router.push({ name: 'QuestionsList' })
    },

    async updateQuestion() {
      if (
        this.question.content.length < 10 ||
        this.question.title.length < 10
      ) {
        return
      }
      const UTCStringCreationTime = new Date().toUTCString()
      this.question.author = this.authenticatedUser.uid
      this.question.creationTime = UTCStringCreationTime
      await updateQuestion(this.question.id, this.question)
      this.editable = false
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
  margin: 50px 0;
  gap: 10px;
}

.question-view-edit hr {
  width: 50%;
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
}
</style>
