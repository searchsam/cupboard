<template lang="html">
  <div class="card-order content-center w-1/5 m-2 bg-white relative">
    <div
      class="content-center card-content py-4"
      :style="
        this.order.status
          ? 'border-left: 5px solid #68d391'
          : 'border-left: 5px solid #fc8181'
      "
      @click="goToOrder"
    >
      <h1 class="inline-block px-8">
        Orden: {{ this.order.name }} <br />
        Fecha: {{ this.order.deadline.split(' ')[0] }}
      </h1>
    </div>

    <div
      class="card-footer absolute top-0 right-0 table-row"
      v-if="me.type <= 1"
    >
      <a
        href="#"
        class="p-2 hover:bg-yellow-400"
        @click.prevent="showEditOrderForm(this.order)"
      >
        <i class="pe-7s-edit pe-lg pe-va"></i>
      </a>
      <a href="#" class="p-2 hover:bg-gray-400">
        <i class="pe-7s-cart pe-lg pe-va"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderCard',

  props: {
    order: Object,
  },

  data() {
    return {
      name: null,
      deadline: null,
      status: null,
    };
  },

  inject: ['me'],

  methods: {
    goToOrder() {
      this.$router.push({
        name: 'requests',
        params: {
          id: this.order.id,
        },
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.card-content
    &:hover
      border-style: solid
      border-color: #f6e05e
      border-width: 2px

.card-footer
    display: inline-grid
</style>
