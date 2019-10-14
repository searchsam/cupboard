<template>
  <li class="mb-6 block relative">
    <div v-if="updateForm">
      <div class="bg-white rounded-lg shadow-md hoverItem">
        <p class="text-lg static">
          <span
            class="bookmark rounded-l-lg inline-block static center"
            :class="bookmarkStatus"
          >
            <i
              class="icon-flipped rounded-full text-4xl p-1"
              :class="iconStatus"
            ></i>
          </span>
          <span class="inline-block center static text-2xl px-8">
            {{ request.quantity }}
          </span>
          <span class="itemBody text-xl inline-block static center py-2">
            <h1 class="inline">{{ request.description }}</h1>
            -
            <a class="secondaryText text-lg">
              <i class="ti-user"></i> {{ request.user.name }}
            </a>
            <br />
            <a class="secondaryText"
              ><i class="ti-info-alt"></i> {{ labelStatus }}</a
            >
          </span>
          <span
            class="float-right inline-block static mt-6 mr-4"
            v-if="orderStatus"
          >
            <a
              href="#"
              type="button"
              class="rounded-lg px-4 pt-4 pb-3 center"
              v-if="request.user.id == me.id"
              @click.prevent="toggleVar('updateForm')"
            >
              <i class="ti-write text-2xl"></i>
            </a>
            <div class="inline" v-if="me.type <= 1">
              <a
                href="#"
                type="button"
                class="rounded-lg px-4 pt-4 pb-3 center"
                v-if="request.status == 1 || request.status == 2"
                @click.prevent="deny"
              >
                <i class="ti-na text-2xl"></i>
              </a>
              <a
                href="#"
                type="button"
                v-if="request.status == 0 || request.status == 2"
                class="rounded-lg px-4 pt-4 pb-3 center"
                @click.prevent="approve"
              >
                <i class="ti-check text-2xl"></i>
              </a>
            </div>
          </span>
        </p>
      </div>
    </div>
    <div v-else>
      <form
        class="p-4 block rounded-lg shadow-md bg-white"
        method="POST"
        @submit.prevent="updateRequest"
      >
        <input
          class="descriptionButton rounded-lg mr-2"
          type="text"
          placeholder="Peticion"
          v-model="description"
          :class="description ? 'activeInput' : ''"
        />
        <input
          class="quantityButton rounded-lg mr-2"
          type="number"
          placeholder="Cantidad"
          v-model="quantity"
          :class="quantity ? 'activeInput' : ''"
        />
        <button class="pairButton rounded-lg text-xl mr-2" type="submit">
          Actualizar Solicitud
        </button>
        <button
          class="cancelButton pairButton rounded-lg text-xl"
          type="button"
          @click="toggleVar('updateForm')"
        >
          Cancelar
        </button>
      </form>
    </div>
    <Alert :msg="error" />
  </li>
</template>

<script>
import { AlertMixin } from '@/mixins/AlertMixin';
import { ToggleMixin } from '@/mixins/ToggleMixin';

export default {
  name: 'RequestItem',

  mixins: [AlertMixin, ToggleMixin],

  data() {
    return {
      description: this.request.description,
      quantity: this.request.quantity,
    };
  },

  props: {
    orderStatus: {
      type: Number,
      required: true,
    },
    request: {
      type: Object,
      required: true,
    },
  },

  inject: ['me'],

  computed: {
    bookmarkStatus() {
      return {
        0: 'reject',
        1: 'approve',
        2: '',
      }[this.request.status];
    },
    iconStatus() {
      return {
        0: 'ti-thumb-down',
        1: 'ti-thumb-up',
        2: 'ti-help-alt',
      }[this.request.status];
    },
    labelStatus() {
      return {
        0: 'RECHAZADA',
        1: 'APROBADA',
        2: 'EN ESPERA',
      }[this.request.status];
    },
  },

  methods: {
    async approve() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/ApproveRequest').default,
          variables: { id: this.request.id },
        });
      } catch (e) {
        this.error = e.message;
      }
    },
    async deny() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/DenyRequest').default,
          variables: { id: this.request.id },
          update: (store, { data: { denyRequest } }) => {
            const query = {
              query: require('@/graphql/queries/CurrentOrder').default,
              variables: { order_id: denyRequest.order.id },
            };
            store.writeQuery({
              ...query,
            });
          },
        });
      } catch (e) {
        this.error = e.message;
      }
    },
    async updateRequest() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/UpdateRequest').default,
          variables: {
            input: {
              id: this.request.id,
              description: this.description,
              quantity: this.quantity,
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
@import ../../assets/css/library.sass

.bookmark
  padding: 1.2rem 1rem 1rem 1rem
  background-color: $gray-shadow
  color: $text-light
  i
    background-color: $gray-dark

.approve
    background-color: $green-light
    color: $text-light
    i
      background-color: $green

.reject
  background-color: $red-light
  i
    background-color: $red
</style>
