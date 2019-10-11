<template>
  <li class="mb-2 w-full">
    <div
      class="item-list rounded-lg border border-gray-400"
      :style="
        status
          ? 'border-left: 5px solid #c1f65e'
          : 'border-left: 5px solid #f6935e'
      "
    >
    <p class="pt-6 pb-6">
      <span class="p-5">
          {{ product.request.description }} -
          {{ status ? 'En Existencia' : 'Agotado' }}
        </span>
        <span class="float-right" v-if="status">
          <input
            type="number"
            disabled
            :value="product.existence"
            class="existence mt-0 pt-0 clearfix h-16 w-16 rounded-lg placeholder-gray-400 bg-gray-100 mr-2 hover:shadow text-center bg-white"
            :style="product.existence ? 'background-color: #5e75f6; color: white' : ''"
          />
          <a href="#" class="action change p-4 rounded-full" @click.prevent="decrease">
            <i class="pe-7s-angle-down-circle pe-lg pe-va"></i>
          </a>
        </span>
        <Alert :msg="error" />
      </p>
    </div>
  </li>
</template>

<script>
import { AlertMixin } from '@/mixins/AlertMixin';

export default {
  name: 'ProductItem',

  mixins: [AlertMixin],

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

.existence
    margin-top: -20px
</style>
