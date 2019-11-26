<script type="text/javascript" src="./Order.js"></script>
<style lang="sass" src="./Order.sass" scoped></style>

<template lang="html">
  <div id="order">
    <h1 class="text-4xl px-5 pb-2 mx-5 mb-2">
      Solicitudes
      <a
        href="#"
        type="button"
        class="showFormButton rounded-full font-bold"
        v-if="order && (order.status || new Date() < order.deadline)"
        @click="toggleVar('createForm')"
      >
        <i class="text-3xl" :class="createForm ? 'ti-close' : 'ti-plus'"></i>
      </a>
    </h1>

    <!-- Create Request Form -->
    <div
      id="createRequestForm"
      class="createForm py-5 px-10 shadow-md mb-5"
      v-if="createForm"
    >
      <h1 class="text-xl">Crear Nueva Solicitud</h1>
      <CreateRequestForm />
    </div>

    <!-- Request List -->
    <div v-if="!$apollo.queries.order.loading" class="content-center px-5 mx-5">
      <ul>
        <RequestItem
          v-for="request in requestsList"
          :key="request.id"
          :request="request"
          :orderStatus="order.status"
        />
      </ul>
    </div>
    <div v-else>
      <span>Loading...</span>
    </div>
  </div>
</template>
