<template>
  <div class="questions-list">
    <div class="questions-list__filters">
      <a href="#">data de postagem</a>
      <a href="#">respostas</a>
      <filter-input />
      <add-button @clicked="addQuestion" />
    </div>
    <router-link
      v-for="question in questions"
      :to="{
        name: 'QuestionViewEdit',
        params: { slug: slugifyQuestionTitle(question.title), id: question.id }
      }"
      :key="question.id"
    >
      <questions-list-link :question="question" />
    </router-link>
    <div class="questions-list__loader">
      <small v-if="noMoreQuestions && !loading"
        >Parece que não há mais perguntas publicadas. :(
        <p @click="addQuestion">Que tal publicar a sua!?</p>
      </small>
      <dot-spinner :size="'40px'" v-if="loading" />
    </div>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import FilterInput from '@/components/shared/FilterInput'
import QuestionsListLink from './QuestionsListLink.vue'
import { getQuestions } from '@/services/questionsService'
import { mapGetters } from 'vuex'
import { slugify } from '@/services/slugsService'

export default {
  name: 'QuestionsList',

  components: { AddButton, FilterInput, QuestionsListLink },

  data() {
    return {
      questions: [],
      itemsPerPage: 2,
      loading: false,
      noMoreQuestions: false
    }
  },

  computed: {
    ...mapGetters({
      isEndOfScroll: 'miscellaneous/isEndOfScroll'
    }),

    lastVisible() {
      return this.questions.length
    }
  },

  watch: {
    async isEndOfScroll() {
      this.getNextQuestions()
    }
  },

  mounted() {
    this.initializeQuestions()
  },

  methods: {
    addQuestion() {
      this.$router.push({ name: 'QuestionCreate' })
    },

    async getQuestions() {
      this.loading = true
      const questions = await getQuestions(this.lastVisible, this.itemsPerPage)
      this.loading = false
      return questions
    },

    async getNextQuestions() {
      if (this.isEndOfScroll) {
        const moreData = await this.getQuestions()
        if (!moreData.length) {
          this.noMoreQuestions = true
          return
        }
        this.questions.push(...moreData)
        this.noMoreQuestions = false
      }
    },

    async initializeQuestions() {
      this.questions = await this.getQuestions()
    },

    slugifyQuestionTitle(questionTitle) {
      return slugify(questionTitle)
    }
  }
}
</script>

<style scoped>
.questions-list {
  backdrop-filter: blur(2px);
  margin: 0 20px 0 0;
}

.questions-list__filters {
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: flex-end;
}

.questions-list__add-button {
  background-color: var(--primary);
  border-radius: 100vh;
  border: none;
  color: var(--light);
  font-weight: 900;
  min-height: 36px;
  min-width: 39px;
  opacity: 0.75;
  outline: none;
  padding: 10px;
}

.questions-list__add-button:hover {
  opacity: 1;
}

.questions-list__loader {
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 100%;
  position: absolute;
}

.questions-list a {
  color: var(--dark);
  text-decoration: none;
}

.questions-list small {
  text-align: center;
}

.questions-list p {
  color: var(--primary);
  cursor: pointer;
  text-decoration: underline;
}

.questions-list__filters a {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;
}
</style>
