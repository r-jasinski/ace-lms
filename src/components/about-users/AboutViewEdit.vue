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
      editorBodyPlaceholder: 'Escreva aqui algo sobre o projeto...',
      about: {
        autor: 'anna_nowak',
        postDate: '5 horas atrás',
        text: `
          <p>Este projeto nasceu da necessidade de compartilhamento de experiências e conhecimentos entre pessoas que trabalham com desenvolvimento de software. Baseado em técnicas presentes em áreas multidisciplinares, busca-se o enfrentamento de um problema bastante comum no cotidiano de desenvolvedores : a constante necessidade de aprendizado.</p>
          <p>Possui como funcionalidade central um ambiente onde o usuário pode postar quaisquer dúvidas que venha enfrentar, principalmente aquelas cujo não enfrentamento ocasionam algum tipo de bloqueio na continuidade de sua tarefa.</p>
          <p>Ainda, disponibiliza uma área para a publicação de artigos com conteúdos diversos relacionados ao escopo de programação. A fim de incentivar a visualiação dos artigos, na página principal do projeto aparecerá, de forma aleatória, um link direcionando a essa seção.</p>
          <p>Assim, busca-se diminuir a lacuna de conhecimento no ambiente que utiliza a solução, deixando registrado um pouco de cada profissional e agilizando o processo de imersão de novos colaboradores no ecossistema da empresa.</p>
          <p>No processo de design, foram observadas tendências diversas para a elaboração das cores, tipografia, estilo etc.</p>
          <p>Para a obter sucesso ao despertar interesse dos envolvidos, utiliza-se gamification de várias formas, como rankings baseados no grau de atividade e criação de personagens (API Toonify).</p>
          <p>Sugere-se que o gestor responsável pela aplicação desta ferramenta fomente e incentive seu uso através de bonificações ou como requisitos para eventuais promoções.</p>
          <p>Como futuros módulos a serem implementados, este sistema contará com emissão de relatórios gerenciais, integração com sistemas de gerenciamento de projetos e uma área para disponibilização de cursos.</p>`
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
