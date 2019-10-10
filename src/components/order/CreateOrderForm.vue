<template>
  <form method="POST" @submit.prevent="createOrder" class="m-5">
    <input
      type="text"
      v-model="name"
      class="mb-4 h-16 w-64 rounded-lg mr-2 shadow-md"
      placeholder="Nombre"
      :style="name ? 'border: 1px solid #5e75f6;' : ''"
    />
    <DatePick
      v-model="deadline"
      format="YYYY-MM-DD"
      start-week-on-sunday
      :isDateDisabled="isPastDate"
      placeholder="Fecha"
      class="mr-2"
      :style="
        deadline ? 'border: 1px solid #5e75f6; border-radius: .5rem;' : ''
      "
    />
    <button class="mb-4 rounded-lg text-xl shadow-md" type="submit">
      Crear Orden
    </button>
    <Alert :msg="error" />
  </form>
</template>

<script type="text/javascript">
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

import { AlertMixin } from '@/mixins/AlertMixin';

export default {
  name: 'CreateOrderForm',

  mixins: [AlertMixin],

  components: {
    DatePick,
  },

  data() {
    return {
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

<style lang="sass" scoped>
@import ../../assets/css/library.sass
</style>
