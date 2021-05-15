<template>
  <div>
    <div class="admin-about">
      <hr />
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
            @clicked="createAbout"
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
import { aboutCollection, createAbout } from '@/services/aboutService'
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
      fixedID: 'NPtCmqzUQrL32G7kEHnT',
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

  mounted() {
    this.initializeAbout()
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
      if (this.about.length < 1) {
        this.aboutIsEditable = false
        return
      }
      const UTCStringCreationTime = new Date().toUTCString()
      this.about.author = this.authenticatedUser.uid
      this.about.creationTime = UTCStringCreationTime
      await createAbout(this.fixedID, this.about)
      this.aboutIsEditable = false
    },

    editAbout() {
      this.aboutIsEditable = true
      this.editableAbout = { ...this.about }
    },

    initializeAbout() {
      this.unsubscribe = aboutCollection.doc(this.fixedID).onSnapshot(doc => {
        this.about = { ...doc.data() }
        if (!this.about.content) {
          this.aboutIsEditable = true
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
