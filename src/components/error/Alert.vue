<template lang="html">
  <div
    id="alert"
    v-if="this.msg"
    class="flex items-center bg-red-500 text-white px-4 py-3"
    role="alert"
  >
    <p>{{ this.msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    msg: {
      type: String
    }
  }
};
</script>

<style lang="sass" scoped></style>
