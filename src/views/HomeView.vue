<template>
  <div class="home">
    <h1>Select your podcast</h1>
    <input type="file" @change="(event) => loadFile(event)" />
    <div v-if="isFormLoading" class="loader"></div>
    <div v-if="isPodcastsLoading" class="loader"></div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { podcastsStore } from "@/store/podcastsStore";
import { getAudioDuration } from "@/plugins/getAudioDuration";
import { uploadPodcast } from "@/api/podcasts";

export default {
  name: "HomeView",
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
      store.fetchPodcasts().then(() => {
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
