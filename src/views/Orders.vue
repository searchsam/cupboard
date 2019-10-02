<template>
  <div id="order">
    <h1 class="font-thin text-6xl">
      Ordenes
    </h1>

    <!-- Create New Order -->
    <div id="createOderForm" class="w-full bg-white m-2" v-show="me.type <= 1">
      <h1 class="p-4 text-xl">Crear Nueva Orden</h1>
      <CreateOrderForm />
    </div>

    <!-- Orders List -->
    <div
      v-if="!$apollo.queries.orders.loading"
      class="flex flex-wrap content-center"
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
      name: '',
      deadline: '',
      error: null,
    };
  },

  inject: ['me'],

  apollo: {
    orders: {
      query: require('@/graphql/queries/AllOrders').default,
    },
  },

  methods: {
    varToggle(varName) {
      this[varName] = !this[varName];
    },
    clearVarsFields() {
      this.name = '';
      this.deadline = '';
      this.status = null;
    },
  },

  computed: {
    ordersList: function () {
      if (this.orders) {
        return this.orders.sort((a, b) => (a.status < b.status ? 1 : -1));
      }
    },
  },
};
</script>
