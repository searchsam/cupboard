<script type="text/javascript" src="./ProductItem.js"></script>
<style lang="sass" src="./ProductItem.sass" scoped></style>

<template lang="html">
  <li class="mb-4 block relative">
    <div class="bg-white rounded-lg shadow-md hoverItem">
      <p class="text-lg static">
        <span
          class="bookmark rounded-l-lg inline-block static center"
          :class="!status ? 'reject' : ''"
        >
          <i
            class="icon-flipped rounded-full text-2xl p-1"
            :class="status ? 'ti-face-smile' : 'ti-face-sad'"
          ></i>
        </span>
        <span class="text-lg inline-block static center">
          <h1 class="inline">{{ product.request.description }}</h1>
          <br />
          <a class="secondaryText text-base">
            <i class="ti-info-alt"></i>
            {{ status ? 'EN EXISTENCIA' : 'AGOTADO' }}
          </a>
        </span>
        <span class="float-right inline-block static my-4 mr-4" v-if="status">
          <input
            type="number"
            disabled
            :value="product.existence"
            class="quantityButton text-center rounded-lg mr-2"
            :class="product.existence ? 'activeInput' : ''"
          />
          <a
            href="#"
            type="button"
            class="rounded-lg px-4 pt-3 pb-2 center"
            @click.prevent="decrease"
          >
            <i class="ti-arrow-circle-down text-xl"></i>
          </a>
        </span>
        <Alert :msg="error" />
      </p>
    </div>
  </li>
</template>
