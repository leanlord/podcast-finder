import instance from "@/api/http";

export const uploadPodcast = (payload) =>
  instance.post(
    "upload",
    { ...payload },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const getAllPodcasts = (page) =>
  instance.get("podcasts", {
    params: {
      page,
    },
  });

export const getPodcastsByWord = (search) =>
  instance.get("search", {
    params: {
      search,
    },
  });

export const likePodcast = (id) => instance.post(`podcasts/${id}/like`, {});

export const commentCurrentPodcast = (id, comment) =>
  instance.post(`podcasts/${id}/comment`, {
    comment,
  });
