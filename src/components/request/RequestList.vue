<template lang="html">
  <div class="request">
    <div v-if="requests" class="result apollo">
      <ul>
        <li
          v-for="(request, index) in requests"
          :key="request.id"
          class="hover:bg-gray-100"
        >
          <div class="item-list">
            <p class="p-5">
              <span class="item-list-index p-5">{{ index + 1 }}</span>
              <span class="p-5">Solicitud{{ request.id }} </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";

export default {
  name: "RequestList",
  props: {
    msg: {
      type: Object
    }
  },
  data() {
    return {
      user: Vue.prototype.$authUser,
      requests: [],
      error: null
    };
  },
  watch: {
    msg: function() {
      this.requests.push(this.msg);
    }
  },
  apollo: {
    requests: {
      query: require("@/graphql/AllRequestsQuery.gql"),
      variables() {
        return { id: this.user };
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.item-list
    border-style: solid
    border-color: #cbd5e0
    border-width: 1px 0 1px 0

.item-list-index
    border-right: 1px solid #cbd5e0
</style>
