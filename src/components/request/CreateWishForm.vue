<template lang="html">
  <div class="createwishfrom">
    <h1 class="text-bold text-2xl mr-6">Agregar Producto a la Solicitud</h1>
    <div class="mb-4">
        <label for="deadline" class="mb-5"
          >Agregue productos a las solicitud.</label
        ><br />
      <select name="select" class="font-bold text-base h-10 w-40">
        <option :value="product.id" v-for="(product, index) in products" :key="product.id">
            {{product.name}}
        </option>
        <option value="0"> Otro </option>
      </select>
      <button
        class="bg-yellow-500 text-white font-bold text-base h-10 w-40 hover:bg-yellow-400"
        max="2019-12-30"
        min="2019-01-01"
        @click="createRequest"
      >
        Agregar
      </button>
      <div
        v-if="error"
        class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
        role="alert"
      >
        <p>{{ error }}</p>
      </div>
    </div>

    <div class="mb-4">
      <button
        class="bg-yellow-500 text-white font-bold text-base h-10 w-40 hover:bg-yellow-400"
        max="2019-12-30"
        min="2019-01-01"
        @click="createRequest"
      >
        Crear Solicitud
      </button>
      <button
        type="button"
        name="button"
        class="bg-gray-500 text-white font-bold text-base h-10 w-40 hover:bg-gray-400"
        @click="showCreateRequestButton"
      >
        Cancelar
      </button>
    </div>
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
    products: [],
    whishes: [],
    error: null
  }),
  methods: {
    showCreateRequestButton() {
      this.$emit("showHeader", this.msg);
    },
    createRequest() {
      this.$emit("requestObjectForm", this.request);
      this.showCreateRequestButton();
    },
    createWish() {
      this.$apollo
        .mutate({
          mutation: require("@/graphql/CreateWishMutation.gql"),
          variables: {
            data: {
              status: this.status,
              quantity: this.quantity,
              request: { connect: this.request },
              product: { connect: this.product }
            }
          }
        })
        .catch(error => {
          this.error = error.message;
        });
    }
},
apollo: {
  products: {
    query: require("@/graphql/AllProductsQuery.gql")
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
