<script type="text/javascript" src="./CreateOrderForm.js"></script>
<style lang="sass" src="./CreateOrderForm.sass" scoped></style>

<template lang="html">
  <form method="POST" @submit.prevent="createOrder" class="my-2">
    <input
      type="text"
      v-model="name"
      class="mb-2 rounded-lg mr-2"
      placeholder="Nombre"
      :class="name ? 'activeInput' : ''"
    />
    <DatePick
      v-model="deadline"
      format="YYYY-MM-DD"
      start-week-on-sunday
      :isDateDisabled="isPastDate"
      placeholder="Fecha"
      class="mb-2 rounded-lg mr-2"
      :class="deadline ? 'activeInput' : ''"
    />
    <button class="mb-2 rounded-lg shadow-md" type="submit">
      Crear Orden
    </button>
    <Alert :msg="error" />
  </form>
</template>
