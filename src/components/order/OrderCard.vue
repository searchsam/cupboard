<template lang="html">
  <div class="card-order content-center w-1/5 m-2 bg-white">
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
    <div class="card-footer content-center flex flex-wrap" v-if="me.type <= 1">
      <button
        type="button"
        class="bg-yellow-500 text-white text-xl h-8 w-1/2 hover:bg-yellow-400"
        @click.prevent="showEditOrderForm(this.order)"
      >
        Editar
      </button>
      <button
        type="button"
        class="bg-gray-500 text-white text-xl h-8 w-1/2 hover:bg-gray-400"
        @click.prevent=""
      >
        Comprar
      </button>
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
        name: 'updateOrder',
        params: {
            id: this.order.id
        },
      });
    },

    showEditOrderForm(order) {
      this.name = order.name;
      this.deadline = order.deadline.split(' ')[0];
      this.status = order.status;
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
</style>
