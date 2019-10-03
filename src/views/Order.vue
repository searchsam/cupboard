<template>
  <div id="order">
    <h1 class="font-thin text-6xl">Solicitudes</h1>

    <!-- Create Request Form -->
    <div
      v-if="!$apollo.queries.order.loading"
    >
      <div
        id="createRequestForm"
        class="w-full bg-white m-2"
        v-if="order.status || new Date() < order.deadline"
      >
        <h1 class="p-4 text-xl">Crear Nueva Solicitud</h1>
        <CreateRequestForm />
      </div>
    </div>
    <div v-else >
      <span>Loading...</span>
    </div>

    <!-- Request List -->
    <div class="bg-white m-2">
      <ul>
        <RequestItem
          v-for="request in requestsList"
          :key="request.id"
          :request="request"
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
    order: {
      query: require('@/graphql/queries/CurrentOrder').default,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },

  computed: {
    requestsList: function() {
      return (this.order.requests || []).sort(
        (a, b) => { a.status < b.status ? 1 : -1 }
      );
    },
  },
};
</script>
