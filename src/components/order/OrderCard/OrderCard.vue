<script type="text/javascript" src="./OrderCard.js"></script>
<style lang="sass" src="./OrderCard.sass" scoped></style>

<template lang="html">
  <div
    id="ordercard"
    class="card-order content-center w-1/4 mr-3 mb-3 relative"
  >
    <div v-if="updateForm">
      <div
        class="cardContent p-3 rounded-lg bg-white shadow-md hover:cursor-pointer"
        :class="this.order.status ? 'cardActive' : 'cardInactive'"
        @click="goToOrder"
      >
        <span class="inline-block pr-8">
          <h1 class="text-xl">{{ order.name }}</h1>
          <p>
            <i class="ti-calendar"></i>
            {{ order.deadline.split(' ')[0] }}
          </p>
        </span>
      </div>

      <div
        class="cardFooter absolute my-auto top-0 right-0 table-row"
        v-if="me.type <= 1 && order.status"
      >
        <a
          href="#"
          type="button"
          class="rounded-full p-2"
          @click.prevent="toggleVar('updateForm')"
        >
          <i class="ti-write text-lg"></i>
        </a>
        <a
          href="#"
          type="button"
          class="rounded-full p-2"
          @click.prevent="shopOrder"
        >
          <i class="ti-shopping-cart text-lg"></i>
        </a>
      </div>
    </div>
    <div v-else>
      <form
        method="POST"
        class="block p-5 rounded-lg shadow-md bg-white"
        @submit.prevent="updateOrder"
      >
        <input
          class="mb-4 rounded-lg shadow-md"
          v-model="name"
          placeholder="Nombre"
          :class="name ? 'activeInput' : ''"
        />
        <br />
        <DatePick
          format="YYYY-MM-DD"
          start-week-on-sunday
          :isDateDisabled="isPastDate"
          placeholder="Fecha"
          v-model="deadline"
          class="mb-4"
          :class="deadline ? 'activeInput' : ''"
        />
        <br />
        <button class="mb-4 rounded-lg shadow-md" type="submit">
          Actualizar Orden
        </button>
        <br />
        <button
          class="cancelButton rounded-lg shadow-md"
          type="button"
          @click="toggleVar('updateForm')"
        >
          Cancelar
        </button>
      </form>
    </div>
    <Alert :msg="error" />
  </div>
</template>
