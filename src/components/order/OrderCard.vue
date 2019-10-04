<template lang="html">
  <div class="card-order content-center w-1/5 m-2 bg-white relative">
    <div v-if="updateForm">
      <div
        class="content-center card-content py-4"
        :style="
          this.order.status
            ? 'border-left: 5px solid #68d391'
            : 'border-left: 5px solid #fc8181'
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
        <a href="#" class="p-2 hover:bg-yellow-400" @click.prevent="toggleVar('updateForm')">
          <i class="pe-7s-edit pe-lg pe-va"></i>
        </a>
        <a href="#" class="p-2 hover:bg-gray-400" @click.prevent="shopOrder">
          <i class="pe-7s-cart pe-lg pe-va"></i>
        </a>
      </div>
    </div>
    <div v-else>
      <form
        method="POST"
        class="block bg-white p-5"
        :style="
          this.order.status
            ? 'border-left: 5px solid #68d391'
            : 'border-left: 5px solid #fc8181'
        "
        @submit.prevent="updateOrder"
      >
        <input
          class="mb-4 h-12 w-64 border-2 border-gray-400 placeholder-gray-400"
          v-model="name"
          placeholder="Nombre"
        />
        <br />
        <DatePick
          format="YYYY-MM-DD"
          start-week-on-sunday
          :isDateDisabled="isPastDate"
          placeholder="Fecha"
          v-model="deadline"
          class="w-64"
        />
        <br />
        <button
          class="mt-4 h-12 w-64 border bg-yellow-500 text-white text-xl hover:bg-yellow-400"
          type="submit"
        >
          Actualizar Orden
        </button>
        <br />
        <button
          class="h-12 w-64 border bg-gray-500 text-white text-xl hover:bg-gray-400"
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

import Alert from '@/components/error/Alert.vue';
import { ToggleMixin } from '@/mixins/ToggleMixin';

export default {
  name: 'OrderCard',

  components: {
    Alert,
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
      name: this.order.name,
      deadline: this.order.deadline.split(' ')[0],
      error: null,
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
            }
          },
        });
        this.toggleVar('updateForm')
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
    isPastDate(date) {
      return date < new Date();
    },
  },
};
</script>

<style lang="sass" scoped>
.card-content
    &:hover
      border-style: solid
      border-color: #f6e05e
      border-width: 2px

.card-footer
    display: inline-grid
</style>
