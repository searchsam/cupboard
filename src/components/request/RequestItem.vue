<template>
  <li>
    <div class="item-list">
      <p class="p-5">
        <span class="item-list-index p-5">{{ index + 1 }}</span>
        <span class="p-5">
          {{ request.description }}
          {{ request.quantity }}
          ({{ request.user.name }})
        </span>
        <span class="float-right">
          <a href="#">denegar</a>
          <a href="#">editar</a>
        </span>
      </p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'RequestItem',

  props: {
    request: {
      type: Object,
      required: true,
    },
    index: {
        type: Number,
        required: true,
    }
  },
};
</script>

<style lang="sass" scoped>
.item-list
    border-bottom: 2px solid #cbd5e0

.item-list
    &:hover
        border-style: solid
        border-color: #f6e05e
        border-width: 2px

.item-list-index
    border-right: 2px solid #cbd5e0
</style>
