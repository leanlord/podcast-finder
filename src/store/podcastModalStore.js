import { defineStore } from "pinia";
import { uploadPodcast } from "@/api/podcasts";
import { podcastsTransform } from "@/plugins/podcastsTransform";
import { getAudioDuration } from "@/plugins/getAudioDuration";
import { echoInstance } from "@/api/websocket";
import { podcastsStore } from "@/store/podcastsStore";

export const podcastModalStore = defineStore("podcastModalStore", {
  state: () => {
    return {
      isModalLoading: false,
      isModalActive: false,
      modalQuery: {},
    };
  },
  actions: {
    async createPodcast() {
      const storePodcasts = podcastsStore();
      this.isModalLoading = true;
      await uploadPodcast(this.modalQuery)
        .then((res) => {
          this.isModalLoading = false;
          this.isModalActive = false;
          const newPodcast = res.data.data;
          newPodcast.isLoading = true;
          storePodcasts.podcastsList.unshift(newPodcast);
          echoInstance
            .channel(`private-podcasts.${res.data.data.id}`)
            .listen(".podcast.proceeded", (e) => {
              const index = storePodcasts.podcastsList.findIndex(
                (podcast) => podcast.id === e.podcast.id
              );
              storePodcasts.podcastsList[index] = podcastsTransform([
                e.podcast,
              ])[0];
            });
          alert(res.data.message);
        })
        .finally(() => {
          this.isModalLoading = false;
          this.isModalActive = false;
        });
    },
    async loadFile(event) {
      const file = event.target.files[0];
      this.modalQuery.file = file;
      this.modalQuery.fileName = file.name;
      this.modalQuery.duration = await getAudioDuration(file);
    },
  },
});
