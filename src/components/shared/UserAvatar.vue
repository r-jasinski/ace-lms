<template>
  <div class="user-avatar" v-cloak>
    <div :class="['user-avatar__mask', { 'user-avatar--inactive': inactive }]">
      <img
        :src="userPhotoURL"
        alt=""
        class="user-avatar__image"
        :width="avatarSize"
        :height="avatarSize"
      />
    </div>
    <div :class="['user-avatar__badge', { 'user-avatar--inactive': inactive }]">
      <one-star v-if="showOneStarBadge" />
      <two-star v-if="showTwoStarBadge" />
      <three-star v-if="showThreeStarBadge" />
      <four-star v-if="showFourStarBadge" />
      <five-star v-if="showFiveStarBadge" />
    </div>
  </div>
</template>

<script>
import OneStar from '@/assets/badge-star-1.svg?inline'
import TwoStar from '@/assets/badge-star-2.svg?inline'
import ThreeStar from '@/assets/badge-star-3.svg?inline'
import FourStar from '@/assets/badge-star-4.svg?inline'
import FiveStar from '@/assets/badge-star-5.svg?inline'

export default {
  name: 'UserAvatar',

  components: { OneStar, TwoStar, ThreeStar, FourStar, FiveStar },

  props: {
    avatarSize: { type: Number, default: 110 },
    inactive: { type: Boolean, default: false },
    userRankingPoints: { type: Number, default: 0 },
    userPhotoURL: { type: String, default: '' }
  },

  computed: {
    showOneStarBadge() {
      return this.userRankingPoints > 0 && this.userRankingPoints < 49
    },

    showTwoStarBadge() {
      return this.userRankingPoints > 49 && this.userRankingPoints < 99
    },

    showThreeStarBadge() {
      return this.userRankingPoints > 99 && this.userRankingPoints < 149
    },

    showFourStarBadge() {
      return this.userRankingPoints > 149 && this.userRankingPoints < 199
    },

    showFiveStarBadge() {
      return this.userRankingPoints > 199
    }
  }
}
</script>

<style scoped>
.user-avatar {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 5px 15px;
}

.user-avatar--inactive {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}

.user-avatar__image {
  display: block;
}

.user-avatar__mask {
  clip-path: circle();
  background-color: white;
}

.user-avatar__badge {
  -webkit-filter: drop-shadow(0px 3px 1px var(--light));
  filter: drop-shadow(0px 3px 1px var(--light));
  margin-top: -10px;
  z-index: 1;
}
</style>
