<template>
  <div class="user" :class="{ 'user--current': user.current }">
    <div class="user__avatar" />
    <div class="user__indicator">
      <ul>
        <li class="user__name">{{ user.name }}</li>
        <li>email: jan_kowalski@email.com</li>
        <li>data de cadastro: 01/03/2021</li>
      </ul>
    </div>
    <div class="user--selected">
      <slot name="selected-user" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',

  props: {
    user: { type: Object, required: true }
  }
}
</script>

<style scoped>
.user {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  padding: 5px;
}

.user--current {
  background-color: var(--primary);
  border-radius: 5px;
}

.user__avatar {
  min-width: 100px;
  height: 100px;
  border-radius: 999px;
  margin-left: 20px;
  margin-right: 20px;
  background-image: url('https://assets.justinpinkney.com/toonify/images/hd/crops/gosling.jpg');
  background-position: center;
  background-size: cover;
}

.user__name {
  font-size: 1.5em;
  font-weight: 900;
  margin-right: 40px;
}

.user__indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.user--selected {
  margin: 10px;
}

ul {
  list-style: none;
  margin-top: 0;
}
</style>
