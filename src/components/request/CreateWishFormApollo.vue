<template lang="html">
  <div class="createwishfrom">
    <h1 class="text-bold text-2xl mr-6">Agregar Producto a la Solicitud</h1>
    <select name="select">
      <option value="value1">Value 1</option>
      <option value="value2" selected>Value 2</option>
      <option value="value3">Value 3</option>
    </select>
    <ApolloMutation
      :mutation="require('@/graphql/CreateWishMutation.gql')"
      :variables="{
        data: {
          status: this.status,
          quantity: this.quantity,
          request: { connect: this.request },
          product: { connect: this.product }
        }
      }"
      @done="showCreateRequestButton"
    >
      <template v-slot="{ mutate, loading, error }">
          <div class="mb-4">
            <button
              :disabled="loading"
              class="bg-yellow-500 text-white font-bold text-base h-10 w-40 hover:bg-yellow-400"
              max="2019-12-30"
              min="2019-01-01"
              type="submit"
              @submit.prevent="mutate()"
            >
              Crear Orden
            </button>
            <button
              type="button"
              name="button"
              class="bg-gray-500 text-white font-bold text-base h-10 w-40 hover:bg-gray-400"
              @click="showCreateRequestButton"
            >
              Cancelar
            </button>
            <div
              v-if="error"
              class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
              role="alert"
            >
              <p>An error occurred: {{ error }}</p>
            </div>
          </div>
      </template>
    </ApolloMutation>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";

export default {
  name: "CreateWishForm",
  props: {
    msg: {
      type: Boolean
    }
  },
  data: () => ({
    status: 0,
    quantity: 0,
    request: Vue.prototype.$request,
    product: null
  }),
  methods: {
    showCreateRequestButton() {
      this.$emit("show_header", this.msg);
    }
  }
};
</script>

<style lang="sass" scoped>
.vdpComponent.vdpWithInput > input
  padding-right: 30px
  border: 2px solid #000
  height: 40px
</style>
