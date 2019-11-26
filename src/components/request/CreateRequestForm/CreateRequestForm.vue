<script type="text/javascript" src="./CreateRequestForm.js"></script>
<style lang="sass" src="./CreateRequestForm.sass" scoped></style>

<template lang="html">
  <form method="POST" @submit.prevent="createRequest" class="my-2">
    <input
      class="descriptionButton mb-2 rounded-lg mr-2"
      v-model="description"
      type="text"
      placeholder="Peticion"
      :class="description ? 'activeInput' : ''"
    />
    <input
      class="quantityButton text-center mb-2 rounded-lg mr-2"
      v-model="quantity"
      type="number"
      placeholder="Cantidad"
      :class="quantity ? 'activeInput' : ''"
    />
    <button class="mb-2 rounded-lg mr-2" type="submit">
      Crear Solicitud
    </button>
    <Alert :msg="error" />
  </form>
</template>
