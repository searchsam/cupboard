<template>
  <div id="order">
    <h1 class="font-thin text-5xl p-5 m-5">
      Ordenes
      <a
        type="button"
        class="showFormButton rounded-full"
        v-show="me.type <= 1"
        @click="toggleVar('createForm')"
      >
        <i class="text-4xl" :class="createForm ? 'ti-close' : 'ti-plus'"></i>
    </a>
    </h1>

    <!-- Create New Order -->
    <div id="createOderForm" class="createForm p-5 shadow-md" v-if="createForm">
      <h1 class="text-2xl m-5">Crear Nueva Orden</h1>
      <CreateOrderForm />
    </div>

    <!-- Orders List -->
    <div
      v-if="!$apollo.queries.orders.loading"
      class="flex flex-wrap content-center p-5 m-5"
    >
      <!-- Orders Cards -->
      <OrderCard v-for="order in ordersList" :key="order.id" :order="order" />
    </div>
    <div v-else>
      <span>Loading...</span>
    </div>
  </div>
</template>

<script type="text/javascript">
import CreateOrderForm from '@/components/order/CreateOrderForm';
import OrderCard from '@/components/order/OrderCard';

export default {
  name: 'Orders',

  components: {
    CreateOrderForm,
    OrderCard,
  },

  data() {
    return {
      createForm: false,
      deadline: '',
      name: '',
    };
  },

  inject: ['me'],

  apollo: {
    orders: {
      query: require('@/graphql/queries/AllOrders').default,
    },
  },

  computed: {
    ordersList: function() {
      return (this.orders || []).sort((a, b) => (a.status < b.status ? 1 : -1));
    },
  },

  methods: {
    clearVarsFields() {
      this.name = '';
      this.deadline = '';
      this.status = null;
    },
    toggleVar(varName) {
      this[varName] = !this[varName];
    },
  },
};
</script>

<style lang="sass" scoped></style>
