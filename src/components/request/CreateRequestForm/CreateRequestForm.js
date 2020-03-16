import { AlertMixin } from '@/mixins/AlertMixin';
import CREATE_REQUEST from '@/graphql/mutations/CreateRequest';
import CURRENT_ORDER from '@/graphql/queries/CurrentOrder';

export default {
  name: 'CreateRequestForm',

  mixins: [AlertMixin],

  data() {
    return {
      description: '',
      quantity: '',
    };
  },

  inject: ['me'],

  methods: {
    cleanVars() {
      this.description = '';
      this.quantity = '';
      this.error = null;
    },

    async createRequest() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_REQUEST,
          variables: {
            input: {
              description: this.description,
              quantity: this.quantity,
              order_id: this.$route.params.id,
            },
          },
          update: (store, { data: { createRequest } }) => {
            const query = {
              query: CURRENT_ORDER,
              variables: { id: this.$route.params.id },
            };

            const data = store.readQuery(query);
            data.order.requests.push({
              ...createRequest,
              user: {
                ...this.me,
              },
            });

            store.writeQuery({
              ...query,
              data,
            });
          },
        });

        this.cleanVars();
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
