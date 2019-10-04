<template>
  <li>
    <div
      class="item-list"
      :style="
        status
          ? 'border-left: 5px solid #68d391'
          : 'border-left: 5px solid #fc8181'
      "
    >
      <p class="pt-5 pb-5">
        <span class="p-5">
          {{ product.request.description }} -
          {{ status ? 'En Existencia' : 'Agotado' }}
        </span>
        <span class="float-right" v-if="status">
          <input
            type="number"
            disabled
            :value="product.existence"
            class="existence mt-0 pt-0 clearfix h-16 w-16 border border-2 border-solid border-gray-400 text-center bg-white"
          />
          <a href="#" class="action change p-5" @click.prevent="decrease">
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
import Vue from 'vue';

export default {
  name: 'ProductItem',

  components: {
    Alert,
  },

  data() {
    return {
      error: null,
    };
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  inject: ['me'],

  computed: {
    status() {
      return this.product.existence > 0;
    },
  },

  methods: {
    async decrease() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/DecreaseProduct').default,
          variables: { id: this.product.id },
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
