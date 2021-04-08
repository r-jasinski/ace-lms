<template>
  <div>
    <div class="admin-about">
      <hr />
      <post-info :post-info="about" />
      <editor-body
        :placeholder="editorBodyPlaceholder"
        :content="about.text"
        :editable="editable"
      />
      <div v-if="!editable" class="admin-about__edit-button">
        <edit-button @clicked="editAbout" />
      </div>
      <div v-else>
        <small class="admin-about__label">
          Ao clicar em “Publicar”, você concorda com os termos de serviço,
          política de privacidade e política de Cookies</small
        >
        <round-corner-button
          class="admin-about__round-corner-button"
          :label="'Publicar'"
        />
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import EditButton from '@/components/shared/EditButton'
import EditorBody from '@/components/shared/EditorBody'
import PostInfo from '@/components/shared/PostInfo'
import RoundCornerButton from '@/components/shared/RoundCornerButton'

export default {
  name: 'AboutViewEdit',

  components: { EditButton, EditorBody, PostInfo, RoundCornerButton },

  data() {
    return {
      editable: false,
      editorTitlePlaceholder: 'Escreva aqui o título do artigo...',
      editorBodyPlaceholder: 'Escreva aqui o conteúdo do artigo...',
      editorCommentPlaceholder: 'Escreva aqui o seu comentário...',
      about: {
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
    removeAbout() {
      this.about = {}
    },
    editAbout() {
      this.editable = true
    }
  }
}
</script>

<style>
.admin-about__title {
  margin-bottom: 10px;
}

.admin-about__label {
  font-size: 0.75em;
  opacity: 0.7;
}

.editor p:first-child:first-letter {
  color: var(--primary);
  float: left;
  font-size: 75px;
  line-height: 60px;
  padding-top: 4px;
  padding-right: 8px;
  padding-left: 3px;
}

.admin-about__edit-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.admin-about__round-corner-button {
  margin: 25px 0;
}

.admin-about hr {
  width: 50%;
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
  margin-bottom: 50px;
}
</style>
