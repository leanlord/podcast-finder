import instance from "@/api/http";

export const uploadPodcast = (formData) =>
  instance.post("upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
