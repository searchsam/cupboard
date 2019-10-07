<template>
  <div id="order" class="bg-white rounded-lg shadow border-gray-400">
    <h1 class="tittle font-thin text-5xl p-5">
      Ordenes
    </h1>

    <!-- Create New Order -->
    <div id="createOderForm" v-show="me.type <= 1" class="p-5">
      <h1 class="text-xl mb-4">Crear Nueva Orden</h1>
      <CreateOrderForm />
    </div>

    <!-- Orders List -->
    <div
      v-if="!$apollo.queries.orders.loading"
      class="flex flex-wrap content-center p-5"
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

  methods: {
    clearVarsFields() {
      this.name = '';
      this.deadline = '';
      this.status = null;
    },
    varToggle(varName) {
      this[varName] = !this[varName];
    },
  },

  computed: {
    ordersList: function() {
      return (this.orders || []).sort((a, b) => (a.status < b.status ? 1 : -1));
    },
  },
};
</script>

<style lang="sass" scoped>
.tittle
  border-bottom: 1px solid #f7fafc

#createOderForm
  border-bottom: 1px solid #f7fafc
</style>
