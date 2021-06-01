<template>
  <div class="home-page">
    <the-home-menu />
    <p>
      Aprenda mais com {{ recommendedArticleAutor }} e seu artigo:
      <router-link
        v-if="recommendedArticleId"
        :to="{
          name: 'ArticleViewEdit',
          params: {
            slug: slugifyArticleTitle(recommendedArticleTitle),
            id: recommendedArticleId
          }
        }"
      >
        <b>{{ recommendedArticleTitle }}</b>
      </router-link>
    </p>
  </div>
</template>

<script>
import TheHomeMenu from '@/components/home/TheHomeMenu'
import { getRecommendedArticle } from '@/services/contentRecommendationService'
import { htmlToText } from 'html-to-text'
import { mapGetters } from 'vuex'
import { slugify } from '@/services/slugsService'

export default {
  name: 'HomePage',

  components: { TheHomeMenu },

  data() {
    return {
      recommendedArticle: null
    }
  },

  computed: {
    ...mapGetters({
      user: 'users/user'
    }),

    recommendedArticleTitle() {
      const recommendedArticleTitleText = htmlToText(
        this.recommendedArticle?.title,
        {
          tags: { h1: { options: { uppercase: false } } }
        }
      )
      return recommendedArticleTitleText
    },

    recommendedArticleAutor() {
      const recommendedArticleAutor = this.user(this.recommendedArticle?.author)
      return recommendedArticleAutor?.displayName
    },

    recommendedArticleId() {
      const recommendedArticleId = this.recommendedArticle?.id
      return recommendedArticleId
    }
  },

  async created() {
    this.recommendedArticle = await getRecommendedArticle()
  },

  methods: {
    slugifyArticleTitle(articleTitle) {
      return slugify(articleTitle)
    }
  }
}
</script>

<style scoped>
.home-page {
  width: 100%;
}

.home-page p {
  margin-top: 110px;
  text-align: center;
}
</style>
