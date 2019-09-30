<template>
  <div id="order">
    <h1 class="font-thin text-6xl">Solicitudes</h1>

    <!-- Create Request Form -->
    <div id="createRequestForm" class="w-full bg-white m-2" v-show="status">
      <h1 class="p-4 text-xl">Crear Nueva Solicitud</h1>
      <CreateRequestForm />
    </div>

    <!-- Request List -->
    <div class="bg-white m-2">
      <ul>
        <RequestItem
          v-for="(request, index) in requests"
          :key="request.id"
          :request="request"
          :index="index + 1"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import CreateRequestForm from '@/components/request/CreateRequestForm';
import RequestItem from '@/components/request/RequestItem';

export default {
  name: 'Order',

  components: {
    CreateRequestForm,
    RequestItem,
  },

  data() {
    return {
      status: null
    }
  },

  apollo: {
    requests: {
      query: require('@/graphql/queries/AllRequestsByOrder').default,
      variables() {
        return {
          order_id: this.$route.params.id,
        };
      },
      result ({ data, loading, networkStatus }) {
        let hasRequest = data.requests.length;
        if (hasRequest >= 1) {
          return this.status = data.requests[hasRequest - 1].order.status;
        }
      },
    },
  },
};
</script>
