<template lang="html">
  <div class="card-order content-center w-auto mr-4 relative">
    <div v-if="updateForm">
      <div
        class="card-content p-5 rounded-lg bg-white shadow-md hover:cursor-pointer"
        :style="
          this.order.status
            ? 'border-left: 7px solid #75F65E'
            : 'border-left: 7px solid #F65E75'
        "
        @click="goToOrder"
      >
        <span class="inline-block pr-10">
          <h1 class="text-2xl font-medium mb-2">{{ order.name }} <br /></h1>
          <p class="text-lg">
            {{ order.deadline.split(' ')[0] }}
          </p>
        </span>
      </div>

      <div
        class="card-footer absolute top-0 right-0 table-row"
        v-if="me.type <= 1 && order.status"
      >
        <a
          href="#"
          type="button"
          class="rounded-full py-3"
          @click.prevent="toggleVar"
        >
          <i class="ti-write text-3xl"></i>
        </a>
        <a
          href="#"
          type="button"
          class="rounded-full py-3"
          @click.prevent="shopOrder"
        >
          <i class="ti-shopping-cart text-3xl"></i>
        </a>
      </div>
    </div>
    <div v-else>
      <form
        method="POST"
        class="block p-5 rounded-lg shadow-md bg-white"
        @submit.prevent="updateOrder"
      >
        <input
          class="mb-4 rounded-lg shadow-md"
          v-model="name"
          placeholder="Nombre"
          :style="name ? 'border: 1px solid #5e75f6; color: #2F3A7B;' : ''"
        />
        <br />
        <DatePick
          format="YYYY-MM-DD"
          start-week-on-sunday
          :isDateDisabled="isPastDate"
          placeholder="Fecha"
          v-model="deadline"
          class="mb-4 shadow-md"
          :style="
            deadline
              ? '.vdpComponent.vdpWithInput>input{border: 1px solid #5e75f6; border-radius: .5rem;}'
              : ''
          "
        />
        <br />
        <button
          class="mb-4 createOrderButton rounded-lg text-xl shadow-md"
          type="submit"
        >
          Actualizar Orden
        </button>
        <br />
        <button
          class="cancelButton rounded-lg text-xl shadow-md"
          type="button"
          @click="toggleVar"
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

export default {
  name: 'OrderCard',

  mixins: [AlertMixin],

  components: {
    DatePick,
  },

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
      updateForm: true,
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
    toggleVar() {
      this.updateForm = !this.updateForm;
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
        this.toggleVar();
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import ../../assets/css/library.sass

.card-content
  p
    color: $gray-dark
  &:hover
    cursor: pointer
    background-color: $gray-light
    border: none

.card-footer
  display: inline-grid
  a:hover
    background-color: $blue
    color: $text-light
</style>
