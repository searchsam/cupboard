<script type="text/javascript" src="./RequestItem.js"></script>
<style lang="sass" src="./RequestItem.sass" scoped></style>

<template lang="html">
  <li class="mb-4 block relative">
    <div v-if="updateForm">
      <div class="bg-white rounded-lg shadow-md hoverItem">
        <p class="text-lg static">
          <span
            class="bookmark rounded-l-lg inline-block static center"
            :class="bookmarkStatus"
          >
            <i
              class="icon-flipped rounded-full text-2xl p-1"
              :class="iconStatus"
            ></i>
          </span>
          <span class="inline-block center static text-2xl px-6">
            {{ request.quantity }}
          </span>
          <span class="text-lg inline-block static center">
            <h1 class="inline">{{ request.description }}</h1>
            -
            <a class="secondaryText text-base">
              <i class="ti-user"></i> {{ request.user.name }}
            </a>
            <br />
            <a class="secondaryText text-base"
              ><i class="ti-info-alt"></i> {{ labelStatus }}</a
            >
          </span>
          <span
            class="float-right inline-block static my-4 mr-4"
            v-if="orderStatus"
          >
            <a
              href="#"
              type="button"
              class="rounded-lg px-4 pt-3 pb-2 center"
              v-if="request.user.id == me.id"
              @click.prevent="toggleVar('updateForm')"
            >
              <i class="ti-write text-xl"></i>
            </a>
            <div class="inline" v-if="me.type <= 1">
              <a
                href="#"
                type="button"
                class="rounded-lg px-4 pt-3 pb-2 center"
                v-if="request.status == 1 || request.status == 2"
                @click.prevent="deny"
              >
                <i class="ti-na text-xl"></i>
              </a>
              <a
                href="#"
                type="button"
                v-if="request.status == 0 || request.status == 2"
                class="rounded-lg px-4 pt-3 pb-2 center"
                @click.prevent="approve"
              >
                <i class="ti-check text-xl"></i>
              </a>
            </div>
          </span>
        </p>
      </div>
    </div>
    <div v-else>
      <form
        class="p-4 block rounded-lg shadow-md bg-white"
        method="POST"
        @submit.prevent="updateRequest"
      >
        <input
          class="descriptionButton mb-2 rounded-lg mr-2"
          type="text"
          placeholder="Peticion"
          v-model="description"
          :class="description ? 'activeInput' : ''"
        />
        <input
          class="quantityButton mb-2 rounded-lg mr-2"
          type="number"
          placeholder="Cantidad"
          v-model="quantity"
          :class="quantity ? 'activeInput' : ''"
        />
        <button class="mb-2 rounded-lg mr-2" type="submit">
          Actualizar Solicitud
        </button>
        <button
          class="cancelButton mb-2 rounded-lg mr-2"
          type="button"
          @click="toggleVar('updateForm')"
        >
          Cancelar
        </button>
      </form>
    </div>
    <Alert :msg="error" />
  </li>
</template>
