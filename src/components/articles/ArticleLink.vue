<template>
  <div class="article-link">
    <hr />
    <p class="article-link__title">{{ article.title }}</p>
    <div class="article-link__autor" />
    <ul>
      <li>{{ article.autor }}</li>
      <li>{{ article.postDate }}</li>
    </ul>
    <p class="article-link__summary">
      {{ article.summary }}
    </p>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'ArticleLink',
  props: {
    article: { type: Object, required: true }
  }
}
</script>

<style scoped>
.article-link {
  padding: 0px 15px;
}

.article-link:hover {
  border-left: 5px solid var(--primary);
  border-radius: 9px;
}

.article-link__title {
  font-size: 1.5em;
  font-weight: 900;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.article-link__autor {
  float: left;
  min-width: 50px;
  height: 50px;
  border-radius: 999px;
  margin-right: 20px;
  background-image: url('https://assets.justinpinkney.com/toonify/images/hd/crops/gosling.jpg');
  background-position: center;
  background-size: cover;
}

.article-link__summary {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: justify;
  text-justify: inter-word;
}

ul {
  margin-top: 0;
  list-style: none;
}

hr {
  border: none;
  border-top: 1px dotted var(--dark);
  opacity: 0.2;
}

@media only screen and (max-width: 768px) {
  .article-link__title {
    -webkit-line-clamp: 2;
  }

  .article-link__summary {
    -webkit-line-clamp: 3;
  }
}

@media only screen and (max-width: 480px) {
  .article-link__title {
    -webkit-line-clamp: 2;
  }

  .article-link__summary {
    -webkit-line-clamp: 4;
  }
}

@media only screen and (max-width: 320px) {
  .article-link__title {
    -webkit-line-clamp: 4;
  }

  .article-link__summary {
    -webkit-line-clamp: 8;
  }
}
</style>
