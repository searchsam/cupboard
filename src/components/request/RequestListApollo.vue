<template lang="html">
  <div class="request">
    <ApolloQuery
      :query="require('@/graphql/AllRequestQuery.gql')"
      :variables="{ id: this.user }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="data" class="result apollo">
          <ul>
            <li
              v-for="(request, index) in data.user.requests"
              :key="request.id"
              class="hover:bg-gray-100"
            >
              <div class="item-list">
                <p class="p-5">
                  <span class="item-list-index p-5">{{ index + 1 }}</span>
                  <span class="p-5">Peticion{{ request.id }} </span>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="error" class="error apollo">An error occurred</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";

export default {
  name: "RequestList",
  data: () => ({
    user: Vue.prototype.$authUser
  })
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
