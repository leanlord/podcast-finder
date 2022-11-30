<template>
  <div class="container">
    <app-header />
    <podcast-search />
    <h1 class="podcast__heading">
      Список подкастов
      {{ store.isSearchResult ? "по релевантности" : "" }}
    </h1>
    <app-preloader v-if="store.isPodcastLoading" />
    <podcast-list v-else :podcasts="store.podcastsList" />
    <app-dialog
      v-if="modalStore.isModalActive"
      :active="modalStore.isModalActive"
      @hide-modal="modalStore.$reset()"
      head="Добавление подкаста"
    >
      <template #content>
        <app-preloader v-if="modalStore.isModalLoading" />
        <form
          v-else
          name="modal_form"
          id="modal_form"
          @submit.prevent="modalStore.createPodcast()"
          class="auth__form"
        >
          <label for="modal_name">Название подкаста</label>
          <input
            required
            id="modal_name"
            class="auth__input"
            type="text"
            v-model="modalStore.modalQuery.name"
            placeholder="Название"
          />
          <label class="modal__label" for="modal_file">{{
            modalStore.modalQuery.fileName || "Выбрать файл"
          }}</label>
          <input
            required
            id="modal_file"
            class="auth__input modal__file"
            type="file"
            @change="(value) => modalStore.loadFile(value)"
          />
        </form>
      </template>
      <template #footer>
        <div class="modal__buttons">
          <button
            :disabled="modalStore.isModalLoading"
            @click="modalStore.$reset()"
            class="btn btn_white"
          >
            Отменить
          </button>
          <button
            :disabled="modalStore.isModalLoading"
            form="modal_form"
            type="submit"
            class="btn"
          >
            Загрузить
          </button>
        </div>
      </template>
    </app-dialog>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { podcastsStore } from "@/store/podcastsStore";
import PodcastSearch from "@/components/PodcastSearch.vue";
import AppHeader from "@/components/AppHeader.vue";
import PodcastList from "@/components/PodcastList.vue";
import AppDialog from "@/components/AppDialog.vue";
import AppPreloader from "@/components/AppPreloader.vue";
import { podcastModalStore } from "@/store/podcastModalStore";

export default {
  name: "PodcastView",
  components: {
    AppPreloader,
    AppDialog,
    PodcastList,
    AppHeader,
    PodcastSearch,
  },
  setup() {
    const store = podcastsStore();
    const modalStore = podcastModalStore();
    onMounted(async () => {
      await store.fetchAllPodcasts();
    });

    return {
      store,
      modalStore,
    };
  },
};
</script>
