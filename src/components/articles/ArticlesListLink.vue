<template>
  <div class="article-list-link">
    <hr />
    <p class="article-list-link__title">{{ articleTitleText }}</p>
    <post-info :post-info="postInfo" />
    <p class="article-list-link__summary">{{ articleSummaryText }}</p>

    <hr />
  </div>
</template>

<script>
import PostInfo from '@/components/shared/PostInfo'
import { htmlToText } from 'html-to-text'
import { mapGetters } from 'vuex'

export default {
  name: 'ArticleLlistLink',

  components: { PostInfo },

  props: {
    article: { type: Object, default: () => {} }
  },

  computed: {
    ...mapGetters({
      user: 'users/user'
    }),

    articleTitleText() {
      return htmlToText(this.article.title, { wordwrap: 130 })
    },

    articleSummaryText() {
      return htmlToText(this.article.content, { wordwrap: 130 })
    },

    postInfo() {
      let user = this.user(this.article.author)
      let creationTime = this.article.creationTime
      return {
        ...user,
        creationTime
      }
    }
  }
}
</script>

<style scoped>
.article-list-link {
  padding: 0px 15px;
  transition: all 0.03s;
  word-wrap: break-word;
}

.article-list-link:hover {
  border-left: 5px solid var(--primary);
  border-radius: 9px;
  transition: all 0.03s;
}

.article-list-link__title {
  font-size: 1.2em;
  font-weight: 900;
}

.article-list-link__summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
  text-align: justify;
  text-justify: inter-word;
}

.article-list-link hr {
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
}

@media only screen and (max-width: 768px) {
  .article-list-link__summary {
    -webkit-line-clamp: 5;
  }
}

@media only screen and (max-width: 480px) {
  .article-list-link__summary {
    -webkit-line-clamp: 6;
  }
}

@media only screen and (max-width: min-width: 355px;) {
  .article-list-link__summary {
    -webkit-line-clamp: 10;
  }
}
</style>
