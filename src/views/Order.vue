<template>
  <div id="order w-full">
      <h1 class="font-thin text-6xl">
        Ordenes
      </h1>

    <!-- Create New Order -->
    <div id="createOderForm" class="shadow w-full bg-white m-2" v-if="showForm">
      <h1 class="p-4 text-xl">Crear Nueva Orden</h1>
      <form class="p-4" action="" method="POST">
        <label for="deadline" class="mb-5">
          Ingrese la fecha limete para la orden.
        </label>
        <br />
        <DatePick
          v-model="deadline"
          :format="'YYYY-MM-DD'"
          :startWeekOnSunday="true"
        />
        <button
          class="bg-yellow-500 text-white text-xl h-10 w-40 hover:bg-yellow-400"
          max="2019-12-30"
          min="2019-01-01"
          type="submit"
        >
          Crear Orden
        </button>
        <div
          v-show="error"
          class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <p>{{ error }}</p>
        </div>
      </form>
    </div>

    <!-- Orders List -->
    <div class="inline-flex content-center">
      <!-- Show Create Order Form -->
      <div
        class="show-form shadow flex-1 content-center px-8 py-4 m-2 w-56 bg-white"
        @click="showCreateOrderForm"
        v-if="!showForm"
      >
        <div class="content-center text-center">
          <h1 class="inline-block">Nueva Orden</h1>
        </div>
      </div>
      <div
        class="show-form shadow flex-1 content-center px-8 py-4 m-2 w-56 bg-white"
        @click="showCreateOrderForm"
        v-else
      >
        <div class="content-center text-center">
          <h1 class="inline-block text-bold">Cancelar</h1>
        </div>
      </div>

      <!-- Orders Cards -->
      <div
        class="card-order shadow content-center flex-1 px-8 py-4 m-2 w-56 bg-white"
        v-for="order in orders"
        :key="order.id"
        @click="goTo(order.id)"
      >
        <div class="content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 20"
            class="inline-block fill-current h-5 w-5"
            :class="order.status ? 'text-green-400' : 'text-red-400'"
            focusable="false"
          >
            <circle cx="3" cy="10" r="8"></circle>
          </svg>
          <h1
            class="inline-block"
            :class="order.status ? 'text-black' : 'text-gray-400'"
          >
            Orden {{ order.deadline.split(" ")[0] }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  name: "order",
  data() {
    return {
      deadline: "",
      showForm: false,
      newOrder: null,
      orders: [],
      error: null
    };
  },
  methods: {
    goTo(orderId) {
      this.$router.push("/request" + orderId);
    },
    captureNewOrder(orderObjectForm) {
      this.newOrder = orderObjectForm;
    },
    showCreateOrderForm() {
      this.showForm = !this.showForm;
    }
  },
  components: {
    DatePick
  },
  apollo: {
    orders: { query: require("@/graphql/AllOrdersQuery.gql") }
  }
};
</script>

<style lang="sass" scoped>
.card-order:hover
    border-style: solid
    border-color: #fbd38d
    border-width: 2px

.show-form:hover
    border-style: solid
    border-color: #cbd5e0
    border-width: 2px
</style>
