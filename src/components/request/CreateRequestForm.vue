<template>
  <form class="p-4" action="" method="POST" @submit.prevent="createRequest">
    <input
      class="mr-2 h-12 border-2 border-gray-400 placeholder-gray-400"
      v-model="description"
      type="text"
      placeholder="Peticion"
      style="width: 24rem;"
    />
    <input
      class="mr-2 w-24 h-12 border-2 border-gray-400 placeholder-gray-400"
      v-model="quantity"
      type="number"
      placeholder="Cantidad"
    />
    <button
      class="bg-yellow-500 text-white text-xl h-12 w-40 hover:bg-yellow-400"
      type="submit"
    >
      Crear Solicitud
    </button>
    <Alert :msg="error" />
  </form>
</template>

<script>
import { AlertMixin } from '@/mixins/AlertMixin';

export default {
  name: 'CreateRequestForm',

  mixins: [AlertMixin],

  data() {
    return {
      description: '',
      quantity: '',
    };
  },

  inject: ['me'],

  methods: {
    cleanVars() {
      this.description = '';
      this.quantity = '';
      this.error = null;
    },

    async createRequest() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/CreateRequest').default,
          variables: {
            input: {
              description: this.description,
              quantity: this.quantity,
              order_id: this.$route.params.id,
            },
          },
          update: (store, { data: { createRequest } }) => {
            const query = {
              query: require('@/graphql/queries/CurrentOrder').default,
              variables: { order_id: this.$route.params.id },
            };
            const data = store.readQuery(query);
            data.order.requests.push({
              ...createRequest,
              user: {
                ...this.me,
              },
            });
            store.writeQuery({
              ...query,
              data,
            });
          },
        });

        this.cleanVars();
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>
