<template>
  <li class="mb-4 block relative">
    <div class="bg-white rounded-lg shadow-md">
      <p class="text-lg static">
        <span
          class="bookmark rounded-l-lg inline-block static center"
          :class="!status ? 'reject' : ''"
        >
          <i
            class="icon-flipped rounded-full text-4xl p-1"
            :class="status ? 'ti-face-smile' : 'ti-face-sad'"
          ></i>
        </span>
        <span class="itemBody text-xl inline-block static center py-2 ml-6">
          <a class="font-semibold">{{ product.request.description }}</a>
          <br />
          <a class="status">{{ status ? 'EN EXISTENCIA' : 'AGOTADO' }}</a>
        </span>

        <span class="float-right inline-block static mt-3 mr-4" v-if="status">
          <input
            type="number"
            disabled
            :value="product.existence"
            class="quantityButton rounded-lg mr-2 shadow-md w-6 text-center"
            :style="product.existence ? 'border: 1px solid #5e75f6;' : ''"
          />
          <a
            href="#"
            type="button"
            class="rounded-lg px-4 pt-4 pb-3 center"
            @click.prevent="decrease"
          >
            <i class="ti-arrow-circle-down text-2xl"></i>
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
@import ../../assets/css/library.sass

.bookmark
  padding: 1.4rem 1rem 0.7rem 1rem
  background-color: $green-light
  color: $text-light
  i
    background-color: $green

.reject
  background-color: $red-light
  i
    background-color: $red

.owner, .status
  color: $gray-dark

.score
  background-color: $gray-shadow

a[type="button"]
  appearance: none
  &:hover
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
    background-color: $blue
    color: $text-light

.descriptionButton
  width: 32rem

.quantityButton
  width: 8rem

.pairButton
  width: 16rem

.existence
  margin-top: -20px

.icon-flipped
  transform: scaleX(-1, 1)
  -moz-transform: scaleX(-1, 1)
  -webkit-transform: scaleX(-1, 1)
  -ms-transform: scaleX(-1, 1)
  -o-transform: scaleX(-1, 1)

.center
  object-fit: contain
  align-items: center
  align-content: center
  vertical-align: middle
  object-position: center
</style>
