<template>
  <form action="" method="POST" @submit.prevent="createRequest">
    <input
      class="mb-4 h-16 w-64 rounded-lg placeholder-gray-400 bg-gray-100 mr-2 hover:shadow"
      v-model="description"
      type="text"
      placeholder="Peticion"
      style="width: 24rem;"
    />
    <input
      class="mb-4 h-16 w-32 rounded-lg placeholder-gray-400 bg-gray-100 mr-2 hover:shadow"
      v-model="quantity"
      type="number"
      placeholder="Cantidad"
    />
    <button
      class="loginButton mb-4 h-16 w-64 rounded-lg bg-yellow-500 text-white text-xl"
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

<style lang="sass" scoped>
input
  font-size: 1.25rem
  height: 3rem
  color: #CBD5E0

  &:focus
    outline: none
    background-color: #5e75f6
    box-shadow: none
    color: #fff
    &::-webkit-input-placeholder
      color: #5e75f6

    &:-moz-placeholder
      color: #5e75f6

    &::-moz-placeholder
      color: #5e75f6

    &:-ms-input-placeholder
      color: #5e75f6

  &::-webkit-input-placeholder
    font-size: 1.25rem
    text-align: center
    &:focus
      color: #5e75f6

  &:-moz-placeholder
    font-size: 1.25rem
    text-align: center
    &:focus
      color: #5e75f6

  &::-moz-placeholder
    font-size: 1.25rem
    text-align: center
    &:focus
      color: #5e75f6

  &:-ms-input-placeholder
    font-size: 1.25rem
    text-align: center
    &:focus
      color: #5e75f6

button
  height: 3rem
  width: 24rem

  &:focus
    outline: none

  &.loginButton
    background-color: #f1c842
    &:hover
      background-color: #f6df5e
</style>
