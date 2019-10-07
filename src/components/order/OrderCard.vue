<template lang="html">
  <div class="card-order content-center w-auto m-2 bg-white relative">
    <div v-if="updateForm">
      <div
        class="content-center card-content py-4 rounded-lg border border-gray-400"
        :style="
          this.order.status
            ? 'border-left: 5px solid #c1f65e'
            : 'border-left: 5px solid #f6935e'
        "
        @click="goToOrder"
      >
        <h1 class="inline-block px-8">
          Orden: {{ order.name }} <br />
          Fecha: {{ order.deadline.split(' ')[0] }}
        </h1>
      </div>

      <div
        class="card-footer absolute top-0 right-0 table-row"
        v-if="me.type <= 1 && order.status"
      >
        <a
          href="#"
          class="p-2 hover:bg-yellow-400 rounded-full"
          @click.prevent="toggleVar('updateForm')"
        >
          <i class="pe-7s-edit pe-lg pe-va"></i>
        </a>
        <a
          href="#"
          class="p-2 hover:bg-gray-400 rounded-full"
          @click.prevent="shopOrder"
        >
          <i class="pe-7s-cart pe-lg pe-va"></i>
        </a>
      </div>
    </div>
    <div v-else>
      <form
        method="POST"
        class="rounded-lg content-center block bg-white p-5 border border-gray-400"
        :style="
          this.order.status
            ? 'border-left: 5px solid #c1f65e'
            : 'border-left: 5px solid #f6935e'
        "
        @submit.prevent="updateOrder"
      >
        <input
          class="mb-4 h-16 w-64 rounded-lg placeholder-gray-400 bg-gray-100 mr-2 hover:shadow"
          v-model="name"
          placeholder="Nombre"
          :style="name ? 'background-color: #5e75f6; color: white' : ''"
        />
        <br />
        <DatePick
          format="YYYY-MM-DD"
          start-week-on-sunday
          :isDateDisabled="isPastDate"
          placeholder="Fecha"
          v-model="deadline"
          class="w-64"
          :style="name ? '.vdpComponent.vdpWithInput>input {background-color: #5e75f6; color: white}' : ''"
        />
        <br />
        <button
          class="mt-4 loginButton h-16 w-64 rounded-t-lg bg-yellow-500 text-white text-xl hover:bg-yellow-400"
          type="submit"
        >
          Actualizar Orden
        </button>
        <br />
        <button
          class="registerButton h-16 w-64 rounded-b-lg bg-gray-500 text-white text-xl hover:bg-gray-400"
          type="button"
          @click="toggleVar('updateForm')"
        >
          Cancelar
        </button>
      </form>
    </div>
    <Alert :msg="error" />
  </div>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

import { AlertMixin } from '@/mixins/AlertMixin';
import { ToggleMixin } from '@/mixins/ToggleMixin';

export default {
  name: 'OrderCard',

  mixins: [AlertMixin],

  components: {
    DatePick,
  },

  mixins: [ToggleMixin],

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      deadline: this.order.deadline.split(' ')[0],
      name: this.order.name,
    };
  },

  inject: ['me'],

  methods: {
    goToOrder() {
      this.$router.push({
        name: 'requests',
        params: {
          id: this.order.id,
        },
      });
    },

    isPastDate(date) {
      return date < new Date();
    },

    async shopOrder() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/ShopOrder').default,
          variables: { id: this.order.id },
        });
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
    async updateOrder() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/UpdateOrder').default,
          variables: {
            input: {
              id: this.order.id,
              name: this.name,
              deadline: this.deadline,
            },
          },
        });
        this.toggleVar('updateForm');
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.card-content
    &:hover
      border-style: solid
      border-color: #f6df5e
      border-width: 1px

.card-footer
    display: inline-grid

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
