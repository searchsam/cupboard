<template>
  <div class="order">
    <NavBar />
    <div class="container mx-auto px-4">
      <div v-if="showHeader" class="p-5 mt-20" id="header">
        <h1 class="block text-bold inline-block text-4xl mr-6">Ordenes</h1>
        <button
          type="button"
          name="button"
          class="bg-yellow-500 font-bold text-white inline-block text-base h-10 w-40 hover:bg-yellow-400"
          @click="showCreateOrderForm"
        >
          Crear Nueva Orden
        </button>
      </div>
      <div v-else class="p-5 mt-20" id="header">
        <CreateOrderForm
          :msg="showHeader"
          @showHeader="showCreateOrderForm"
          @orderObjectForm="captureNewOrder"
        />
      </div>
      <OrderList :msg="newOrder" />
    </div>
  </div>
</template>

<script type="text/javascript">
import NavBar from "@/components/NavBar.vue";
import OrderList from "@/components/order/OrderList.vue";
import CreateOrderForm from "@/components/order/CreateOrderForm.vue";

export default {
  name: "order",
  data() {
    return {
      showHeader: true,
      newOrder: null
    };
  },
  components: {
    NavBar,
    OrderList,
    CreateOrderForm
  },
  methods: {
    showCreateOrderForm() {
      this.showHeader = !this.showHeader;
    },
    captureNewOrder(orderObjectForm) {
      this.newOrder = orderObjectForm;
    }
  }
};
</script>

<style lang="sass" scoped>
#header
  border-bottom: 2px solid #e2e8f0
</style>
