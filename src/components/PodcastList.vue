<template>
  <div v-if="podcasts.length > 0" class="podcast__list">
    <podcast-item v-for="item in podcasts" :item="item" :key="item.id" />
  </div>
  <div v-else>
    <h2>Ничего не найдено</h2>
  </div>
</template>

<script>
import PodcastItem from "@/components/PodcastListItem.vue";

export default {
  name: "PodcastList",
  components: { PodcastItem },
  props: {
    podcasts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
