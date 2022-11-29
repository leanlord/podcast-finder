import instance from "@/api/http";

export const uploadPodcast = (formData, duration) =>
  instance.post(
    "upload",
    { file: formData, duration },
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
