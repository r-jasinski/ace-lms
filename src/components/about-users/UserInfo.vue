<template>
  <div class="user-info" :class="{ 'user-info--current': user.current }">
    <div class="user-info__avatar" />
    <div class="user-info__indicator">
      <ul>
        <li class="user-info__name">{{ user.name }}</li>
        <li>email: jan_kowalski@email.com</li>
        <li>data de cadastro: 01/03/2021</li>
      </ul>
    </div>
    <div class="user-info--selected">
      <slot name="selected-user-info" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',

  props: {
    user: { type: Object, required: true }
  }
}
</script>

<style scoped>
.user-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  padding: 5px;
}

.user-info--current {
  background-color: var(--primary);
  border-radius: 5px;
}

.user-info__avatar {
  min-width: 100px;
  height: 100px;
  border-radius: 999px;
  margin-left: 20px;
  margin-right: 20px;
  background-image: url('https://assets.justinpinkney.com/toonify/images/hd/crops/gosling.jpg');
  background-position: center;
  background-size: cover;
}

.user-info__name {
  font-size: 1.5em;
  font-weight: 900;
  margin-right: 40px;
}

.user-info__indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.user-info--selected {
  margin: 10px;
}

.user-info ul {
  list-style: none;
  margin-top: 0;
}
</style>
