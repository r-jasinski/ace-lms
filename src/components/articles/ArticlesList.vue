<template>
  <div class="articles-list">
    <div class="articles-list__filters">
      <a href="#">data de postagem</a>
      <filter-input />
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
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import ArticlesListLink from './ArticlesListLink.vue'
import FilterInput from '@/components/shared/FilterInput'
import { articlesCollection } from '@/services/articlesService'
import { slugify } from '@/services/slugsService'

export default {
  name: 'ArticlesList',

  components: { AddButton, ArticlesListLink, FilterInput },

  data() {
    return {
      articles: [],
      unsubscribe: null
    }
  },

  mounted() {
    this.initializeArticles()
  },

  destroyed() {
    this.unsubscribe()
  },

  methods: {
    addArticle() {
      this.$router.push({ name: 'ArticleCreate' })
    },

    initializeArticles() {
      this.unsubscribe = articlesCollection.onSnapshot(snapshot => {
        this.articles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    },

    slugifyArticleTitle(articleTitle) {
      return slugify(articleTitle)
    }
  }
}
</script>

<style scoped>
.articles-list__filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.articles-list__add-button {
  min-width: 39px;
  min-height: 36px;
  padding: 10px;
  color: var(--light);
  background-color: var(--primary);
  opacity: 0.75;
  border: none;
  border-radius: 100vh;
  outline: none;
}

.articles-list__add-button:hover {
  opacity: 1;
}

.articles-list a {
  color: var(--dark);
  text-decoration: none;
}

.articles-list__filters a {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
