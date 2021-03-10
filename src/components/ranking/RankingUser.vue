<template>
  <div class="ranking-user" :class="{ 'ranking-user--current': user.current }">
    <span class="ranking-user__position">
      <slot name="ranking-user-position" />
    </span>
    <div class="ranking-user__avatar" />
    <ul>
      <li class="ranking-user__name">
        jan_kowalski
        <span class="ranking-user__indicator">
          <slot name="ranking-user-indicator" />
        </span>
      </li>
      <li>20248 pt</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankingUser',
  props: {
    user: { type: Object, required: true }
  }
}
</script>

<style scoped>
.ranking-user {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 1%;
  padding: 5px 15px;
}

.ranking-user--current {
  background-color: var(--primary);
  border-radius: 5px;
}

.ranking-user__position {
  font-size: 3em;
  font-weight: 900;
}

.ranking-user__avatar {
  min-width: 100px;
  height: 100px;
  border-radius: 999px;
  margin-left: 20px;
  margin-right: 20px;
  background-image: url('https://assets.justinpinkney.com/toonify/images/hd/crops/gosling.jpg');
  background-position: center;
  background-size: cover;
}

.ranking-user__name {
  font-size: 2em;
  font-weight: 900;
  margin-right: 40px;
}

.ranking-user__indicator {
  font-size: 1.5em;
  opacity: 0.4;
  padding-left: 5px;
  color: var(--light);
}

ul {
  list-style: none;
  margin-top: 0;
}
</style>
