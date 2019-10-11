<template lang="html">
  <div class="card-order content-center w-auto mr-4 relative">
    <div v-if="updateForm">
      <div
        class="cardContent p-5 rounded-lg bg-white shadow-md hover:cursor-pointer"
        :class="this.order.status ? 'cardActive' : 'cardInactive'"
        @click="goToOrder"
      >
        <span class="inline-block pr-10">
          <h1 class="text-2xl mb-2">{{ order.name }}</h1>
          <br />
          <p class="text-lg">
            <i class="ti-calendar"></i> {{ order.deadline.split(' ')[0] }}
          </p>
        </span>
      </div>

      <div
        class="cardFooter absolute top-0 right-0 table-row"
        v-if="me.type <= 1 && order.status"
      >
        <a
          href="#"
          type="button"
          class="rounded-full py-3"
          @click.prevent="toggleVar('updateForm')"
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
          :class="name ? 'activeInput' : ''"
        />
        <br />
        <DatePick
          format="YYYY-MM-DD"
          start-week-on-sunday
          :isDateDisabled="isPastDate"
          placeholder="Fecha"
          v-model="deadline"
          class="mb-4"
          :class="deadline ? 'activeInput' : ''"
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
    toggleVar(varName) {
      this[varName] = !this[varName];
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

.cardContent
  p
    color: $gray-dark
  &:hover
    cursor: pointer

.cardActive
    border-left: 7px solid #75F65E

.cardInactive
    border-left: 7px solid #F65E75

.cardFooter
  display: inline-grid
  a:hover
    background-color: $blue
    color: $text-light
</style>
