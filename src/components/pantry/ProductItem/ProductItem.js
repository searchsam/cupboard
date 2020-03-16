import { AlertMixin } from '@/mixins/AlertMixin';
import DECREASE_PRODUCT from '@/graphql/mutations/DecreaseProduct';

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
          mutation: DECREASE_PRODUCT,
          variables: { id: this.product.id },
        });
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
