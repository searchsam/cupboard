<template>
  <div id="order">
    <h1 class="font-thin text-6xl">
      Ordenes
    </h1>

    <!-- Create New Order -->
    <div id="createOderForm" class="w-full bg-white m-2" v-if="showForm">
      <h1 class="p-4 text-xl">Crear Nueva Orden</h1>
      <form class="p-4" action="" method="POST" @submit.prevent="createOrder">
        <input
          type="text"
          v-model="name"
          class="h-12 border-2 border-gray-400 mr-2"
          placeholder="Nombre"
        />
        <DatePick
          v-model="deadline"
          max="2019-12-30"
          min="2019-01-01"
          :format="'YYYY-MM-DD'"
          :startWeekOnSunday="true"
          placeholder="Fecha"
          class="mr-2"
        />
        <button
          class="bg-yellow-500 text-white text-xl h-12 w-40 hover:bg-yellow-400"
          type="submit"
        >
          Crear Orden
        </button>
        <Alert :msg="error" />
      </form>
    </div>

    <!-- Orders List -->
    <div class="inline-flex content-center">
      <!-- Show Create Order Form -->
      <div
        class="show-form flex-1 content-center px-8 py-4 m-2 w-56 bg-white"
        @click="showCreateOrderForm"
        v-if="!showForm"
        v-show="me.type <= 1"
      >
        <div class="content-center text-center">
          <h1 class="inline-block">Nueva Orden</h1>
        </div>
      </div>
      <div
        class="show-form flex-1 content-center px-8 py-4 m-2 w-56 bg-white"
        @click="showCreateOrderForm"
        v-else
      >
        <div class="content-center text-center">
          <h1 class="inline-block text-bold">Cancelar</h1>
        </div>
      </div>

      <!-- Orders Cards -->
      <div
        class="card-order content-center flex-1 px-8 py-4 m-2 w-56 bg-white"
        :style="order.status ? 'border-left: 5px solid #68d391' : 'border-left: 5px solid #fc8181'"
        v-for="order in orders"
        :key="order.id"
        @click="goTo(order.id, order.status)"
      >
        <div class="content-center">
          <h1
            class="inline-block"
          >
            Orden: {{ order.name }} <br />
            Fecha: {{ order.deadline.split(" ")[0] }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";
import Alert from "@/components/error/Alert.vue";

export default {
  name: "order",
  data() {
    return {
      name: "",
      deadline: "",
      showForm: false,
      newOrder: null,
      orders: [],
      error: null,
      me: null
    };
  },
  methods: {
    goTo(orderId, orderStatus) {
      this.$router.push({
        name: "requests",
        params: { orderId: orderId, orderStatus: orderStatus }
      });
    },
    showCreateOrderForm() {
      this.showForm = !this.showForm;
    },
    createOrder() {
      this.$apollo
        .mutate({
          mutation: require("@/graphql/CreateOrderMutation.gql"),
          variables: {
            input: { name: this.name, deadline: this.deadline }
          },
          update: (store, { data: { createOrder } }) => {
            if (createOrder) {
              this.orders.push(createOrder);
            } else {
              this.error = "Error al crear la orden.";
            }
          }
        })
        .then(() => {
          this.error = null;
          this.showCreateOrderForm();
        })
        .catch(error => {
          this.error = error.message.split(":")[1];
        });
    }
  },
  components: {
    DatePick,
    Alert
  },
  apollo: {
    orders: { query: require("@/graphql/AllOrdersQuery.gql") },
    me: { query: require("@/graphql/CurrentUser.gql") }
  }
};
</script>

<style lang="sass" scoped>
.card-order
    &:hover
      border-style: solid
      border-color: #f6e05e
      border-width: 2px

.show-form:hover
    border-style: solid
    border-color: #cbd5e0
    border-width: 2px
</style>
