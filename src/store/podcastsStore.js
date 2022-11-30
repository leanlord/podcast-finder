import { defineStore } from "pinia";
import {
  getAllPodcasts,
  getPodcastsByWord,
  uploadPodcast,
} from "@/api/podcasts";
import { podcastsTransform } from "@/plugins/podcastsTransform";
import { getAudioDuration } from "@/plugins/getAudioDuration";
import { echoInstance } from "@/api/websocket";

export const podcastsStore = defineStore("podcasts", {
  state: () => {
    return {
      podcastsList: [],
      searchValue: null,
      isSearchResult: false,
      isPodcastLoading: true,
      isModalLoading: false,
      isModalActive: false,
      modalQuery: {},
    };
  },
  actions: {
    async fetchAllPodcasts(page = 1) {
      this.isPodcastLoading = true;
      this.isSearchResult = false;
      await getAllPodcasts(page).then((res) => {
        this.podcastsList = podcastsTransform(res.data.data);
        this.isPodcastLoading = false;
      });
    },
    async searchPodcasts() {
      if (this.searchValue.length > 0) {
        this.isSearchResult = true;
        await getPodcastsByWord(this.searchValue).then((res) => {
          this.podcastsList = podcastsTransform(res.data);
        });
      } else {
        await this.fetchAllPodcasts();
      }
    },
    async createPodcast() {
      this.isModalLoading = true;
      await uploadPodcast(this.modalQuery)
        .then((res) => {
          this.isModalLoading = false;
          this.isModalActive = false;
          const newPodcast = res.data.data;
          newPodcast.isLoading = true;
          this.podcastsList.unshift(newPodcast);
          echoInstance
            .channel(`private-podcasts.${res.data.data.id}`)
            .listen(".podcast.proceeded", (e) => {
              const index = this.podcastsList.findIndex(
                (podcast) => podcast.id === e.podcast.id
              );
              this.podcastsList[index] = podcastsTransform([e.podcast])[0];
            });
          alert(res.data.message);
        })
        .catch((e) => {
          this.isModalLoading = false;
          this.isModalActive = false;
          alert(e);
        });
    },
    async loadFile(event) {
      const file = event.target.files[0];
      this.modalQuery.file = file;
      this.modalQuery.duration = await getAudioDuration(file);
    },
  },
});
