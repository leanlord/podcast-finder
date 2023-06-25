<template>
  <div>
    <h2 class="heading">Подписки</h2>
    <ul class="friends">
      <li class="friends__item" v-for="friend in friends" :key="friend.id">
        <img
          class="avatar"
          height="50"
          width="50"
          :src="friend.avatar"
          alt="Аватарка"
        />
        <span>
          {{ friend.name }}
        </span>
        <span>
          {{ friend.email }}
        </span>
        <button
          @click="$emit('openAuthorPodcast', friend.podcasts)"
          class="button friends__button"
        >
          Открыть подкасты
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppFriends",
  props: {
    friends: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["openAuthorPodcast"],
};
</script>

<style scoped lang="scss">
.friends {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  &__button {
    padding: 5px;
  }
}

.heading {
  margin-bottom: 20px;
}
</style>
