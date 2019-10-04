<template>
  <li>
    <div v-if="updateForm">
      <div
        class="item-list"
        :style="
          request.status
            ? 'border-left: 5px solid #68d391'
            : 'border-left: 5px solid #fc8181'
        "
      >
        <p class="pt-5 pb-5">
          <span class="p-5">
            {{ request.quantity }} -
            {{ request.description }}
            ({{ request.user.name }}) -
            {{ request.status ? 'Aprobada' : 'Rechazada' }}
          </span>
          <span class="float-right" v-if="orderStatus">
            <a
              href="#"
              class="action change p-5"
              v-if="request.user.id == me.id"
              @click.prevent="toggleVar('updateForm')"
            >
              <i class="pe-7s-edit pe-lg pe-va"></i>
            </a>
            <div class="inline" v-if="me.type <= 1">
              <a
                href="#"
                class="action deny p-5"
                v-if="request.status"
                @click.prevent="deny"
              >
                <i class="pe-7s-close-circle pe-lg pe-va"></i>
              </a>
              <a
                href="#"
                v-else
                class="action approve p-5"
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
        class="p-4 item-list"
        method="POST"
        :style="
          request.status
            ? 'border-left: 5px solid #68d391'
            : 'border-left: 5px solid #fc8181'
        "
        @submit.prevent="updateRequest"
      >
        <input
          class="mr-2 h-12 border-2 border-gray-400 placeholder-gray-400"
          type="text"
          placeholder="Peticion"
          style="width: 24rem;"
          v-model="description"
        />
        <input
          class="mr-2 w-24 h-12 border-2 border-gray-400 placeholder-gray-400"
          type="number"
          placeholder="Cantidad"
          v-model="quantity"
        />
        <button
          class="bg-yellow-500 text-white text-xl h-12 w-48 hover:bg-yellow-400"
          type="submit"
        >
          Actualizar Solicitud
        </button>
        <button
          class="h-12 w-40 border bg-gray-500 text-white text-xl hover:bg-gray-400"
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
import Alert from '@/components/error/Alert';
import { ToggleMixin } from '@/mixins/ToggleMixin';

export default {
  name: 'RequestItem',

  components: {
    Alert,
  },

  mixins: [ToggleMixin],

  data() {
    return {
      description: this.request.description,
      quantity: this.request.quantity,
      error: null,
    };
  },

  props: {
    request: {
      type: Object,
      required: true,
    },
    orderStatus: {
      type: Number,
      required: true,
    },
  },

  inject: ['me'],

  methods: {
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
    border-bottom: 2px solid #cbd5e0
    &:hover
        border-style: solid
        border-color: #f6e05e
        border-width: 2px

.action
    &.approve
        &:hover
            background-color: #68d391
    &.deny
        &:hover
            background-color: #fc8181
    &.change
        &:hover
            background-color: #f6e05e
</style>
