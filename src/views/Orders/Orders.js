import CreateOrderForm from '@/components/order/CreateOrderForm/CreateOrderForm.vue';
import OrderCard from '@/components/order/OrderCard/OrderCard.vue';
import ORDERS from '@/graphql/queries/AllOrders';
import ON_ORDER_CREATED from '@/graphql/subscriptions/OrderCreated';

export default {
  name: 'Orders',

  components: {
    CreateOrderForm,
    OrderCard,
  },

  data() {
    return {
      createForm: false,
      deadline: '',
      name: '',
    };
  },

  inject: ['me'],

  apollo: {
    orders: {
      query: ORDERS,
      subscribeToMore: {
        document: ON_ORDER_CREATED,
        updateQuery(previousResult, { subscriptionData }) {
          if (
            previousResult.orders.find(
              orders => orders.id === subscriptionData.data.orderCreated.id
            )
          ) {
            return previousResult;
          }

          return {
            orders: [
              ...previousResult.orders,
              {
                ...subscriptionData.data.orderCreated,
              },
            ],
          };
        },
      },
    },
  },

  methods: {
    clearVarsFields() {
      this.name = '';
      this.deadline = '';
      this.status = null;
    },
    toggleVar(varName) {
      this[varName] = !this[varName];
    },
  },

  computed: {
    ordersList() {
      return (this.orders || []).sort((a, b) => (a.status < b.status ? 1 : -1));
    },
  },
};
