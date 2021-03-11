<template>
  <div class="articles">
    <div class="articles__header">
      Compartilhe seu conhecimento.
      <hr />
    </div>
    <div class="articles__filters">
      <a href="#">data de postagem</a>
      <input type="text" placeholder="Pesquisar" />
      <button class="articles__add-button">+</button>
    </div>
    <router-link to="/" v-for="article in articles" :key="article.id">
      <article-link :article="article" />
    </router-link>
  </div>
</template>

<script>
import ArticleLink from './ArticleLink.vue'
export default {
  name: 'Articles',

  components: {
    ArticleLink
  },

  data() {
    return {
      articles: [
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi'
        },
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi'
        },
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi'
        },
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi'
        },
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi'
        },
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi'
        }
      ]
    }
  }
}
</script>

<style scoped>
.articles {
  padding: 0 5%;
}

.articles__header {
  color: var(--secondary);
  padding: 0 20%;
  margin-bottom: 5%;
  font-size: 1.5em;
  text-align: center;
}

.articles__filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 40px;
}

.articles__add-button {
  color: var(--light);
  background-color: var(--primary);
  min-width: 39px;
  min-height: 36px;
  padding: 10px;
  margin-left: 25px;
  border: none;
  border-radius: 100vh;
  outline: none;
  font-weight: 900;
}

.articles__add-button:hover {
  background-color: var(--primary-plus);
}

input {
  color: var(--dark);
  background-color: var(--light);
  width: 150px;
  min-height: 36px;
  border-radius: 18px;
  border: 2px solid var(--dark);
  padding: 10px;
  outline: none;
}

a {
  color: var(--dark);
  margin-right: 20px;
  text-decoration: none;
}

hr {
  width: 25%;
  border: none;
  border-top: 1px solid var(--secondary);
}
</style>
