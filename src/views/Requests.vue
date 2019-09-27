<template>
  <div id="order">
    <h1 class="font-thin text-6xl">Solicitudes</h1>

    <!-- Create Request Form -->
    <div id="createRequestForm" class="w-full bg-white m-2" v-if="orderStatus">
      <h1 class="p-4 text-xl">Crear Nueva Solicitud</h1>
      <form class="p-4" action="" method="POST" @submit.prevent="createRequest">
        <input
          class="mr-2 h-12 border-2 border-gray-400 placeholder-gray-400"
          v-model="description"
          type="text"
          placeholder="Peticion"
          style="width: 24rem;"
        />
        <input
          class="mr-2 w-24 h-12 border-2 border-gray-400 placeholder-gray-400"
          v-model="quantity"
          type="number"
          placeholder="Cantidad"
        />
        <button
          class="bg-yellow-500 text-white text-xl h-12 w-40 hover:bg-yellow-400"
          type="submit"
        >
          Crear Solicitud
        </button>
        <Alert :msg="error" />
      </form>
    </div>

    <!-- Request List -->
    <div v-if="requests" class="bg-white m-2">
      <ul>
        <li v-for="(request, index) in requests" :key="request.id">
          <div class="item-list">
            <p class="p-5">
              <span class="item-list-index p-5">{{ index + 1 }}</span>
              <span class="p-5">
                {{ request.description }} {{ request.quantity }} ({{
                  request.user.name
                }})
              </span>
              <span class="float-right">
                <a href="#">denegar</a>
                <a href="#">editar</a>
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import Alert from '@/components/error/Alert.vue';

export default {
  name: 'Requests',
  components: {
    Alert,
  },
  props: ['orderId', 'orderStatus'],
  data() {
    return {
      error: null,
      description: '',
      quantity: '',
      requests: [],
      order: null,
      me: null,
    };
  },
  apollo: {
    requests: {
      query: require('@/graphql/queries/AllRequestsByOrder').default,
      variables() {
        return {
          order_id: this.orderId,
        };
      },
    },
    me: { query: require('@/graphql/queries/CurrentUser').default },
  },
  methods: {
    async createRequest() {
      try {
        const response = await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/CreateRequest').default,
          variables: {
            input: {
              description: this.description,
              quantity: this.quantity,
              order: this.orderId,
            },
          },
        });
        if (response.data.createRequest) {
          response.data.createRequest.user = this.me;
          this.requests.push(response.data.createRequest);
        } else {
          this.error = 'Error al crear la orden.';
        }
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.item-list
    border-bottom: 2px solid #cbd5e0

.item-list:hover
    border-style: solid
    border-color: #f6e05e
    border-width: 2px

.item-list-index
    border-right: 2px solid #cbd5e0
</style>
