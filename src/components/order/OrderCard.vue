<template lang="html">
  <div class="card-order content-center w-1/5 m-2 bg-white relative">
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
      <a
        href="#"
        class="p-2 hover:bg-yellow-400"
        @click.prevent="showEditOrderForm(this.order)"
      >
        <i class="pe-7s-edit pe-lg pe-va"></i>
      </a>
      <a
        href="#"
        class="p-2 hover:bg-gray-400"
        @click.prevent="shopOrder"
      >
        <i class="pe-7s-cart pe-lg pe-va"></i>
      </a>
    </div>
    <Alert :msg="error" />
  </div>
</template>

<script>
import Alert from '@/components/error/Alert.vue';

export default {
  name: 'OrderCard',

  components: {
    Alert,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      name: null,
      deadline: null,
      status: null,
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
          update: store => {
            const query = {
              query: require('@/graphql/queries/AllOrders').default,
            };
            store.writeQuery({
              ...query,
            });
          },
        });
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
      border-color: #f6e05e
      border-width: 2px

.card-footer
    display: inline-grid
</style>
