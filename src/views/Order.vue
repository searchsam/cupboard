<template>
  <div id="order">
    <h1 class="font-thin text-6xl">Solicitudes</h1>
    <RequestForm />

    <div v-if="requests" class="bg-white m-2">
      <Request
        v-for="request in requests" :key="request.id"
        :request="request"
      />
    </div>
  </div>
</template>

<script>
  import RequestForm from "@/components/request/RequestForm";
  import Request from "@/components/request/Request";

  export default {
      name: 'Order',

      components: {
          Request,
          RequestForm,
      },

      data() {
        return {
            requests: null,
        }
      },

      apollo: {
          requests: {
              query: require('@/graphql/queries/AllRequestsByOrder').default,
              variables() {
                  return {
                    order_id: this.$route.params.id
                  }
              }
          }
      }
  }
</script>
