<script type="text/javascript" src="./Orders.js"></script>
<style lang="sass" src="./Orders.sass" scoped></style>

<template lang="html">
  <div id="orders">
    <h1 class="text-5xl px-5 pb-5 mx-5 mb-5">
      Ordenes
      <a
        href="#"
        type="button"
        class="showFormButton rounded-full"
        v-if="me.type <= 1"
        @click="toggleVar('createForm')"
      >
        <i class="text-4xl" :class="createForm ? 'ti-close' : 'ti-plus'"></i>
      </a>
    </h1>

    <!-- Create New Order -->
    <div id="createOderForm" class="createForm p-5 shadow-md" v-if="createForm">
      <h1 class="text-2xl m-5">Crear Nueva Orden</h1>
      <CreateOrderForm />
    </div>

    <!-- Orders List -->
    <div
      v-if="!$apollo.queries.orders.loading"
      class="flex flex-wrap content-center p-5 m-5"
    >
      <!-- Orders Cards -->
      <OrderCard v-for="order in ordersList" :key="order.id" :order="order" />
    </div>
    <div v-else>
      <span>Loading...</span>
    </div>
  </div>
</template>
