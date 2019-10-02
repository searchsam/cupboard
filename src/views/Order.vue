<template>
  <div id="order">
    <h1 class="font-thin text-6xl">Solicitudes</h1>

    <!-- Create Request Form -->
    <div id="createRequestForm" class="w-full bg-white m-2" v-if="status">
      <h1 class="p-4 text-xl">Crear Nueva Solicitud</h1>
      <CreateRequestForm />
    </div>

    <!-- Request List -->
    <div class="bg-white m-2">
      <ul>
        <RequestItem
          v-for="request in requestsList"
          :key="request.id"
          :request="request"
          @mutatedRequest="updateRequest"
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
      status: true,
    };
  },

  apollo: {
    requests: {
      query: require('@/graphql/queries/AllRequestsByOrder').default,
      variables() {
        return {
          order_id: this.$route.params.id,
        };
      },
      result({ data }) {
        let hasRequest = data.requests.length;
        if (hasRequest >= 1) {
          return (this.status = data.requests[hasRequest - 1].order.status);
        }
      },
    },
  },

  computed: {
    requestsList: function() {
      if (this.requests) {
        return this.requests.sort((a, b) => (a.status < b.status ? 1 : -1));
      }
    },
  },

  methods: {
    getObjectIndex(arr, obj) {
      return arr.indexOf(arr.find(item => item.id === obj.id));
    },
    updateRequest(mutatedRequest) {
      this.requests[this.getObjectIndex(this.requests, mutatedRequest)].status =
        mutatedRequest.status;
    },
  },
};
</script>
