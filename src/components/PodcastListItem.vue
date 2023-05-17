<template>
  <div :class="{ 'podcast_is-loading': item.isLoading }" class="podcast">
    <div class="podcast__avatar"></div>
    <div class="podcast__content">
      <div class="podcast__header">
        <span class="podcast__date">
          {{ item.formatted_date }}
        </span>
      </div>
      <div class="podcast__title">
        {{ item.original_name || "Нет имени" }}
      </div>
      <div class="podcast__text">
        {{ item.text_contents }}
      </div>
      <div class="podcast__footer">
        <div>
          <font-awesome-icon
            @click="toggleLikeStatus(item.id)"
            style="cursor: pointer"
            v-if="isPodcastLiked"
            color="#ff4646"
            size="xl"
            :icon="['fas', 'heart']"
          />

          <font-awesome-icon
            @click="toggleLikeStatus(item.id)"
            style="cursor: pointer"
            v-else
            color="#ff4646"
            size="xl"
            :icon="['far', 'heart']"
          />
          <span>{{ item.likes_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import { likePodcast } from "@/api/podcasts";
import { podcastsStore } from "@/store/podcastsStore";

export default {
  name: "PodcastItem",
  components: { FontAwesomeIcon },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const store = podcastsStore();
    let isPodcastLiked = ref(false);
    const toggleLikeStatus = async (id) => {
      await likePodcast(id).then((res) => {
        store.setItemLikeCount(id, res.data);
        isPodcastLiked.value = !isPodcastLiked.value;
      });
    };

    return {
      isPodcastLiked,
      toggleLikeStatus,
    };
  },
};
</script>

<style scoped></style>
