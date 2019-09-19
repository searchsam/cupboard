<template lang="html">
  <div class="createorderfrom">
    <h1 class="text-bold text-2xl mr-6">Crear Nueva Orden</h1>
    <ApolloMutation
      :mutation="require('@/graphql/CreateOrderMutation.gql')"
      :variables="{
        data: {
          status: this.status,
          deadline: this.deadline,
          user: { connect: this.user }
        }
      }"
      @done="showCreateOrderButton"
    >
      <template v-slot="{ mutate, loading, error }">
        <form class="p-4" action="" method="POST" @submit.prevent="mutate()">
          <div class="mb-4">
            <label for="deadline" class="mb-5"
              >Ingrese la fecha limete para la orden.</label
            >
            <br />
            <date-pick
              v-model="deadline"
              :format="'YYYY-MM-DD'"
              :startWeekOnSunday="true"
            ></date-pick>
            <button
              :disabled="loading"
              class="bg-yellow-500 text-white font-bold text-base h-10 w-40 hover:bg-yellow-400"
              max="2019-12-30"
              min="2019-01-01"
              type="submit"
            >
              Crear Orden
            </button>
            <button
              type="button"
              name="button"
              class="bg-gray-500 text-white font-bold text-base h-10 w-40 hover:bg-gray-400"
              @click="showCreateOrderButton"
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
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  name: "CreateOrderForm",
  components: {
    DatePick
  },
  props: {
    msg: {
      type: Boolean
    }
  },
  data: () => ({
    status: 1,
    deadline: "",
    user: Vue.prototype.$authUser
  }),
  methods: {
    showCreateOrderButton() {
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
