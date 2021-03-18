<template>
  <div class="article-list-link">
    <hr />
    <p class="article-list-link__title">{{ articleTitle }}</p>
    <post-info :post-info="article" />
    <p class="article-list-link__summary">{{ articleText }}</p>

    <hr />
  </div>
</template>

<script>
import PostInfo from '@/components/shared/PostInfo'
import { htmlToText } from 'html-to-text'

export default {
  name: 'ArticleLlistLink',

  components: { PostInfo },

  props: {
    article: { type: Object, required: true }
  },

  computed: {
    articleTitle() {
      return htmlToText(this.article.title, { wordwrap: 130 })
    },
    articleText() {
      return htmlToText(this.article.summary, { wordwrap: 130 })
    }
  }
}
</script>

<style scoped>
.article-list-link {
  padding: 0px 15px;
}

.article-list-link:hover {
  border-left: 5px solid var(--primary);
  border-radius: 9px;
}

.article-list-link__title {
  font-size: 1.2em;
  font-weight: 900;
}

.article-list-link__summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
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

@media only screen and (max-width: 320px) {
  .article-list-link__summary {
    -webkit-line-clamp: 10;
  }
}
</style>
