<template>
  <div class="request">
    <NavBar />
    <div class="container mx-auto px-4">
      <div v-if="showHeader" class="p-5 mt-20" id="header">
        <h1 class="block text-bold inline-block text-4xl mr-6">Solicitud</h1>
        <button
          type="button"
          name="button"
          class="bg-yellow-500 font-bold text-white text-base h-10 w-40 hover:bg-yellow-400 inline-block"
          @click="createRequest"
        >
          Crear Nueva Solicitud
        </button>
        <div
          v-if="error"
          class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <p>{{ error }}</p>
        </div>
      </div>
      <div v-else class="p-5 mt-20" id="header">
        <CreateWishForm
          :msg="showHeader"
          @showHeader="showCreateWishForm"
          @requestObjectForm="captureNewRequest"
        />
      </div>
      <RequestList :msg="newRequest" />
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";
import RequestList from "@/components/request/RequestList.vue";
import CreateWishForm from "@/components/request/CreateWishForm.vue";

export default {
  name: "request",
  data() {
    return {
      showHeader: true,
      newRequest: null,
      user: Vue.prototype.$authUser,
      error: null
    };
  },
  components: {
    NavBar,
    RequestList,
    CreateWishForm
  },
  methods: {
    createRequest() {
      this.$apollo
        .mutate({
          mutation: require("@/graphql/CreateCallMutation.gql"),
          variables: {
            data: {
              request: { create: { user: { connect: this.user } } }
            }
          },
          update: (store, { data: { createCall } }) => {
            Vue.prototype.$request = createCall.request;
          }
        })
        .then(() => {
          this.showHeader = !this.showHeader;
        })
        .catch(error => {
          this.error = error;
        });
    },
    showCreateWishForm() {
      this.showHeader = !this.showHeader;
    },
    captureNewRequest(requestObjectForm) {
      this.newRequest = requestObjectForm;
    }
  }
};
</script>

<style lang="sass" scoped>
#header
  border-bottom: 2px solid #e2e8f0
</style>
