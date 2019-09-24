<template>
    <div id="order" class="container mx-auto px-4">
      <div v-if="showHeader" class="p-5 mt-20" id="header">
        <h1 class="inline-block font-thin text-6xl mr-6">
          Ordenes
        </h1>
        <button
          type="button"
          name="button"
          class="bg-yellow-500 font-bold text-white inline-block text-base h-10 w-40 hover:bg-yellow-400"
        >
          Crear Nueva Orden
        </button>
        <div
          v-if="error"
          class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <p>{{ error }}</p>
        </div>
      </div>

      <div v-else class="p-5 mt-20" id="header">
        <CreateOrderForm
          :msg="showHeader"
          @orderObjectForm="captureNewOrder"
        />
      </div>

      <!-- <OrderList :msg="newOrder" /> -->
      <!-- Request List -->
      <div class="inline-flex content-center">
          <div class="shadow flex-1 content-center px-8 py-4 m-2 w-56 bg-white hover:bg-gray-200">
            <div class="content-center text-center">
              <h1 class="inline-block text-yellow-600">Nueva Orden</h1>
            </div>
          </div>

        <div
          class="shadow content-center flex-1 px-8 py-4 m-2 w-56 bg-white hover:bg-yellow-200"
          v-for="order in orders"
          :key="order.id"
        >
          <div class="content-center" @click="goTo(order.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 20"
              class="inline-block fill-current h-5 w-5"
              :class="order.status ? 'text-green-400' : 'text-red-400'"
              focusable="false"
            >
              <circle cx="3" cy="10" r="8"></circle>
            </svg>
            <h1 class="inline-block" :class="order.status ? 'text-black' : 'text-gray-400'">
              Orden {{ order.deadline.split(" ")[0] }}
            </h1>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
import Vue from "vue";
// import NavBar from "@/components/NavBar.vue";
// import OrderList from "@/components/order/OrderList.vue";
import CreateOrderForm from "@/components/order/CreateOrderForm.vue";

export default {
  name: "order",
  data() {
    return {
      showHeader: true,
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
    }
  },
  components: {
    // NavBar,
    // OrderList,
    CreateOrderForm
  },
  apollo: {
    orders: { query: require("@/graphql/AllOrdersQuery.gql") }
  }
};
</script>

<style lang="sass" scoped></style>
