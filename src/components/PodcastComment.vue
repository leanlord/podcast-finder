<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  setup() {},
};
</script>

<template>
  <div class="comment">
    <div class="comment__title">
      <img :src="comment.user.avatar" alt="Аватар" width="24" />
      <span>{{ comment.user.name }},</span>
      <span>{{ comment.created_at }}</span>
    </div>
    <p class="comment__content">{{ comment.comment }}</p>
  </div>
</template>
