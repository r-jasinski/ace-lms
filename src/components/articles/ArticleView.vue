<template>
  <div class="article">
    <hr />
    <p class="article__title">{{ articles[0].title }}</p>
    <div class="article__autor" />
    <ul>
      <li>jan_kowalski</li>
      <li>postado 05 minutos atrás</li>
    </ul>
    <p class="article__text">
      {{ articles[0].summary }}
    </p>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Articles',

  components: {},

  data() {
    return {
      articles: [
        {
          title:
            'O CSS possui um vasto conjunto de propriedades pode receber valores numéricosO CSS possui um vasto conjunto de propriedades pode receber valores numéricos',
          summary:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasiLorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasiLorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasiLorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ad natus quae dolorem, obcaecati saepe iusto nisi fugiat eius? Dolore pariatur beatae sequi alias assumenda eos, dolorum consequuntur. Eveniet, et Vero nihil voluptas, pariatur eveniet fugiat sequi ad amet, eius asperiores laudantium dolor molestias voluptatibus qui ab voluptate ipsum esse ea velit tempore veniam error quas magnam. Minus, ut nobis. Dignissimos quibusdam expedita rem vitae iusto quasi odit? Minima molestiae eius adipisci obcaecati ullam debitis quos et quod minus? Necessitatibus, nulla. Aspernatur, veniam distinctio. Explicabo unde animi voluptas. Omnis, quasi'
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
.article {
  padding: 0 5%;
}

.article__title {
  font-size: 1.5em;
  font-weight: 900;
}

.article__autor {
  float: left;
  min-width: 50px;
  height: 50px;
  border-radius: 999px;
  margin-right: 20px;
  background-image: url('https://assets.justinpinkney.com/toonify/images/hd/crops/gosling.jpg');
  background-position: center;
  background-size: cover;
}

.article__text {
  text-align: justify;
  text-justify: inter-word;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

ul {
  margin-top: 0;
  list-style: none;
}

hr {
  width: 50%;
  border: none;
  border-top: 1px dotted var(--dark);
  opacity: 0.2;
}
</style>
