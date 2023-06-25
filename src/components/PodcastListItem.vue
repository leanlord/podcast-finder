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
        <div class="podcast__author">
          <img :src="item.author.avatar" alt="Аватар" height="20" />
          <span>{{ item.author.name }} </span>
          <button
            v-if="item.author.id !== currentUser.id"
            @click.stop="toggleSubscribeAuthor(item.author.id)"
            class="button"
          >
            {{ item.is_followed ? "Отписаться" : "Подписаться" }}
          </button>
        </div>
      </div>
      <div class="podcast__title">
        {{ item.original_name || "Нет имени" }}
      </div>
      <div class="podcast__text">
        {{ item.text_contents }}
      </div>
      <div class="podcast__footer">
        <div class="podcast__likes">
          <font-awesome-icon
            @click.stop="toggleLikeStatus(item.id)"
            style="cursor: pointer"
            color="#ff4646"
            size="xl"
            :icon="[item.is_liked ? 'fas' : 'far', 'heart']"
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
import {
  commentCurrentPodcast,
  followAuthor,
  likePodcast,
} from "@/api/podcasts";
import { podcastsStore } from "@/store/podcastsStore";
import AppDialog from "@/components/AppDialog.vue";
import PodcastComment from "@/components/PodcastComment.vue";
import { storeToRefs } from "pinia";
import { userStore } from "@/store/userStore";
import { usersStore } from "@/store/usersStore";

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
    const storeUser = userStore();
    const storeUsers = usersStore();
    const { currentUser } = storeToRefs(storeUser);

    let isModalActive = ref(false);
    const commentValue = ref("");

    const toggleLikeStatus = async (id) => {
      await likePodcast(id).then((res) => {
        store.setItemLikeCount(id, res.data.data.likes_count);
      });
    };

    const toggleSubscribeAuthor = async (friend) => {
      await followAuthor(friend);
      await store.fetchAllPodcasts();
      await storeUsers.fetchFollowings();
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
      toggleLikeStatus,
      isModalActive,
      commentPodcast,
      commentValue,
      toggleSubscribeAuthor,
      currentUser,
    };
  },
};
</script>

<style scoped></style>
