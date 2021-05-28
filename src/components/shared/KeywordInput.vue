<template>
  <form-group :validator="v" :name="name">
    <div class="keyword-input">
      <small class="keyword-input__label"
        >Você deve adicionar palavras-chave para auxiliar nas buscas por esse
        artigo</small
      >
      <input
        type="text"
        placeholder="Escreva aqui suas palavras-chave"
        class="keyword-input__input"
        v-model.trim="inputModel"
        @input="v.$touch()"
      />
    </div>
  </form-group>
</template>

<script>
export default {
  name: 'KeywordInput',

  props: {
    name: { type: String, default: '' },
    v: { type: Object, required: true },
    value: { type: String, default: '' }
  },

  computed: {
    inputModel: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>
.keyword-input {
  display: flex;
  column-gap: 5px;
  flex-direction: column;
  gap: 5px;
}

.keyword-input__input {
  background-color: transparent;
  border-radius: 1em;
  border: 1px solid var(--dark-50);
  color: var(--dark);
  min-height: 3em;
  outline: none;
  padding: 10px;
}

.keyword-input__input:focus {
  border: 1px solid var(--dark);
}

.keyword-input__label {
  font-size: 0.75em;
}

::placeholder {
  color: #aaa;
  font-style: italic;
  pointer-events: none;
}

:-ms-input-placeholder {
  color: #aaa;
  font-style: italic;
  pointer-events: none;
}

::-ms-input-placeholder {
  color: #aaa;
  font-style: italic;
  pointer-events: none;
}
</style>
