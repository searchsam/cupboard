import CreateRequestForm from '@/components/request/CreateRequestForm/CreateRequestForm.vue';
import RequestItem from '@/components/request/RequestItem/RequestItem.vue';

export default {
  name: 'Order',

  inject: ['me'],

  components: {
    CreateRequestForm,
    RequestItem,
  },

  data() {
    return {
      createForm: false,
    };
  },

  apollo: {
    order: {
      query: require('@/graphql/queries/CurrentOrder').default,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      subscribeToMore: {
        document: require('@/graphql/subscriptions/RequestCreated').default,
        variables() {
          return {
            order_id: this.$route.params.id,
          };
        },
        updateQuery(previousResult, { subscriptionData }) {
          if (
            previousResult.order.requests.find(
              request => request.id === subscriptionData.data.requestCreated.id
            )
          ) {
            return previousResult;
          }

          return {
            order: {
              ...previousResult.order,
              requests: [
                ...previousResult.order.requests,
                {
                  ...subscriptionData.data.requestCreated,
                  user: {
                    ...subscriptionData.data.requestCreated.user,
                  },
                },
              ],
            },
          };
        },
      },
    },
  },

  computed: {
    requestsList() {
      return (this.order.requests || []).sort((a, b) =>
        a.status < b.status ? 1 : -1
      );
    },
  },

  methods: {
    toggleVar(varName) {
      this[varName] = !this[varName];
    },
  },
};
