import { defineStore } from "pinia";
import { getAllPodcasts, getPodcastsByWord } from "@/api/podcasts";
import { podcastsTransform } from "@/plugins/podcastsTransform";

export const podcastsStore = defineStore("podcasts", {
  state: () => {
    return {
      podcastsList: null,
      searchValue: null,
    };
  },
  actions: {
    async fetchAllPodcasts(page = 1) {
      await getAllPodcasts(page).then((res) => {
        this.podcastsList = podcastsTransform(res.data.data);
      });
    },
    async searchPodcasts() {
      await getPodcastsByWord(this.searchValue).then((res) => {
        this.podcastsList = podcastsTransform(res.data);
      });
    },
  },
});
