<template>
  <div class="articles-list">
    <div class="articles-list__filters">
      <a href="#">data de postagem</a>
      <filter-input />
      <add-button @clicked="addArticle" />
    </div>
    <router-link
      :to="{ name: 'ArticleViewEdit' }"
      v-for="article in articles"
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

export default {
  name: 'ArticlesList',

  components: { AddButton, ArticlesListLink, FilterInput },

  data() {
    return {
      articles: [
        {
          title:
            '<h1>O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos</h1>',
          summary:
            '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi</p>',
          autor: 'anna_nowak',
          postDate: '05 horas atrás'
        },
        {
          title:
            '<h1>Em SQL, existe uma variação da instrução SELECT permite que uma outra subconsulta do tipo SELECT seja utilizada como uma coluna da consulta principal</h1>',
          summary:
            '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi</p>',
          autor: 'jan_kowalski',
          postDate: '05 minutos atrás'
        },
        {
          title:
            '<h1>JUnit é uma API de código aberto para a criação de testes unitários em Java, bem como outras linguagem compatíveis com a JVM</h1>',
          summary:
            '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi</p>',
          autor: 'sam_smith',
          postDate: '02 dias atrás'
        },
        {
          title: '<h1>Lorem ipsum dolor, sit amet consectetur adipisicing</h1>',
          summary:
            '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi</p>',
          autor: 'john_doe',
          postDate: '1 semana atrás'
        },
        {
          title:
            '<h1>O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos</h1>',
          summary:
            '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi</p>',
          autor: 'jan_kowalski',
          postDate: '05 minutos atrás'
        },
        {
          title:
            '<h1>O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos</h1>',
          summary:
            '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi</p>',
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
  font-weight: 900;
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
