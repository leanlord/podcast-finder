<template>
  <div
    @click="isModalActive = true"
    :class="{ 'podcast_is-loading': item.isLoading }"
    class="podcast"
  >
    <div class="podcast__avatar"></div>
    <div class="podcast__content">
      <div class="podcast__header">
        <span class="podcast__date">
          {{ item.formatted_date }}
        </span>
      </div>
      <div class="podcast__title">
        {{ item.original_name || "Нет имени" }}
      </div>
      <div class="podcast__text">
        {{ item.text_contents }}
      </div>
      <div class="podcast__footer">
        <div>
          <font-awesome-icon
            @click.stop="toggleLikeStatus(item.id)"
            style="cursor: pointer"
            v-if="isPodcastLiked"
            color="#ff4646"
            size="xl"
            :icon="['fas', 'heart']"
          />

          <font-awesome-icon
            @click.stop="toggleLikeStatus(item.id)"
            style="cursor: pointer"
            v-else
            color="#ff4646"
            size="xl"
            :icon="['far', 'heart']"
          />
          <span>{{ item.likes_count }}</span>
        </div>
      </div>
      <teleport to="body">
        <app-dialog
          @hide-modal="isModalActive = false"
          head="Комментарии"
          :active="isModalActive"
          v-if="isModalActive"
        >
          <template #content>
            <h4 class="comment__head">Комментарии</h4>
            <ul v-if="item.comments.length > 0" class="comment__wrapper">
              <li v-for="comment in item.comments" :key="comment.id">
                <podcast-comment :comment="comment" />
              </li>
            </ul>
            <p v-else>Комментариев к подкасту нет.</p>
            <h4>Новый комментарий</h4>
            <div>
              <textarea
                v-model="commentValue"
                rows="5"
                cols="70"
                placeholder="Комментарий"
              ></textarea>
            </div>
            <button
              @click="commentPodcast(item.id, commentValue)"
              class="button comment__button"
            >
              Отправить
            </button>
          </template>
        </app-dialog>
      </teleport>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import { commentCurrentPodcast, likePodcast } from "@/api/podcasts";
import { podcastsStore } from "@/store/podcastsStore";
import AppDialog from "@/components/AppDialog.vue";
import PodcastComment from "@/components/PodcastComment.vue";

export default {
  name: "PodcastItem",
  components: { PodcastComment, AppDialog, FontAwesomeIcon },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const store = podcastsStore();
    let isPodcastLiked = ref(false);
    let isModalActive = ref(false);
    const commentValue = ref("");
    const toggleLikeStatus = async (id) => {
      await likePodcast(id).then((res) => {
        store.setItemLikeCount(id, res.data);
        isPodcastLiked.value = !isPodcastLiked.value;
      });
    };

    const commentPodcast = async (id, comment) => {
      await commentCurrentPodcast(id, comment)
        .then(() => {
          alert("Комментарий отправлен");
        })
        .catch(() => {
          alert("Произошла ошибка при отправке комментария");
        });
    };

    return {
      isPodcastLiked,
      toggleLikeStatus,
      isModalActive,
      commentPodcast,
      commentValue,
    };
  },
};
</script>

<style scoped></style>
