import CreateRequestForm from '@/components/request/CreateRequestForm/CreateRequestForm.vue';
import RequestItem from '@/components/request/RequestItem/RequestItem.vue';

export default {
  name: 'Order',

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
