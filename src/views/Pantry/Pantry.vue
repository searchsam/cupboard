<script type="text/javascript" src="./Pantry.js"></script>
<style lang="sass" src="./Pantry.sass" scoped></style>

<template lang="html">
  <div id="pantry">
    <h1 class="text-5xl px-5 pb-5 mx-5 mb-5">
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
