<script type="text/javascript" src="./ProductItem.js"></script>
<style lang="sass" src="./ProductItem.sass" scoped></style>

<template lang="html">
  <transition appear name="fade">
    <li class="mb-6 block relative">
      <div class="bg-white rounded-lg shadow-md hoverItem">
        <p class="text-lg static">
          <span
            class="bookmark rounded-l-lg inline-block static center"
            :class="!status ? 'reject' : ''"
          >
            <i
              class="icon-flipped rounded-full text-4xl p-1"
              :class="status ? 'ti-face-smile' : 'ti-face-sad'"
            ></i>
          </span>
          <span class="itemBody text-xl inline-block static center py-2 ml-6">
            <h1 class="inline">{{ product.request.description }}</h1>
            <br />
            <a class="secondaryText">
              <i class="ti-info-alt"></i>
              {{ status ? 'EN EXISTENCIA' : 'AGOTADO' }}
            </a>
          </span>

          <span class="float-right inline-block static mt-3 mr-4" v-if="status">
            <input
              type="number"
              disabled
              :value="product.existence"
              class="quantityButton rounded-lg mr-2 w-6 text-center"
              :class="product.existence ? 'activeInput' : ''"
            />
            <a
              href="#"
              type="button"
              class="rounded-lg px-4 pt-4 pb-3 center"
              @click.prevent="decrease"
            >
              <i class="ti-arrow-circle-down text-2xl"></i>
            </a>
          </span>
          <Alert :msg="error" />
        </p>
      </div>
    </li>
  </transition>
</template>
