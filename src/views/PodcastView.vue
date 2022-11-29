<template>
  <div class="container">
    <app-header />
    <podcast-search />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { podcastsStore } from "@/store/podcastsStore";
import { getAudioDuration } from "@/plugins/getAudioDuration";
import { uploadPodcast } from "@/api/podcasts";
import PodcastSearch from "@/components/PodcastSearch.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "PodcastView",
  components: { AppHeader, PodcastSearch },
  setup() {
    let isFormLoading = ref(false);
    let isPodcastsLoading = ref(false);
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
      isPodcastsLoading.value = true;
      store.fetchAllPodcasts().then(() => {
        isPodcastsLoading.value = false;
      });
    });

    return {
      loadFile,
      isFormLoading,
      isPodcastsLoading,
    };
  },
};
</script>
