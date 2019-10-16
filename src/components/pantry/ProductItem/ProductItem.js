import { AlertMixin } from '@/mixins/AlertMixin';

export default {
  name: 'ProductItem',

  mixins: [AlertMixin],

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  inject: ['me'],

  computed: {
    status() {
      return this.product.existence > 0;
    },
  },

  methods: {
    async decrease() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/DecreaseProduct').default,
          variables: { id: this.product.id },
        });
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
