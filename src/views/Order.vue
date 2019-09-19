<template>
  <div class="order">
    <NavBar />
    <div class="container mx-auto px-4">
      <div v-if="show_header" class="p-5 mt-20" id="header">
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
          :msg="show_header"
          @show_header="showCreateOrderForm"
        />
      </div>
      <OrderList />
    </div>
  </div>
</template>

<script type="text/javascript">
import NavBar from "@/components/NavBar.vue";
import OrderList from "@/components/order/OrderListApollo.vue";
import CreateOrderForm from "@/components/order/CreateOrderFormApollo.vue";

export default {
  name: "order",
  data: () => ({
    show_header: true
  }),
  components: {
    NavBar,
    OrderList,
    CreateOrderForm
  },
  methods: {
    showCreateOrderForm() {
      this.show_header = !this.show_header;
    }
  }
};
</script>

<style lang="sass" scoped>
#header
  border-bottom: 2px solid #e2e8f0
</style>
