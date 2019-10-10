<template>
  <form method="POST" @submit.prevent="createRequest" class="m-5">
    <input
      class="descriptionButton rounded-lg mr-2 shadow-md"
      v-model="description"
      type="text"
      placeholder="Peticion"
      :style="description ? 'border: 1px solid #5e75f6;' : ''"
    />
    <input
      class="quantityButton rounded-lg mr-2 shadow-md text-center"
      v-model="quantity"
      type="number"
      placeholder="Cantidad"
      :style="quantity ? 'border: 1px solid #5e75f6;' : ''"
    />
    <button class="rounded-lg text-xl shadow-md" type="submit">
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
              variables: { id: this.$route.params.id },
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

<style lang="sass" scoped>
@import ../../assets/css/library.sass

.descriptionButton
  width: 32rem

.quantityButton
  width: 8rem
</style>
