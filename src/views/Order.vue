<template>
  <div id="order">
    <h1 class="font-thin text-6xl">
      Ordenes
    </h1>

    <!-- Create New Order -->
    <div id="createOderForm" class="w-full bg-white m-2" v-show="!showCreateForm">
      <h1 class="p-4 text-xl">Crear Nueva Orden</h1>
      <form class="p-4" method="POST" @submit.prevent="createOrder">
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

    <!-- update New Order -->
    <div id="createOderForm" class="w-full bg-white m-2" v-if="!showEditForm">
      <h1 class="p-4 text-xl">Crear Nueva Orden</h1>
      <form class="p-4" method="POST" @submit.prevent="createOrder">
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
        <label>
          <input
            v-model="status"
            type="checkbox"
            class="h-12 border-2 border-gray-400 mr-2"
          />
          {{ status ? "Activa" : "Completada" }}
        </label>
        <button
          class="bg-yellow-500 text-white text-xl h-12 w-40 hover:bg-yellow-400"
          type="submit"
        >
          Actualizar Orden
        </button>
        <Alert :msg="error" />
      </form>
    </div>

    <!-- Orders List -->
    <div class="flex flex-wrap content-center">
      <!-- Show Create Order Form -->
      <div
        class="show-form content-center w-1/5 px-8 py-4 m-2 bg-white"
        @click="monoChrome("showCreateForm")"
        v-if="monoChrome("showCreateForm")"
        v-show="me.type <= 1"
      >
        <div class="content-center text-center">
          <h1 class="inline-block">Nueva Orden</h1>
        </div>
      </div>
      <div
        class="show-form content-center w-1/5 px-8 py-4 m-2 bg-white"
        @click="monoChrome("showCreateForm")"
        v-else
      >
        <div class="content-center text-center">
          <h1 class="inline-block text-bold">Cancelar</h1>
        </div>
      </div>

      <!-- Orders Cards -->
      <div
        class="card-order content-center w-1/5 m-2 bg-white"
        v-for="order in orders"
        :key="order.id"
      >
        <div
          class="content-center card-content py-4"
          :style="
            order.status
              ? 'border-left: 5px solid #68d391'
              : 'border-left: 5px solid #fc8181'
          "
          @click="goTo(order.id, order.status)"
        >
          <h1 class="inline-block px-8">
            Orden: {{ order.name }} <br />
            Fecha: {{ order.deadline.split(" ")[0] }}
          </h1>
        </div>
        <div
          class="card-footer content-center flex flex-wrap"
          v-if="me.type <= 1"
        >
          <button
            type="button"
            class="bg-yellow-500 text-white text-xl h-8 w-1/2 hover:bg-yellow-400"
            @click.prevent="showEditOrderForm(order)"
          >
            Editar
          </button>
          <button
            type="button"
            class="bg-gray-500 text-white text-xl h-8 w-1/2 hover:bg-gray-400"
            @click.prevent=""
          >
            Comprar
          </button>
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
      status: null,
      showCreateForm: true,
      newOrder: null,
      orders: [],
      error: null,
      me: null,
      showEditForm: true
    };
  },
  methods: {
    goTo(orderId, orderStatus) {
      this.$router.push({
        name: "requests",
        params: { orderId: orderId, orderStatus: orderStatus }
      });
    },
    monoChrome(varName) {
      this[varName] = !this[varName];
    },
    showEditOrderForm(order) {
      this.name = order.name;
      this.deadline = order.deadline.split(" ")[0];
      this.status = order.status;
      this.monoChrome("showEditForm");
    },
    clearVarsFields() {
      this.name = "";
      this.deadline = "";
      this.status = null;
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
              this.clearVarsFields();
            } else {
              this.error = "Error al crear la orden.";
              this.clearVarsFields();
            }
          }
        })
        .then(() => {
          this.error = null;
          this.monoChrome('showCreateForm');
        })
        .catch(error => {
          this.error = error.message.split(":")[1];
        });
    },
    async updateOrder() {
       try {
           const response = await this.$apollo
             .mutate({
               mutation: require("@/graphql/UpdateOrderMutation.gql"),
               variables: {
                 input: { name: this.name, deadline: this.deadline }
               }
            });

           this.orders.push(response.data.createOrder);

           this.error = null;
           this.monoChrome("showCreateForm");
       }   catch  (e) {
           this.error = e.message.split(":")[1];
       }
       this.clearVarsFields();
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
.card-content
    &:hover
      border-style: solid
      border-color: #f6e05e
      border-width: 2px

.show-form:hover
    border-style: solid
    border-color: #cbd5e0
    border-width: 2px
</style>
