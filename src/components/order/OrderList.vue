<template lang="html">
  <div class="order">
    <div v-if="orders" class="result apollo">
      <ul class="table w-full">
        <li
          v-for="(order, index) in orders"
          :key="order.id"
          class="item-list table-row"
        >
          <div class="item-list-index p-5 table-cell">{{ index + 1 }}</div>
          <div class="p-5 table-cell hover:bg-yellow-200" @click="goToRequests">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 20"
              class="fill-current inline-block h-5 w-5"
              :class="order.status ? 'text-green-400' : 'text-red-400'"
            >
              <circle cx="3" cy="10" r="8"></circle>
            </svg>
            Orden{{ order.deadline.split(" ")[0].replace("-", "")
            }}{{ order.id }}
          </div>
          <div class="p-5 table-cell hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 20"
              class="fill-current inline-block h-5 w-6"
            >
              <polygon points="0,0 10,14 18,0"></polygon>
            </svg>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="error" class="error apollo">An error occurred</div>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";

export default {
  name: "OrderList",
  props: {
    msg: {
      type: Object
    }
  },
  data() {
    return {
      orders: [],
      error: null,
      currentRequest: null
    };
  },
  watch: {
    msg() {
      this.orders.push(this.msg);
    }
  },
  methods: {
    goToRequests() {
      if (Vue.prototype.$authUserType <= 1) {
        this.createRequest();
      } else {
        this.$router.push({ name: "products" });
      }
    }
  },
  apollo: {
    orders: { query: require("@/graphql/AllOrdersQuery.gql") }
  }
};
</script>

<style lang="sass" scoped>
.item-list
    border-style: solid
    border-color: #e2e8f0
    border-width: 1px 0 1px 0

.item-list-index
    border-right: 1px solid #e2e8f0
</style>
