<template>
  <div
    :class="{ dialog_isActive: active }"
    @click.self="$emit('hideModal')"
    class="dialog"
  >
    <div class="dialog__container">
      <div class="dialog__head">
        <slot name="title">
          <h3 class="dialog__title">{{ head }}</h3>
        </slot>
        <div class="dialog__close" @click="$emit('hideModal')"></div>
      </div>
      <div class="dialog__content">
        <slot name="content" />
      </div>
      <div class="dialog__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppDialog",
  props: {
    head: {
      type: String,
    },
    active: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: ["hideModal"],
  mounted() {
    document.body.style.overflowY = "hidden";
  },
  beforeUnmount() {
    document.body.style.overflowY = "auto";
  },
};
</script>

<style scoped></style>
