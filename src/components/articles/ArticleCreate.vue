<template>
  <div class="article-create">
    <div>
      <editor-title
        :placeholder="editorTitlePlaceholder"
        :editable="editable"
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
    />
    <div>
      <small class="article-create__label">
        *Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >
      <confirm-button
        class="article-create__confirm-button"
        :label="'Publicar'"
      />
    </div>
  </div>
</template>

<script>
import EditorBody from '@/components/shared/EditorBody'
import EditorTitle from '../shared/EditorTitle.vue'
import ConfirmButton from '@/components/shared/ConfirmButton'

export default {
  name: 'ArticleCreate',

  components: { EditorBody, EditorTitle, ConfirmButton },

  data() {
    return {
      editable: true,
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...'
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

.article-create__confirm-button {
  margin-top: 25px;
}
</style>
