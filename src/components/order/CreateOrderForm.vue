<template>
  <form method="POST" @submit.prevent="createOrder">
    <input
      type="text"
      v-model="name"
      class="mb-4 h-16 w-64 rounded-lg placeholder-gray-400 bg-gray-100 mr-2 hover:shadow"
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
      class="loginButton mb-4 h-16 w-64 rounded-lg bg-yellow-500 text-white text-xl"
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
input
  font-size: 1.25rem
  height: 3rem
  width: 24rem
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
