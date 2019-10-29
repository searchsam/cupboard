<script type="text/javascript" src="./CreateRequestForm.js"></script>
<style lang="sass" src="./CreateRequestForm.sass" scoped></style>

<template lang="html">
  <form method="POST" @submit.prevent="createRequest" class="m-5">
    <input
      class="mb-4 descriptionButton rounded-lg mr-2"
      v-model="description"
      type="text"
      placeholder="Peticion"
      :class="description ? 'activeInput' : ''"
    />
    <input
      class="mb-4 quantityButton rounded-lg mr-2 text-center"
      v-model="quantity"
      type="number"
      placeholder="Cantidad"
      :class="quantity ? 'activeInput' : ''"
    />
    <button class="mb-4 rounded-lg text-xl shadow-md" type="submit">
      Crear Solicitud
    </button>
    <Alert :msg="error" />
  </form>
</template>
