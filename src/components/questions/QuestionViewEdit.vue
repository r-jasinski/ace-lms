<template>
  <div class="question-view-edit">
    <hr />
    <div class="question-view-edit__loader" v-if="loading">
      <dot-spinner :size="'40px'" :opacity="0.5" />
    </div>
    <div class="post-wrapper">
      <div class="question-view-edit__title">
        <editor-title
          :placeholder="editorTitlePlaceholder"
          :content="question.title"
          :editable="questionIsEditable"
          @input="question.title = $event"
          @title-has-error="questionHasError = $event"
        />
        <small v-if="questionIsEditable" class="question-view-edit__label"
          >O título aparecerá na listagem inicial, portanto seja claro e
          objetivo</small
        >
      </div>
      <post-info :post-info="postInfo" />
      <editor-body
        class="question-view-edit__body"
        :placeholder="editorBodyPlaceholder"
        :content="question.content"
        :editable="questionIsEditable"
        @input="question.content = $event"
        @body-has-error="questionHasError = $event"
      />
      <div v-if="!questionIsEditable" class="question-view-edit__buttons">
        <div v-if="isAdmin || isAuthor" class="question-view-edit__buttons">
          <edit-button @clicked="editQuestion" />
          <remove-button @clicked="openQuestionDeleteConfirm" />
        </div>
        <back-button
          @clicked="
            $router.push({
              name: 'QuestionsList',
              params: { savedPosition: false }
            })
          "
        />
      </div>
      <div v-else>
        <small class="question-view-edit__label">
          *Ao clicar em “Publicar”, você concorda com os termos de serviço,
          política de privacidade e política de Cookies</small
        >
        <div class="question-view-edit__buttons">
          <confirm-button
            :label="'Publicar'"
            @clicked="updateQuestion"
            :disabled="questionHasError"
          />
          <cancel-button :label="'Cancelar'" @clicked="cancelQuestionEdit" />
        </div>
      </div>
    </div>
    <hr />
    Respostas:
    <div class="question-view-edit__answers-wrapper">
      <div
        class="question-view-edit__answer"
        v-for="(answer, index) in question.answers"
        :key="index"
      >
        <post-info :post-info="getAnswerInfo(answer)" />
        <editor-body
          class="question-view-edit__body"
          :content="answer.content"
          :editable="answerIsEditabled(index)"
          @input="question.answers[index].content = $event"
          @body-has-error="answerHasError = $event"
        />
        <div
          v-if="
            !answerIsEditabled(index) &&
              (isAdmin || answer.author === authenticatedUser.uid)
          "
          class="question-view-edit__buttons"
        >
          <edit-button @clicked="editAnswer(answer, index)" />
          <remove-button @clicked="openAnswerDeleteConfirm(answer)" />
        </div>
        <div v-if="answerIsEditabled(index)">
          <small class="question-view-edit__label">
            *Ao clicar em “Publicar”, você concorda com os termos de serviço,
            política de privacidade e política de Cookies
          </small>
          <div class="question-view-edit__buttons">
            <confirm-button
              :label="'Publicar'"
              @clicked="updateAnswer(index)"
              :disabled="answerHasError"
            />
            <cancel-button
              :label="'Cancelar'"
              @clicked="cancelAnswerEdit(index)"
            />
          </div>
        </div>
      </div>
    </div>
    <editor-body
      :content="newAnswer.content"
      :placeholder="editorAnswerPlaceholder"
      @input="newAnswer.content = $event"
      @body-has-error="newAnswerHasError = $event"
      @body-is-empty="isEmpty = $event"
    />

    <small class="question-view-edit__label">
      *Ao clicar em “Publicar”, você concorda com os termos de serviço, política
      de privacidade e política de Cookies
    </small>
    <div class="question-view-edit__buttons">
      <confirm-button
        :label="'Publicar'"
        @clicked="createAnswer"
        :disabled="newAnswerHasError || isEmpty"
      />
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
  questionsCollection,
  createAnswer,
  deleteQuestion,
  deleteAnswer,
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
      answerHasError: false,
      answerIsEditable: false,
      editableAnswer: {},
      editableQuestion: {},
      editorAnswerPlaceholder: 'Escreva aqui o seu comentário...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...',
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      isEmpty: false,
      loading: false,
      newAnswer: {},
      newAnswerHasError: false,
      question: {},
      questionHasError: false,
      questionIsEditable: false
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    }),

    isAdmin() {
      return this.user(this.authenticatedUser.uid)?.isAdmin
    },

    isAuthor() {
      return this.question?.author === this.authenticatedUser.uid
    },

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

  created() {
    this.initializeQuestion()
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

    cancelQuestionEdit() {
      this.questionIsEditable = false
      this.question = this.editableQuestion
    },

    cancelAnswerEdit(answerIndex) {
      this.answerIsEditable = false
      this.question.answers[answerIndex] = this.editableAnswer
    },

    answerIsEditabled(answerIndex) {
      return answerIndex === this.answerIsEditable
    },

    async createAnswer() {
      this.newAnswer.author = this.authenticatedUser.uid
      const responseError = await createAnswer(this.question.id, this.newAnswer)
      if (!responseError) {
        this.newAnswer = {}
      }
    },

    editQuestion() {
      this.questionIsEditable = true
      this.editableQuestion = { ...this.question }
    },

    editAnswer(answer, answerIndex) {
      this.answerIsEditable = answerIndex
      this.editableAnswer = { ...answer }
    },

    ellipsizeHTML(text, length) {
      let commentText = htmlToText(text, {
        tags: { h1: { options: { uppercase: false } } }
      })
      if (commentText.length > length) {
        commentText = `${commentText.slice(0, 90)}...`
      }
      return commentText
    },

    getAnswerInfo(answer) {
      let user = this.user(answer.author)
      let creationTime = answer.creationTime
      return {
        ...user,
        creationTime
      }
    },

    initializeQuestion() {
      this.loading = true
      this.commitShowScrollPercentage(true)
      this.unsubscribe = questionsCollection
        .doc(this.$route.params.id)
        .onSnapshot(doc => {
          this.question = { ...doc.data() }
          this.question.id = doc.id
          this.loading = false
        })
    },

    async openQuestionDeleteConfirm() {
      const questionTitleText = this.ellipsizeHTML(this.question.title, 90)
      const message = `Tem certeza que deseja remover a pergunta <b>${questionTitleText}</b>?`
      try {
        await this.$dialog.confirm(message)
        this.removeQuestion()
      } catch {
        return
      }
    },

    async openAnswerDeleteConfirm(answer) {
      const answerText = this.ellipsizeHTML(answer.content, 90)
      const message = `Tem certeza que deseja remover a resposta <b>${answerText}</b>?`
      try {
        await this.$dialog.confirm(message)
        this.removeAnswer(answer)
      } catch {
        return
      }
    },

    async removeQuestion() {
      const responseError = await deleteQuestion(
        this.question.id,
        this.question.author
      )
      if (!responseError) {
        const message = `Pergunta removida com sucesso!`
        this.$toast(message, { type: 'info' })
        this.$router.push({ name: 'QuestionsList' })
      }
    },

    async removeAnswer(answer) {
      await deleteAnswer(this.question.id, answer)
    },

    async updateQuestion() {
      this.question.author = this.authenticatedUser.uid
      const responseError = await updateQuestion(
        this.question.id,
        this.question
      )
      if (!responseError) {
        const message = `Pergunta atualizada com sucesso!`
        this.$toast(message, { type: 'info' })
        this.questionIsEditable = false
      }
    },

    async updateAnswer() {
      const responseError = await updateQuestion(this.question.id, {
        answers: this.question.answers
      })
      if (!responseError) {
        this.answerIsEditable = false
      }
    }
  }
}
</script>
<style scoped>
.question-view-edit {
  backdrop-filter: blur(2px);
  margin: 0 20px 0 0;
}

.question-view-edit__loader {
  align-items: center;
  display: flex;
  justify-content: center;
}

.question-view-edit__title {
  margin-bottom: 10px;
}

.question-view-edit__label {
  font-size: 0.75em;
  opacity: 0.7;
}

.question-view-edit__buttons {
  align-items: baseline;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin: 5px 0;
}

.question-view-edit__confirm-button {
  margin: 25px 0;
}

.question-view-edit__answers-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
}

.question-view-edit__answer {
  background-color: var(--dark-20);
  border-radius: 10px;
  padding: 20px;
}

.question-view-edit hr {
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
  width: 50%;
}
</style>
