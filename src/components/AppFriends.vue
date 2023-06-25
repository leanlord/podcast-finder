<template>
  <div class="heading">
    <h2>
      {{ isRecommendedFriends > 0 ? "Рекомендуем подписаться" : "Подписки" }}
    </h2>
    <ul class="friends">
      <li
        class="friends__item"
        v-for="friend in isRecommendedFriends ? recommendedFriends : friends"
        :key="friend.id"
      >
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
        <button
          v-if="isRecommendedFriends"
          @click.stop="toggleSubscribeAuthor(friend.id)"
          class="button"
        >
          {{ friend.is_followed ? "Отписаться" : "Подписаться" }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { followAuthor } from '@/api/podcasts'
import { podcastsStore } from '@/store/podcastsStore'
import { usersStore } from '@/store/usersStore'

export default {
  name: "AppFriends",
  props: {
    friends: {
      type: Array,
      default: () => [],
    },
    recommendedFriends: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["openAuthorPodcast"],
  setup(props) {
    const isRecommendedFriends = computed(() => {
      return props.recommendedFriends.length > 0;
    });

    const store = podcastsStore();
    const storeUsers = usersStore();

    const toggleSubscribeAuthor = async (friend) => {
      await followAuthor(friend);
      await store.fetchAllPodcasts();
      await storeUsers.fetchFollowings();
    };

    return {
      isRecommendedFriends,
      toggleSubscribeAuthor,
    };
  },
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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
