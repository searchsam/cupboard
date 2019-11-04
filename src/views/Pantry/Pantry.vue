<script type="text/javascript" src="./Pantry.js"></script>
<style lang="sass" src="./Pantry.sass" scoped></style>

<template lang="html">
  <div id="pantry">
    <h1 class="text-4xl px-5 pb-2 mx-5 mb-2">
      Despensa
    </h1>

    <!-- Product List -->
    <div
      v-if="!$apollo.queries.products.loading"
      class="content-center px-5 mx-5"
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
