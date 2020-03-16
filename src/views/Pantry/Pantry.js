import ProductItem from '@/components/pantry/ProductItem/ProductItem.vue';
import PRODUCTS from '@/graphql/queries/AllProducts';
import ON_PRODUCT_UPDATED from '@/graphql/subscriptions/ProductUpdated';

export default {
  name: 'Pantry',

  components: {
    ProductItem,
  },

  inject: ['me'],

  apollo: {
    products: {
      query: PRODUCTS,
      subscribeToMore: {
        document: ON_PRODUCT_UPDATED,
        updateQuery(previousResult, { subscriptionData }) {
          if (
            previousResult.products.find(
              products =>
                products.id === subscriptionData.data.productUpdated.id
            )
          ) {
            return previousResult;
          }

          return {
            products: [
              ...previousResult.products,
              {
                ...subscriptionData.data.productUpdated,
                request: {
                  ...subscriptionData.data.productUpdated.request,
                },
              },
            ],
          };
        },
      },
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
