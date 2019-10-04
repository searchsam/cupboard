<template>
  <li>
    <div
      class="item-list"
      :style="
        product.status
          ? 'border-left: 5px solid #68d391'
          : 'border-left: 5px solid #fc8181'
      "
    >
      <p class="pt-5 pb-5">
        <span class="item-list-index p-5"></span>
        <span class="p-5">
          {{ product.request.description }} -
          {{ product.status ? 'En Existencia' : 'Agotado' }}
        </span>
        <span class="float-right" v-if="product.status">
          <input
            type="number"
            disabled
            v-model="existence"
            class="existence mt-0 pt-0 clearfix h-16 w-16 border border-2 border-solid border-gray-400 text-center bg-white"
          />
          <a href="#" class="action change p-5" @click="stockless">
            <i class="pe-7s-angle-down-circle pe-lg pe-va"></i>
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
  name: 'ProductItem',

  components: {
    Alert,
  },

  data() {
    return {
      error: null,
      existence: this.product.existence,
    };
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  inject: ['me'],

  methods: {
    async stockless() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/StoclessProduct').default,
          variables: { id: this.product.id },
          update: store => {
            const query = {
              query: require('@/graphql/queries/StockProducts').default,
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

.existence
    margin-top: -20px
</style>
