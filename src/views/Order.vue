<template>
  <div id="order">
    <h1 class="font-thin text-6xl">Solicitudes</h1>

    <!-- Create Request Form -->
    <div id="createRequestForm" class="w-full bg-white m-2">
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
            :index="index"
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

  apollo: {
    requests: {
      query: require('@/graphql/queries/AllRequestsByOrder').default,
      variables() {
        return {
          order_id: this.$route.params.id,
        };
      },
    },
  },
};
</script>
