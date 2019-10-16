import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

import { AlertMixin } from '@/mixins/AlertMixin';

export default {
  name: 'CreateOrderForm',

  mixins: [AlertMixin],

  components: {
    DatePick,
  },

  data() {
    return {
      name: null,
      deadline: null,
    };
  },

  methods: {
    async createOrder() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/CreateOrder').default,
          variables: {
            input: {
              name: this.name,
              deadline: this.deadline,
            },
          },
          update: (store, { data: { createOrder } }) => {
            const query = {
              query: require('@/graphql/queries/AllOrders').default,
            };
            const data = store.readQuery(query);
            data.orders.push(createOrder);
            store.writeQuery({
              ...query,
              data,
            });
          },
        });
        this.clearVarsFields();
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },

    clearVarsFields() {
      this.name = '';
      this.deadline = '';
      this.error = '';
    },

    isPastDate(date) {
      return date < new Date();
    },
  },
};
