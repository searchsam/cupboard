<template>
  <form class="p-4" method="POST" @submit.prevent="createOrder">
    <input
      type="text"
      v-model="name"
      class="h-12 border-2 border-gray-400 mr-2"
      placeholder="Nombre"
    />
    <DatePick
      v-model="deadline"
      format="YYYY-MM-DD"
      start-week-on-sunday
      :isDateDisabled="isPastDate"
      placeholder="Fecha"
      class="mr-2"
    />
    <button
      class="bg-yellow-500 text-white text-xl h-12 w-40 hover:bg-yellow-400"
      type="submit"
    >
      Crear Orden
    </button>
    <Alert :msg="error" />
  </form>
</template>

<script type="text/javascript">
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

import Alert from '@/components/error/Alert.vue';

export default {
  name: 'CreateOrderForm',

  components: {
    Alert,
    DatePick,
  },

  data() {
    return {
      error: null,
      name: null,
      deadline: null,
    };
  },

  methods: {
    async createOrder() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/CreateOrder').default,
          variables: {
            input: {
              name: this.name,
              deadline: this.deadline,
            },
          },
          update: (store, { data: { createOrder } }) => {
            const query = {
              query: require('@/graphql/queries/AllOrders').default,
            };
            const data = store.readQuery(query);
            data.orders.push(createOrder);
            store.writeQuery({
              ...query,
              data,
            });
          },
        });
        this.clearVarsFields();
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },

    clearVarsFields() {
      this.name = '';
      this.deadline = '';
      this.error = '';
    },

    isPastDate(date) {
      return date < new Date();
    },
  },
};
</script>
