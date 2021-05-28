<template>
  <div class="articles-list">
    <div class="articles-list__filters">
      <sort-button
        label="likes"
        :isSortedUp="isLikesCountAscending"
        :disabled="disabled"
        @clicked="handleLikesCountSorting"
      />
      <sort-button
        label="data de postagem"
        :isSortedUp="isCreationTimeAscending"
        :disabled="disabled"
        @clicked="handleCreationTimeSorting"
      />
      <filter-input v-model="filter" />
      <add-button @clicked="addArticle" />
    </div>
    <router-link
      v-for="article in articles"
      :to="{
        name: 'ArticleViewEdit',
        params: { slug: slugifyArticleTitle(article.title), id: article.id }
      }"
      :key="article.id"
    >
      <articles-list-link :article="article" />
    </router-link>
    <div class="articles-list__loader">
      <small v-if="noMoreArticles.showMessage && !loading"
        >{{ noMoreArticles.message }}
        <p @click="addArticle">Que tal publicar o seu!?</p>
      </small>
      <dot-spinner :size="'40px'" :opacity="0.5" v-if="loading" />
    </div>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import ArticlesListLink from './ArticlesListLink.vue'
import FilterInput from '@/components/shared/FilterInput'
import SortButton from '@/components/shared/SortButton.vue'
import {
  filterArticlesBy,
  getArticles,
  getNextArticles
} from '@/services/articlesService'
import { mapGetters } from 'vuex'
import { slugify } from '@/services/slugsService'

export default {
  name: 'ArticlesList',

  components: { AddButton, ArticlesListLink, FilterInput, SortButton },

  data() {
    return {
      articles: [],
      filter: '',
      itemsPerPage: 4,
      loading: false,
      noMoreArticles: {
        showMessage: false,
        message: ''
      },
      orderBy: {
        field: 'creationTime',
        asc: false
      }
    }
  },

  computed: {
    ...mapGetters({
      isEndOfScroll: 'miscellaneous/isEndOfScroll'
    }),

    disabled() {
      return !this.articles?.length || !!this.filter
    },

    isLikesCountAscending() {
      return this.orderBy.field === 'likesCount' && this.orderBy.asc
    },

    isCreationTimeAscending() {
      return this.orderBy.field === 'creationTime' && this.orderBy.asc
    }
  },

  watch: {
    async isEndOfScroll() {
      if (this.isEndOfScroll && !this.filter) {
        this.getNextArticles()
      }
    },

    async filter() {
      await this.filterArticlesBy()
    }
  },

  async created() {
    await this.initializeArticles()
  },

  methods: {
    addArticle() {
      this.$router.push({ name: 'ArticleCreate' })
    },

    async filterArticlesBy() {
      if (this.filter.length) {
        const arrayFilter = this.filter.toLowerCase().split(' ')
        this.loading = true
        this.articles = await filterArticlesBy('keywords', arrayFilter)
        this.loading = false
        if (this.articles?.length) {
          this.noMoreArticles = {
            showMessage: true,
            message: 'Não há mais artigos com os critérios fornecidos!'
          }
          return
        }
        this.noMoreArticles = {
          showMessage: true,
          message: 'Não foram encontrados artigos com os critérios fornecidos!'
        }
        return
      }
      await this.initializeArticles()
    },

    async initializeArticles() {
      this.loading = true
      this.articles = await getArticles(
        this.orderBy.field,
        this.orderBy.asc ? 'asc' : 'desc',
        this.itemsPerPage
      )
      this.loading = false
      this.noMoreArticles.showMessage = false
    },

    async getNextArticles() {
      this.loading = true
      const moreData = await getNextArticles(
        this.orderBy.field,
        this.orderBy.asc ? 'asc' : 'desc',
        this.itemsPerPage
      )
      this.loading = false
      if (!moreData.length) {
        this.noMoreArticles = {
          showMessage: true,
          message: 'Não há mais artigos!'
        }
        return
      }
      this.articles.push(...moreData)
    },

    async handleCreationTimeSorting() {
      if (!this.articles?.length || !!this.filter) {
        return
      }
      this.orderBy.field = 'creationTime'
      this.orderBy.asc = !this.orderBy.asc
      await this.initializeArticles()
    },

    async handleLikesCountSorting() {
      if (!this.articles?.length || !!this.filter) {
        return
      }
      this.orderBy.field = 'likesCount'
      this.orderBy.asc = !this.orderBy.asc
      await this.initializeArticles()
    },

    slugifyArticleTitle(articleTitle) {
      return slugify(articleTitle)
    }
  }
}
</script>

<style scoped>
.articles-list {
  backdrop-filter: blur(3px);
  margin: 0 20px 0 0;
}

.articles-list__filters {
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: flex-end;
}

.articles-list__add-button {
  background-color: var(--primary);
  border-radius: 100vh;
  border: none;
  color: var(--light);
  min-height: 36px;
  min-width: 39px;
  opacity: 0.75;
  outline: none;
  padding: 10px;
}

.articles-list__add-button:hover {
  opacity: 1;
}

.articles-list__loader {
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 100%;
  position: absolute;
}

.articles-list a {
  color: var(--dark);
  text-decoration: none;
}

.articles-list small {
  text-align: center;
}

.articles-list p {
  color: var(--primary);
  cursor: pointer;
  text-decoration: underline;
}

.articles-list__filters a {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;
}
</style>
