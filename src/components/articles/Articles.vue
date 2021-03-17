<template>
  <div class="articles">
    <div class="articles__filters">
      <a href="#">data de postagem</a>
      <input type="text" placeholder="Pesquisar" />
      <add-button :add="addArticle" />
    </div>
    <router-link
      :to="{ name: 'ArticleView' }"
      v-for="article in articles"
      :key="article.id"
    >
      <article-link :article="article" />
    </router-link>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import ArticleLink from './ArticleLink.vue'

export default {
  name: 'Articles',

  components: { AddButton, ArticleLink },

  data() {
    return {
      articles: [
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi',
          autor: 'anna_nowak',
          postDate: '05 horas atrás'
        },
        {
          title:
            'Em SQL, existe uma variação da instrução SELECT permite que uma outra subconsulta do tipo SELECT seja utilizada como uma coluna da consulta principal',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi',
          autor: 'jan_kowalski',
          postDate: '05 minutos atrás'
        },
        {
          title:
            'JUnit é uma API de código aberto para a criação de testes unitários em Java, bem como outras linguagem compatíveis com a JVM',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi',
          autor: 'sam_smith',
          postDate: '02 dias atrás'
        },
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi',
          autor: 'john_doe',
          postDate: '1 semana atrás'
        },
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi',
          autor: 'jan_kowalski',
          postDate: '05 minutos atrás'
        },
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi',
          autor: 'jan_kowalski',
          postDate: '05 minutos atrás'
        }
      ]
    }
  },

  methods: {
    addArticle() {
      this.$router.push({ name: 'ArticleCreate' })
    }
  }
}
</script>

<style scoped>
.articles {
  padding: 0 5%;
  border: 1px solid red;
}

.articles__filters {
  display: flex;
  align-items: baseline;
  justify-items: center;
  justify-content: flex-end;
  /* margin-top: 40px; */
  gap: 10px;
}

input {
  color: var(--dark);
  background-color: var(--light);
  width: 150px;
  min-height: 36px;
  border-radius: 18px;
  border: 1px solid var(--dark-75);
  padding: 10px;
  outline: none;
}

input:focus {
  border: 1px solid var(--dark);
}

a {
  color: var(--dark);
  margin-right: 20px;
  margin-left: 20px;
  text-decoration: none;
}
</style>
