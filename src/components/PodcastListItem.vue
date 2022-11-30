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
    </div>
  </div>
</template>

<script>
export default {
  name: "PodcastItem",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped></style>
