<template>
  <div id="order">
    <h1 class="font-thin text-6xl">
      Despensa
    </h1>

    <!-- Product List -->
    <div class="bg-white m-2">
      <ul>
        <ProductItem
          v-for="product in productList"
          :key="product.id"
          :product="product"
        />
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import ProductItem from '@/components/pantry/ProductItem';

export default {
  name: 'Pantry',

  components: {
    ProductItem,
  },

  inject: ['me'],

  apollo: {
    products: {
      query: require('@/graphql/queries/StockProducts').default,
    },
  },

  computed: {
    productList: function() {
      return (this.products || []).sort((a, b) => {
        a.status < b.status ? 1 : -1;
      });
    },
  },
};
</script>
