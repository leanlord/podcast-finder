<template>
  <div class="search">
    <input
      placeholder="Введите ключевые слова подкаста"
      class="search__input"
      type="text"
      @change="store.searchPodcasts()"
      v-model="store.searchValue"
    />
    <button @click="store.isModalActive = true" class="search__button">
      <svg
        width="22"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5101 6.24805L9.41022 13.3479C8.56597 14.1922 7.19717 14.1922 6.35292 13.3479C5.5069 12.5019 5.50893 11.1296 6.35745 10.2861L11.8632 4.81285L13.2459 3.43018C14.9282 1.74784 17.6558 1.74784 19.3381 3.43018C21.0205 5.11252 21.0205 7.84013 19.3381 9.52246L17.9763 10.8843L12.8148 16.0459C10.1448 18.827 6.09921 19.2502 3.27061 16.5348C0.476637 13.8525 0.950206 9.83129 3.7752 7.00629L8.91637 1.86433"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { podcastsStore } from "@/store/podcastsStore";

export default {
  name: "PodcastSearch",
  setup() {
    const store = podcastsStore();
    return {
      store,
    };
  },
};
</script>

<style scoped></style>
