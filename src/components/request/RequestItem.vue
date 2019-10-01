<template>
  <li>
    <div class="item-list">
      <p class="p-5">
        <span class="item-list-index p-5">{{ index }}</span>
        <span class="p-5">
          {{ request.description }}
          {{ request.quantity }}
          ({{ request.user.name }}) -
          {{ request.status ? 'Aprodaba' : 'Rechazada' }}
        </span>
        <span class="float-right">
          <a href="#" class="hover:text-yellow-400">editar</a> |
          <a
            href="#"
            v-if="request.status"
            class="hover:text-red-400"
            @click.prevent="deny(request.id, index)"
          >
            rechazar
          </a>
          <a
            href="#"
            v-else
            class="hover:text-green-400"
            @click.prevent="approve(request.id, index)"
          >
            aprobar
          </a>
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
    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    async deny(requestId, index) {
      console.log(requestId);
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/DenyRequest').default,
          variables: { id: requestId },
          update: (store, { data: { denyRequest } }) => {
            this.request[index - 1].status = denyRequest.status;
          },
        });
      } catch (e) {
        this.error = e.message;
      }
    },
    async approve(requestId, index) {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/ApproveRequest').default,
          variables: { id: requestId },
          update: (store, { data: { approveRequest } }) => {
            this.request[index - 1] = approveRequest;
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
</style>
