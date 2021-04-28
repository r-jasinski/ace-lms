<template>
  <div class="question-list-link">
    <hr />
    <p class="question-list-link__title">{{ questionTitleText }}</p>
    <post-info :post-info="postInfo" />
    <p class="question-list-link__summary">{{ questionSummaryText }}</p>

    <hr />
  </div>
</template>

<script>
import PostInfo from '@/components/shared/PostInfo'
import { htmlToText } from 'html-to-text'
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionLlistLink',

  components: { PostInfo },

  props: {
    question: { type: Object, default: () => {} }
  },

  computed: {
    ...mapGetters({
      user: 'users/user'
    }),

    questionTitleText() {
      return htmlToText(this.question.title, { wordwrap: 130 })
    },

    questionSummaryText() {
      return htmlToText(this.question.content, { wordwrap: 130 })
    },

    postInfo() {
      let user = this.user(this.question.author)
      let creationTime = this.question.creationTime
      return {
        ...user,
        creationTime
      }
    }
  }
}
</script>

<style scoped>
.question-list-link {
  padding: 0px 15px;
  transition: all 0.03s;
}

.question-list-link:hover {
  border-left: 5px solid var(--primary);
  border-radius: 9px;
  transition: all 0.03s;
  cursor: pointer;
}

.question-list-link__title {
  font-size: 1.2em;
  font-weight: 900;
}

.question-list-link__summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: justify;
  text-justify: inter-word;
}

.question-list-link hr {
  border: none;
  border-top: 1px dotted var(--primary);
  opacity: 0.5;
}

@media only screen and (max-width: 768px) {
  .question-list-link__summary {
    -webkit-line-clamp: 3;
  }
}

@media only screen and (max-width: 480px) {
  .question-list-link__summary {
    -webkit-line-clamp: 4;
  }
}

@media only screen and (max-width: min-width: 355px;) {
  .question-list-link__summary {
    -webkit-line-clamp: 8;
  }
}
</style>
