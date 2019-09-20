<template lang="html">
  <div class="order">
    <div v-if="orders" class="result apollo">
      <ul>
        <li
          v-for="(order, index) in orders"
          :key="order.id"
          class="hover:bg-gray-100"
        >
          <div class="item-list">
            <p class="p-5">
              <span class="item-list-index p-5">{{ index + 1 }}</span>
              <svg
                data-v-4a964c0b=""
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 20"
                class="fill-current inline-block h-12 w-12"
                :class="order.status ? 'text-green-400' : 'text-red-400'"
              >
                <circle data-v-4a964c0b="" cx="10" cy="10" r="4"></circle>
              </svg>
              <span class="p-5"
                >Orden{{ order.id }} {{ order.deadline.split(" ")[0] }}</span
              >
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="error" class="error apollo">An error occurred</div>
  </div>
</template>

<script type="text/javascript">
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
      error: null
    };
  },
  watch: {
    msg: function() {
      this.orders.push(this.msg);
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
    border-color: #cbd5e0
    border-width: 1px 0 1px 0

.item-list-index
    border-right: 1px solid #cbd5e0
</style>
