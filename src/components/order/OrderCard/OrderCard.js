import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

import { AlertMixin } from '@/mixins/AlertMixin';

export default {
  name: 'OrderCard',

  mixins: [AlertMixin],

  components: {
    DatePick,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      deadline: this.order.deadline.split(' ')[0],
      name: this.order.name,
      updateForm: true,
    };
  },

  inject: ['me'],

  methods: {
    goToOrder() {
      this.$router.push({
        name: 'requests',
        params: {
          id: this.order.id,
        },
      });
    },

    isPastDate(date) {
      return date < new Date();
    },

    async shopOrder() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/ShopOrder').default,
          variables: { id: this.order.id },
        });
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
    toggleVar(varName) {
      this[varName] = !this[varName];
    },
    async updateOrder() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/UpdateOrder').default,
          variables: {
            input: {
              id: this.order.id,
              name: this.name,
              deadline: this.deadline,
            },
          },
        });
        this.toggleVar();
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
  },
};
