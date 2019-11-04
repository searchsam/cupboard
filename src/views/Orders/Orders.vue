<script type="text/javascript" src="./Orders.js"></script>
<style lang="sass" src="./Orders.sass" scoped></style>

<template lang="html">
  <div id="orders">
    <h1 class="text-4xl px-5 pb-2 mx-5 mb-2">
      Ordenes
      <a
        href="#"
        type="button"
        class="showFormButton rounded-full"
        v-if="me.type <= 1"
        @click="toggleVar('createForm')"
      >
        <i class="text-3xl" :class="createForm ? 'ti-close' : 'ti-plus'"></i>
      </a>
    </h1>

    <!-- Create New Order -->
    <div
      id="createOderForm"
      class="createForm py-5 px-10 shadow-md mb-5"
      v-if="createForm"
    >
      <h1 class="text-xl">Crear Nueva Orden</h1>
      <CreateOrderForm />
    </div>

    <!-- Orders List -->
    <div
      v-if="!$apollo.queries.orders.loading"
      class="flex flex-wrap content-center px-5 mx-5"
    >
      <!-- Orders Cards -->
      <OrderCard v-for="order in ordersList" :key="order.id" :order="order" />
    </div>
    <div v-else>
      <span>Loading...</span>
    </div>
  </div>
</template>
