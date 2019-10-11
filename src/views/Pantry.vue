<template>
  <div id="pantry">
    <h1 class="font-thin text-5xl p-5 m-5">
      Despensa
    </h1>

    <!-- Product List -->
    <div
      v-if="!$apollo.queries.products.loading"
      class="content-center p-5 m-5"
    >
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
</script>

<style lang="sass" scoped></style>
