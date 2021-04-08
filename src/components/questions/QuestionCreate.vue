<template>
  <div class="question-create">
    <div>
      <editor-title
        :placeholder="editorTitlePlaceholder"
        :editable="editable"
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
    />
    <div>
      <small class="question-create__label">
        Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >

      <round-corner-button
        class="question-create__round-corner-button"
        :label="'Publicar'"
      />
    </div>
  </div>
</template>

<script>
import EditorBody from '@/components/shared/EditorBody'
import EditorTitle from '../shared/EditorTitle.vue'
import RoundCornerButton from '@/components/shared/RoundCornerButton'

export default {
  name: 'QuestionCreate',

  components: { EditorBody, EditorTitle, RoundCornerButton },

  data() {
    return {
      editable: true,
      editorTitlePlaceholder: 'Escreva aqui o título da pergunta...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo da sua pergunta...'
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

.question-create__round-corner-button {
  margin-top: 25px;
}
</style>
