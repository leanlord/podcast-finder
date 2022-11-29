<template>
  <div class="container">
    <app-header />
    <podcast-search />
    <h1 class="podcast__heading">
      Список подкастов
      {{ store.isSearchResult ? "по релевантности" : "" }}
    </h1>
    <div class="podcast__preloader" v-if="store.isPodcastLoading">
      <div class="preloader">
        <span class="dot"></span>
        <div class="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <podcast-list v-else :podcasts="store.podcastsList" />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { podcastsStore } from "@/store/podcastsStore";
import PodcastSearch from "@/components/PodcastSearch.vue";
import AppHeader from "@/components/AppHeader.vue";
import PodcastList from "@/components/PodcastList.vue";
import { uploadPodcast } from "@/api/podcasts";
import { getAudioDuration } from "@/plugins/getAudioDuration";

export default {
  name: "PodcastView",
  components: { PodcastList, AppHeader, PodcastSearch },
  setup() {
    const store = podcastsStore();
    const loadFile = async (event) => {
      isFormLoading.value = true;
      const file = event.target.files[0];
      let duration = await getAudioDuration(file);
      await uploadPodcast(file, duration)
        .then((res) => {
          isFormLoading.value = false;
          alert(res.data.message);
        })
        .catch(() => {
          isFormLoading.value = false;
        });
    };
    onMounted(async () => {
      await store.fetchAllPodcasts();
    });

    return {
      loadFile,
      store,
    };
  },
};
</script>
