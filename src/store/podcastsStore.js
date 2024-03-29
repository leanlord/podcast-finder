import { defineStore } from "pinia";
import { getAllPodcasts, getPodcastsByWord } from "@/api/podcasts";
import { podcastsTransform } from "@/plugins/podcastsTransform";

export const podcastsStore = defineStore("podcasts", {
  state: () => {
    return {
      podcastsList: [],
      searchValue: null,
      isSearchResult: false,
      isPodcastLoading: true,
    };
  },
  actions: {
    setItemLikeCount(itemId, likesCount) {
      const index = this.podcastsList.findIndex((el) => el.id === itemId);
      this.podcastsList[index].likes_count = likesCount;
      this.podcastsList[index].is_liked = !this.podcastsList[index].is_liked;
    },
    setPodcasts(podcasts) {
      this.podcastsList = podcastsTransform(podcasts);
    },
    async fetchAllPodcasts(page = 1) {
      this.isPodcastLoading = true;
      this.isSearchResult = false;

      await getAllPodcasts(page).then((res) => {
        this.setPodcasts(res.data.data);
        this.isPodcastLoading = false;
      });
    },
    async searchPodcasts() {
      if (this.searchValue.length > 0) {
        this.isSearchResult = true;
        await getPodcastsByWord(this.searchValue).then((res) => {
          this.setPodcasts(res.data);
        });
      } else {
        await this.fetchAllPodcasts();
      }
    },
  },
});
