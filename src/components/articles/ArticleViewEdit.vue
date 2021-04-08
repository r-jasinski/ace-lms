<template>
  <div class="article-view-edit">
    <hr />
    <div class="article-view-edit__title">
      <editor-title
        :placeholder="editorTitlePlaceholder"
        :content="article.title"
        :editable="editable"
      />
      <small v-if="editable" class="article-view-edit__label"
        >O título aparecerá na listagem inicial, portanto seja claro e
        objetivo</small
      >
    </div>
    <post-info :post-info="article" />
    <editor-body
      class="article-view-edit__body"
      :placeholder="editorBodyPlaceholder"
      :content="article.text"
      :editable="editable"
    />
    <div v-if="!editable" class="article-view-edit__buttons">
      <edit-button @clicked="editArticle" />
      <remove-button :remove="removeArticle" />
    </div>
    <div v-else>
      <small class="article-view-edit__label">
        Ao clicar em “Publicar”, você concorda com os termos de serviço,
        política de privacidade e política de Cookies</small
      >
      <round-corner-button
        class="article-view-edit__round-corner-button"
        :label="'Publicar'"
      />
    </div>
    <hr />
    Comentários:
    <editor-body :placeholder="editorCommentPlaceholder" />
  </div>
</template>

<script>
import EditButton from '@/components/shared/EditButton'
import EditorBody from '@/components/shared/EditorBody'
import EditorTitle from '../shared/EditorTitle.vue'
import PostInfo from '@/components/shared/PostInfo'
import RoundCornerButton from '@/components/shared/RoundCornerButton'
import RemoveButton from '@/components/shared/RemoveButton'

export default {
  name: 'ArticleViewEdit',

  components: {
    EditButton,
    EditorBody,
    EditorTitle,
    PostInfo,
    RoundCornerButton,
    RemoveButton
  },

  data() {
    return {
      editable: false,
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...',
      editorCommentPlaceholder: 'Escreva aqui o seu comentário...',
      article: {
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
    removeArticle() {
      this.article = {}
    },
    editArticle() {
      this.editable = true
    }
  }
}
</script>

<style>
.article-view-edit__title {
  margin-bottom: 10px;
}

.article-view-edit__label {
  font-size: 0.75em;
  opacity: 0.7;
}

.article-view-edit__body p:first-child:first-letter {
  color: var(--primary);
  float: left;
  font-size: 75px;
  line-height: 60px;
  padding-top: 4px;
  padding-right: 8px;
  padding-left: 3px;
  font-weight: 600;
}

.article-view-edit__buttons {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 10px;
}

.article-view-edit__round-corner-button {
  margin: 25px 0;
}

.article-view-edit hr {
  width: 50%;
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
  margin-bottom: 50px;
}
</style>
