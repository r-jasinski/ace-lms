<template>
  <div class="questions-list">
    <div class="questions-list__filters">
      <a href="#">data de postagem</a>
      <a href="#">respostas</a>
      <filter-input />
      <add-button :add="addQuestion" />
    </div>
    <router-link
      :to="{ name: 'QuestionViewEdit' }"
      v-for="question in questions"
      :key="question.id"
    >
      <questions-list-link :question="question" />
    </router-link>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import FilterInput from '@/components/shared/FilterInput'
import QuestionsListLink from './QuestionsListLink.vue'

export default {
  name: 'QuestionsList',

  components: { AddButton, FilterInput, QuestionsListLink },

  data() {
    return {
      questions: [
        {
          title:
            '<h1>Vue JS - Como exibir uma lista intercalada entre propriedade e valor?</h1>',
          summary:
            '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi</p>',
          autor: 'anna_nowak',
          postDate: '05 horas atrás'
        },
        {
          title:
            '<h1>Qual a melhor forma de salvar vários tipos de dados de uma struct {} em um arquivo de texto em C?</h1>',
          summary:
            '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi</p>',
          autor: 'jan_kowalski',
          postDate: '05 minutos atrás'
        },
        {
          title:
            '<h1>É possível obter a geolocalização do usuário usando o Leaflet Js?</h1>',
          summary:
            '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi</p>',
          autor: 'sam_smith',
          postDate: '02 dias atrás'
        },
        {
          title:
            '<h1>Como mudar o separador ponto para vírgula no eixo dos xx em Python no seguinte código usando Jupyter Notebook do Anaconda?</h1>',
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
    addQuestion() {
      this.$router.push({ name: 'QuestionCreate' })
    }
  }
}
</script>

<style scoped>
.questions-list {
  padding: 0 6%;
}

.questions-list__filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.questions-list__add-button {
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

.questions-list__add-button:hover {
  opacity: 1;
}

.questions-list a {
  color: var(--dark);
  text-decoration: none;
}
</style>
