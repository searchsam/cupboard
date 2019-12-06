import CreateOrderForm from '@/components/order/CreateOrderForm/CreateOrderForm.vue';
import OrderCard from '@/components/order/OrderCard/OrderCard.vue';

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
      query: require('@/graphql/queries/AllOrders').default,
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
    buttonToggleForm() {
      return this.createForm ? 'ti-close' : 'ti-plus';
    },
  },
};
