<template>
  <div class="article-create">
    <input
      class="article-create__title-input"
      type="text"
      placeholder="Título"
    />
    <small class="article-create__label"
      >O título aparecerá na página inicial, portanto inclua um texto que possa
      ser utilizado logo após a sentença "Você sabia que..."</small
    >
    <editor />
    <small class="article-create__label">
      Ao clicar em “Publicar”, você concorda com os termos de serviço, política
      de privacidade e política de Cookies</small
    >
    <p>
      <button
        class="article-create__publish-button"
        @click="$router.push('/articles')"
      >
        Publicar
      </button>
    </p>
  </div>
</template>

<script>
import Editor from '@/components/shared/Editor'

export default {
  components: {
    Editor
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.article-create {
  padding: 0 5%;
}

.article-create__title-input {
  color: var(--dark);
  background-color: var(--light);
  width: 100%;
  border-radius: 18px;
  border: 1px solid var(--dark);
  padding: 10px;
  outline: none;
}

.article-create__label {
  font-size: 0.75em;
}

.article-create__publish-button {
  color: var(--light);
  background-color: var(--primary);
  margin-top: 25px;
  padding: 10px;
  border: none;
  border-radius: 100vh;
  outline: none;
  font-weight: 900;
}
</style>
