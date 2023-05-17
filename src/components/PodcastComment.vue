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
      {{ comment.user.name }},
      {{ comment.created_at }}
    </div>
    <p class="comment__content">{{ comment.comment }}</p>
  </div>
</template>
