import { defineStore } from "pinia";
import { getAllPodcasts } from "@/api/podcasts";

export const podcastsStore = defineStore("podcasts", {
  state: () => {
    return {
      podcastsList: null,
    };
  },
  actions: {
    async fetchPodcasts(page = 1) {
      await getAllPodcasts(page).then((res) => {
        this.podcastsList = res.data.data;
      });
    },
  },
});
