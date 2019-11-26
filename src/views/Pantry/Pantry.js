import ProductItem from '@/components/pantry/ProductItem/ProductItem.vue';

export default {
  name: 'Pantry',

  components: {
    ProductItem,
  },

  inject: ['me'],

  apollo: {
    products: {
      query: require('@/graphql/queries/AllProducts').default,
    },
  },

  computed: {
    productList() {
      return (this.products || []).sort((a, b) =>
        a.existence < b.existence ? 1 : -1
      );
    },
  },
};
