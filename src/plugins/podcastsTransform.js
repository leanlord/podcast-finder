import { formatDate } from "@/plugins/dateHelper";

export const podcastsTransform = (data) => {
  return data.map((podcast) => ({
    ...podcast,
    formatted_date: formatDate(podcast.created_at),
  }));
};
