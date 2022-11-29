import { defineStore } from "pinia";
import { getAllPodcasts, getPodcastsByWord } from "@/api/podcasts";
import { podcastsTransform } from "@/plugins/podcastsTransform";

export const podcastsStore = defineStore("podcasts", {
  state: () => {
    return {
      podcastsList: [],
      searchValue: null,
      isSearchResult: false,
    };
  },
  actions: {
    async fetchAllPodcasts(page = 1) {
      this.isSearchResult = false;
      await getAllPodcasts(page).then((res) => {
        this.podcastsList = podcastsTransform(res.data.data);
      });
    },
    async searchPodcasts() {
      if (this.searchValue.length > 0) {
        this.isSearchResult = true;
        await getPodcastsByWord(this.searchValue).then((res) => {
          this.podcastsList = podcastsTransform(res.data);
        });
      } else {
        this.fetchAllPodcasts();
      }
    },
  },
});
