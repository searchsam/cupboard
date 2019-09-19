<template>
  <div class="request">
    <NavBar />
    <div class="container mx-auto px-4">
      <div v-if="show_header" class="p-5 mt-20" id="header">
        <h1 class="block text-bold inline-block text-4xl mr-6">Solicitudes</h1>

        <ApolloMutation
          :mutation="require('@/graphql/CreateRequestMutation.gql')"
          :variables="{
            data: { user: { connect: this.user } }
          }"
          :update="createRequestMethod"
          @done="showCreateWishForm"
          class="inline-block"
        >
          <template v-slot="{ mutate, loading, error }">
            <button
              type="button"
              name="button"
              class="bg-yellow-500 font-bold text-white text-base h-10 w-40 hover:bg-yellow-400"
              :disabled="loading"
              @click="mutate()"
            >
              Crear Nueva Solicitud
            </button>
            <div
              v-if="error"
              class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
              role="alert"
            >
              <p>An error occurred: {{ error }}</p>
            </div>
          </template>
        </ApolloMutation>
      </div>
      <div v-else class="p-5 mt-20" id="header">
        <CreateWishForm :msg="show_header" @show_header="showCreateWishForm" />
      </div>
      <RequestList />
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";
import RequestList from "@/components/request/RequestListApollo.vue";
import CreateWishForm from "@/components/request/CreateWishFormApollo.vue";

export default {
  name: "request",
  data: () => ({
    show_header: true,
    user: Vue.prototype.$authUser
  }),
  components: {
    NavBar,
    RequestList,
    CreateWishForm
  },
  methods: {
    createRequestMethod(store, { data: { createRequest } }) {
       console.log(createRequest)
       Vue.prototype.$request = createRequest.id;
    },
    showCreateWishForm() {
      this.show_header = !this.show_header;
    }
  }
};
</script>

<style lang="sass" scoped>
#header
  border-bottom: 2px solid #e2e8f0
</style>
