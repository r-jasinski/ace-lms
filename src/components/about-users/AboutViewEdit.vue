<template>
  <div>
    <div class="admin-about">
      <hr />
      <post-info :post-info="postInfo" />
      <editor-body
        :placeholder="editorBodyPlaceholder"
        :content="about.content"
        :editable="editable"
        @input="about.content = $event"
      />
      <div v-if="!editable" class="admin-about__edit-button">
        <edit-button @clicked="editable = true" />
      </div>
      <div v-else>
        <small class="admin-about__label">
          *Ao clicar em “Publicar”, você concorda com os termos de serviço,
          política de privacidade e política de Cookies</small
        >
        <div class="admin-about__buttons">
          <confirm-button :label="'Publicar'" @clicked="createAbout" />
          <cancel-button :label="'Cancelar'" @clicked="cancelEdit" />
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import CancelButton from '@/components/shared/CancelButton'
import ConfirmButton from '@/components/shared/ConfirmButton'
import EditButton from '@/components/shared/EditButton'
import EditorBody from '@/components/shared/EditorBody'
import PostInfo from '@/components/shared/PostInfo'
import { aboutCollection, createAbout } from '@/services/aboutService'
import { mapGetters } from 'vuex'

export default {
  name: 'AboutViewEdit',

  components: { CancelButton, ConfirmButton, EditButton, EditorBody, PostInfo },

  data() {
    return {
      editable: false,
      editorBodyPlaceholder: 'Escreva aqui algo sobre o projeto...',
      about: {},
      fixedID: 'NPtCmqzUQrL32G7kEHnT',
      unsubscribe: null
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    }),

    postInfo() {
      let user = this.user(this.about.author)
      let creationTime = this.about.creationTime
      return {
        ...user,
        creationTime
      }
    }
  },

  mounted() {
    this.initializeAbout()
  },

  destroyed() {
    this.unsubscribe()
  },

  methods: {
    async createAbout() {
      if (this.about.length < 1) {
        this.editable = false
        return
      }
      // this.sendData = true
      const UTCStringCreationTime = new Date().toUTCString()
      this.about.author = this.authenticatedUser.uid
      this.about.creationTime = UTCStringCreationTime
      await createAbout(this.fixedID, this.about)
      this.editable = false
    },

    cancelEdit() {
      this.editable = false
      this.about.content += ' '
    },

    initializeAbout() {
      this.unsubscribe = aboutCollection.doc(this.fixedID).onSnapshot(doc => {
        this.about = { ...doc.data() }
        if (!this.about.content) {
          this.editable = true
        }
      })
    }
  }
}
</script>

<style>
.admin-about__title {
  margin-bottom: 10px;
}

.admin-about__label {
  display: flex;
  justify-content: flex-start;
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

.admin-about__buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 25px 0;
  gap: 10px;
}

.admin-about__edit-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.admin-about hr {
  width: 50%;
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
  margin-bottom: 50px;
}
</style>
