<template>
  <div id="order">
    <h1 class="font-thin text-6xl">
      Ordenes
    </h1>

    <!-- Create New Order -->
    <div id="createOderForm" class="w-full bg-white m-2">
      <h1 class="p-4 text-xl">Crear Nueva Orden</h1>
      <CreateOrderForm />
    </div>

    <!-- Orders List -->
    <div v-if="!$apollo.queries.orders.loading" class="flex flex-wrap content-center">
      <!-- Orders Cards -->
      <OrderCard v-for="order in orders" :key="order.id" :order="order" />
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
      status: null,
      showCreateForm: true,
      newOrder: null,
      orders: [],
      error: null,
      showEditForm: true,
    };
  },

  apollo: {
    orders: {
      query: require('@/graphql/queries/AllOrders').default,
    },
  },

  methods: {
    monoChrome(varName) {
      this[varName] = !this[varName];
    },
    showEditOrderForm(order) {
      this.name = order.name;
      this.deadline = order.deadline.split(' ')[0];
      this.status = order.status;
      this.monoChrome('showEditForm');
    },
    clearVarsFields() {
      this.name = '';
      this.deadline = '';
      this.status = null;
    },
    async updateOrder() {
      try {
        const response = await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/UpdateOrder').default,
          variables: {
            input: { name: this.name, deadline: this.deadline },
          },
        });

        this.orders.push(response.data.createOrder);

        this.error = null;
        this.monoChrome('showCreateForm');
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
      this.clearVarsFields();
    },
  },
};
</script>

<style lang="sass" scoped>
.show-form:hover
    border-style: solid
    border-color: #cbd5e0
    border-width: 2px
</style>
