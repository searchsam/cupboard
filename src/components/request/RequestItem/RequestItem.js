import { AlertMixin } from '@/mixins/AlertMixin';

export default {
  name: 'RequestItem',

  mixins: [AlertMixin],

  data() {
    return {
      description: this.request.description,
      quantity: this.request.quantity,
      updateForm: true,
    };
  },

  props: {
    orderStatus: {
      type: Number,
      required: true,
    },
    request: {
      type: Object,
      required: true,
    },
  },

  inject: ['me'],

  computed: {
    bookmarkStatus() {
      return {
        0: 'reject',
        1: 'approve',
        2: '',
      }[this.request.status];
    },
    iconStatus() {
      return {
        0: 'ti-thumb-down',
        1: 'ti-thumb-up',
        2: 'ti-help-alt',
      }[this.request.status];
    },
    labelStatus() {
      return {
        0: 'RECHAZADA',
        1: 'APROBADA',
        2: 'EN ESPERA',
      }[this.request.status];
    },
  },

  methods: {
    async approve() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/ApproveRequest').default,
          variables: { id: this.request.id },
        });
      } catch (e) {
        this.error = e.message;
      }
    },
    async deny() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/DenyRequest').default,
          variables: { id: this.request.id },
          update: (store, { data: { denyRequest } }) => {
            const query = {
              query: require('@/graphql/queries/CurrentOrder').default,
              variables: { order_id: denyRequest.order.id },
            };
            store.writeQuery({
              ...query,
            });
          },
        });
      } catch (e) {
        this.error = e.message;
      }
    },
    toggleVar(varName) {
      this[varName] = !this[varName];
    },
    async updateRequest() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/UpdateRequest').default,
          variables: {
            input: {
              id: this.request.id,
              description: this.description,
              quantity: this.quantity,
            },
          },
        });
        this.toggleVar('updateForm');
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
  },
};
