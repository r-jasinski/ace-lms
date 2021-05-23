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
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import FilterInput from '@/components/shared/FilterInput'
import QuestionsListLink from './QuestionsListLink.vue'
import { questionsCollection } from '@/services/questionsService'
import { slugify } from '@/services/slugsService'

export default {
  name: 'QuestionsList',

  components: { AddButton, FilterInput, QuestionsListLink },

  data() {
    return {
      questions: [],
      unsubscribe: null
    }
  },

  mounted() {
    this.initializeQuestions()
  },

  destroyed() {
    this.unsubscribe()
  },

  methods: {
    addQuestion() {
      this.$router.push({ name: 'QuestionCreate' })
    },

    initializeQuestions() {
      this.unsubscribe = questionsCollection.onSnapshot(snapshot => {
        this.questions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.questions-list__add-button {
  min-width: 39px;
  min-height: 36px;
  padding: 10px;
  color: var(--light);
  background-color: var(--primary);
  opacity: 0.75;
  border: none;
  border-radius: 100vh;
  outline: none;
  font-weight: 900;
}

.questions-list__add-button:hover {
  opacity: 1;
}

.questions-list a {
  color: var(--dark);
  text-decoration: none;
}
</style>
