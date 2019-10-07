<template>
  <div id="order" class="bg-white rounded-lg shadow border-gray-400">
    <h1 class="tittle font-thin text-5xl p-5">Solicitudes</h1>

    <!-- Create Request Form -->
    <div v-if="!$apollo.queries.order.loading">
      <div
        id="createRequestForm"
        class="p-5"
        v-if="order.status || new Date() < order.deadline"
      >
        <h1 class="text-xl mb-4">Crear Nueva Solicitud</h1>
        <CreateRequestForm />
      </div>
    </div>
    <div v-else>
      <span>Loading...</span>
    </div>

    <!-- Request List -->
    <div class="bg-white p-5">
      <ul>
        <RequestItem
          v-for="request in requestsList"
          :key="request.id"
          :request="request"
          :orderStatus="order.status"
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
    requestsList() {
      return (this.order.requests || []).sort((a, b) =>
        a.status < b.status ? 1 : -1
      );
    },
  },
};
</script>

<style lang="sass" scoped>
.tittle
  border-bottom: 1px solid #f7fafc

#createRequestForm
  border-bottom: 1px solid #f7fafc
</style>
