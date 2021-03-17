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
      <edit-button :edit="editQuestion" />
      <remove-button :remove="removeQuestion" />
    </div>
    <div v-else>
      <small class="question-view-edit__label">
        Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >
      <publish-button />
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
import PublishButton from '@/components/shared/PublishButton'
import RemoveButton from '@/components/shared/RemoveButton'
import EditButton from '@/components/shared/EditButton'

export default {
  name: 'QuestionViewEdit',

  components: {
    RemoveButton,
    EditButton,
    EditorBody,
    EditorTitle,
    PostInfo,
    PublishButton
  },

  data() {
    return {
      editable: false,
      editorTitlePlaceholder: 'Escreva aqui o título da pergunta...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo da sua pergunta...',
      editorAnswerPlaceholder: 'Escreva aqui a sua resposta...',
      question: {
        autor: 'anna_nowak',
        postDate: '5 horas atrás',
        title:
          '<h1>O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos</h1>',
        text:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisiLorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi '
      }
    }
  },

  methods: {
    removeQuestion() {
      this.question = {}
    },
    editQuestion() {
      this.editable = true
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
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.question-view-edit hr {
  width: 50%;
  border: none;
  border-top: 1px dotted var(--dark);
  opacity: 0.2;
  margin-bottom: 50px;
}
</style>
