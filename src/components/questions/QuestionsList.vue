<template>
  <div class="questions-list">
    <div class="questions-list__filters">
      <sort-button
        label="respostas"
        :isSortedUp="isAnswersCountAscending"
        :disabled="disabled"
        @clicked="handleAnswersCountSorting"
      />
      <sort-button
        label="data de postagem"
        :isSortedUp="isCreationTimeAscendinjg"
        :disabled="disabled"
        @clicked="handleCreationTimeSorting"
      />
      <filter-input v-model="filter" />
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
      <small v-if="noMoreQuestions.showMessage && !loading"
        >{{ noMoreQuestions.message }}
        <p @click="addQuestion">Que tal publicar a sua!?</p>
      </small>
      <dot-spinner :size="'40px'" :opacity="0.5" v-if="loading" />
    </div>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import FilterInput from '@/components/shared/FilterInput'
import SortButton from '@/components/shared/SortButton.vue'
import QuestionsListLink from './QuestionsListLink.vue'
import {
  filterQuestionsBy,
  getNextQuestions,
  getQuestions
} from '@/services/questionsService'
import { mapGetters } from 'vuex'
import { slugify } from '@/services/slugsService'

export default {
  name: 'QuestionsList',

  components: { AddButton, FilterInput, SortButton, QuestionsListLink },

  data() {
    return {
      filter: '',
      itemsPerPage: 5,
      loading: false,
      noMoreQuestions: {
        showMessage: false,
        message: ''
      },
      orderBy: {
        field: 'creationTime',
        asc: false
      },
      questions: []
    }
  },

  computed: {
    ...mapGetters({
      isEndOfScroll: 'miscellaneous/isEndOfScroll'
    }),

    disabled() {
      return !this.questions?.length || !!this.filter
    },

    isAnswersCountAscending() {
      return this.orderBy.field === 'answersCount' && this.orderBy.asc
    },

    isCreationTimeAscendinjg() {
      return this.orderBy.field === 'creationTime' && this.orderBy.asc
    }
  },

  watch: {
    async isEndOfScroll() {
      if (this.isEndOfScroll) {
        this.getNextQuestions()
      }
    },

    async filter() {
      await this.filterQuestionsBy()
    }
  },

  async created() {
    this.initializeQuestions()
  },

  methods: {
    addQuestion() {
      this.$router.push({ name: 'QuestionCreate' })
    },

    async filterQuestionsBy() {
      if (this.filter.length) {
        const arrayFilter = this.filter.toLowerCase().split(' ')
        this.loading = true
        this.questions = await filterQuestionsBy('keywords', arrayFilter)
        this.loading = false
        if (this.questions?.length) {
          this.noMoreQuestions = {
            showMessage: true,
            message: 'Não há mais perguntas com os critérios fornecidos!'
          }
          return
        }
        this.noMoreQuestions = {
          showMessage: true,
          message:
            'Não foram encontrados perguntas com os critérios fornecidos!'
        }
        return
      }
      await this.initializeQuestions()
    },

    async initializeQuestions() {
      this.loading = true
      this.questions = await getQuestions(
        this.orderBy.field,
        this.orderBy.asc ? 'asc' : 'desc',
        this.itemsPerPage
      )
      this.loading = false
      this.noMoreQuestions.showMessage = false
    },

    async getNextQuestions() {
      this.loading = true
      const moreData = await getNextQuestions(
        this.orderBy.field,
        this.orderBy.asc ? 'asc' : 'desc',
        this.itemsPerPage
      )
      this.loading = false
      if (!moreData.length) {
        this.noMoreQuestions = {
          showMessage: true,
          message: 'Não há mais perguntas!'
        }
        return
      }
      this.questions.push(...moreData)
    },

    async handleAnswersCountSorting() {
      if (!this.questions?.length || !!this.filter) {
        return
      }
      this.orderBy.field = 'answersCount'
      this.orderBy.asc = !this.orderBy.asc
      await this.initializeQuestions()
    },

    async handleCreationTimeSorting() {
      if (!this.questions?.length || !!this.filter) {
        return
      }
      this.orderBy.field = 'creationTime'
      this.orderBy.asc = !this.orderBy.asc
      await this.initializeQuestions()
    },

    slugifyQuestionTitle(questionTitle) {
      return slugify(questionTitle)
    }
  }
}
</script>

<style scoped>
.questions-list {
  backdrop-filter: blur(3px);
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
