import { defineStore } from "pinia";
import { getAllPodcasts } from "@/api/podcasts";
import { podcastsTransform } from "@/plugins/podcastsTransform";

export const podcastsStore = defineStore("podcasts", {
  state: () => {
    return {
      podcastsList: null,
    };
  },
  actions: {
    async fetchPodcasts(page = 1) {
      await getAllPodcasts(page).then((res) => {
        this.podcastsList = podcastsTransform(res.data.data);
      });
    },
  },
});
