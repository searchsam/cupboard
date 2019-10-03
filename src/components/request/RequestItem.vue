<template>
  <li>
    <div
      class="item-list"
      :style="
        request.status
          ? 'border-left: 5px solid #68d391'
          : 'border-left: 5px solid #fc8181'
      "
    >
      <p class="pt-5 pb-5">
        <span class="item-list-index p-5"></span>
        <span class="p-5">
          {{ request.quantity }} -
          {{ request.description }}
          ({{ request.user.name }}) -
          {{ request.status ? 'Aprobada' : 'Rechazada' }}
        </span>
        <span class="float-right">
          <a href="#" class="action change p-5" v-if="request.user.id == me.id">
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
        <Alert :msg="error" />
      </p>
    </div>
  </li>
</template>

<script>
import Alert from '../error/Alert';

export default {
  name: 'RequestItem',

  components: {
    Alert,
  },

  data() {
    return {
      error: null,
    };
  },

  props: {
    request: {
      type: Object,
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
              query: require('@/graphql/queries/AllRequestsByOrder').default,
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
          update: (store, { data: { approveRequest } }) => {
            const query = {
              query: require('@/graphql/queries/AllRequestsByOrder').default,
              variables: { order_id: approveRequest.order.id },
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

.item-list-index
    border-right: 2px solid #cbd5e0

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
