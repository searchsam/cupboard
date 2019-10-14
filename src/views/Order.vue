<template>
  <div id="order">
    <h1 class="text-5xl px-5 pb-5 mx-5 mb-5">
      Solicitudes
      <a
        href="#"
        type="button"
        class="showFormButton rounded-full font-bold"
        v-if="order && (order.status || new Date() < order.deadline)"
        @click="toggleVar('createForm')"
      >
        <i class="text-4xl" :class="createForm ? 'ti-close' : 'ti-plus'"></i>
      </a>
    </h1>

    <!-- Create Request Form -->
    <div
      id="createRequestForm"
      class="createForm p-5 shadow-md"
      v-if="createForm"
    >
      <h1 class="text-2xl m-5">Crear Nueva Solicitud</h1>
      <CreateRequestForm />
    </div>

    <!-- Request List -->
    <div v-if="!$apollo.queries.order.loading" class="content-center p-5 m-5">
      <ul>
        <RequestItem
          v-for="request in requestsList"
          :key="request.id"
          :request="request"
          :orderStatus="order.status"
        />
      </ul>
    </div>
    <div v-else>
      <span>Loading...</span>
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
      createForm: false,
    };
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

  methods: {
    toggleVar(varName) {
      this[varName] = !this[varName];
    },
  },
};
</script>

<style lang="sass" scoped></style>
