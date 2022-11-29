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
      v-if="store.isModalActive"
      :active="store.isModalActive"
      @hide-modal="store.isModalActive = false"
      head="Добавление подкаста"
    >
      <template #content>
        <app-preloader v-if="store.isModalLoading" />
        <form
          v-else
          name="modal_form"
          id="modal_form"
          @submit.prevent="store.createPodcast()"
          class="auth__form"
        >
          <label for="modal_name">Название подкаста</label>
          <input
            required
            id="modal_name"
            class="auth__input"
            type="text"
            v-model="store.modalQuery.name"
            placeholder="Название"
          />
          <label for="modal_file">Выбрать файл</label>
          <input
            required
            id="modal_file"
            class="auth__input"
            type="file"
            @change="(value) => loadFile(value)"
          />
        </form>
      </template>
      <template #footer>
        <div class="modal__buttons">
          <button
            :disabled="store.isModalLoading"
            @click="store.isModalActive = false"
            class="btn btn_white"
          >
            Отменить
          </button>
          <button
            :disabled="store.isModalLoading"
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
    onMounted(async () => {
      await store.fetchAllPodcasts();
    });

    return {
      store,
    };
  },
};
</script>
