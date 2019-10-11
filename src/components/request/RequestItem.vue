<template>
  <li class="mb-2">
    <div v-if="updateForm">
      <div
        class="item-list rounded-lg border border-gray-400"
        :style="
          request.status
            ? 'border-left: 5px solid #c1f65e'
            : 'border-left: 5px solid #f6935e'
        "
      >
        <p class="pt-6 pb-6">
          <span class="p-5">
            {{ request.quantity }} -
            {{ request.description }}
            ({{ request.user.name }}) -
            {{ request.status ? 'Aprobada' : 'Rechazada' }}
          </span>
          <span class="float-right" v-if="orderStatus">
            <a
              href="#"
              class="action change p-4 rounded-full"
              v-if="request.user.id == me.id"
              @click.prevent="toggleVar('updateForm')"
            >
              <i class="pe-7s-edit pe-lg pe-va"></i>
            </a>
            <div class="inline" v-if="me.type <= 1">
              <a
                href="#"
                class="action deny p-4 rounded-full"
                v-if="request.status"
                @click.prevent="deny"
              >
                <i class="pe-7s-close-circle pe-lg pe-va"></i>
              </a>
              <a
                href="#"
                v-else
                class="action approve p-4 rounded-full"
                @click.prevent="approve"
              >
                <i class="pe-7s-check pe-lg pe-va"></i>
              </a>
            </div>
          </span>
        </p>
      </div>
    </div>
    <div v-else>
      <form
        class="p-4 item-list rounded-lg border border-gray-400"
        method="POST"
        :style="
          request.status
            ? 'border-left: 5px solid #c1f65e'
            : 'border-left: 5px solid #f6935e'
        "
        @submit.prevent="updateRequest"
      >
        <input
          class="h-16 w-64 rounded-lg placeholder-gray-400 bg-gray-100 mr-2 hover:shadow"
          type="text"
          placeholder="Peticion"
          style="width: 24rem;"
          v-model="description"
          :style="description ? 'background-color: #5e75f6; color: white' : ''"
        />
        <input
          class="h-16 w-32 rounded-lg placeholder-gray-400 bg-gray-100 mr-2 hover:shadow"
          type="number"
          placeholder="Cantidad"
          v-model="quantity"
          :style="quantity ? 'background-color: #5e75f6; color: white' : ''"
        />
        <button
          class="rounded-l-lg bg-yellow-500 text-white text-xl h-12 w-48 hover:bg-yellow-400"
          type="submit"
        >
          Actualizar Solicitud
        </button>
        <button
          class="h-12 w-40 rounded-r-lg bg-gray-500 text-white text-xl hover:bg-gray-400"
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
.item-list
    &:hover
        border-style: solid
        border-color: #f6df5e
        border-width: 1px
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)

.action
    &.approve
        &:hover
            background-color: #c1f65e
    &.deny
        &:hover
            background-color: #f6935e
    &.change
        &:hover
            background-color: #f6df5e

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
