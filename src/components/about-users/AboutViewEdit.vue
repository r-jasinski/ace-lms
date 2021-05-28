<template>
  <div>
    <div class="admin-about">
      <hr />
      <div class="admin-about__loader" v-if="loading">
        <dot-spinner :size="'40px'" :opacity="0.5" />
      </div>
      <post-info :post-info="postInfo" />
      <editor-body
        :placeholder="editorBodyPlaceholder"
        :content="about.content"
        :editable="aboutIsEditable"
        @input="about.content = $event"
        @body-has-error="aboutHasError = $event"
      />
      <div v-if="!aboutIsEditable" class="admin-about__edit-button">
        <edit-button
          v-if="isAdmin"
          class="admin-about__buttons"
          @clicked="editAbout"
        />
      </div>
      <div v-else>
        <small class="admin-about__label">
          *Ao clicar em “Publicar”, você concorda com os termos de serviço,
          política de privacidade e política de Cookies</small
        >
        <div class="admin-about__buttons">
          <confirm-button
            :label="'Publicar'"
            @clicked="handleConfirmButtonClick"
            :disabled="aboutHasError"
          />
          <cancel-button :label="'Cancelar'" @clicked="cancelAboutEdit" />
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
import {
  aboutCollection,
  createAbout,
  updateAbout
} from '@/services/aboutService'
import { mapGetters } from 'vuex'

export default {
  name: 'AboutViewEdit',

  components: { CancelButton, ConfirmButton, EditButton, EditorBody, PostInfo },

  data() {
    return {
      about: {},
      aboutHasError: false,
      aboutIsEditable: false,
      editableAbout: {},
      editorBodyPlaceholder: 'Escreva aqui algo sobre o projeto...',
      loading: false,
      unsubscribe: null
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

    postInfo() {
      let user = this.user(this.about.author)
      let creationTime = this.about.creationTime
      return {
        ...user,
        creationTime
      }
    }
  },

  async created() {
    await this.initializeAbout()
  },

  destroyed() {
    this.unsubscribe()
  },

  methods: {
    cancelAboutEdit() {
      this.aboutIsEditable = false
      this.about = this.editableAbout
    },

    async createAbout() {
      this.about.author = this.authenticatedUser.uid
      const errorResponse = await createAbout(this.about)
      if (!errorResponse) {
        const message = `Sobre criado com sucesso!`
        this.$toast(message, { type: 'info' })
        this.aboutIsEditable = false
      }
    },

    editAbout() {
      this.aboutIsEditable = true
      this.editableAbout = { ...this.about }
    },

    async initializeAbout() {
      this.loading = true
      this.unsubscribe = await aboutCollection.limit(1).onSnapshot(snapshot => {
        if (snapshot.docs[0]) {
          this.about = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
          }
          return
        }
        this.aboutIsEditable = true
      })
      this.loading = false
    },

    handleConfirmButtonClick() {
      if (this.about.creationTime) {
        this.updateAbout()
        return
      }
      this.createAbout()
    },

    async updateAbout() {
      const errorResponse = await updateAbout(this.about.id, this.about)
      if (!errorResponse) {
        const message = `Sobre salvo com sucesso!`
        this.$toast(message, { type: 'info' })
        this.aboutIsEditable = false
      }
    }
  }
}
</script>

<style>
.admin-about {
  backdrop-filter: blur(3px);
  margin: 0 20px 0 0;
}

.admin-about__loader {
  align-items: center;
  display: flex;
  justify-content: center;
}

.admin-about__title {
  margin-bottom: 10px;
}

.admin-about__label {
  display: flex;
  justify-content: flex-start;
  font-size: 0.75em;
}

.admin-about__buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 50px 0;
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
