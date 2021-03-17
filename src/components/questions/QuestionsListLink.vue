<template>
  <div class="question-list-link">
    <hr />
    <p class="question-list-link__title">{{ questionTitle }}</p>
    <post-info :post-info="question" />
    <p class="question-list-link__summary">{{ questionText }}</p>

    <hr />
  </div>
</template>

<script>
import PostInfo from '@/components/shared/PostInfo'
import { htmlToText } from 'html-to-text'

export default {
  name: 'QuestionLlistLink',

  components: { PostInfo },

  props: {
    question: { type: Object, required: true }
  },

  computed: {
    questionTitle() {
      return htmlToText(this.question.title, { wordwrap: 130 })
    },
    questionText() {
      return htmlToText(this.question.summary, { wordwrap: 130 })
    }
  }
}
</script>

<style scoped>
.question-list-link {
  padding: 0px 15px;
}

.question-list-link:hover {
  border-left: 5px solid var(--primary);
  border-radius: 9px;
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
  border-top: 1px dotted var(--dark);
  opacity: 0.2;
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

@media only screen and (max-width: 320px) {
  .question-list-link__summary {
    -webkit-line-clamp: 8;
  }
}
</style>
