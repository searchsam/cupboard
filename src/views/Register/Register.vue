<script type="text/javascript" src="./Register.js"></script>
<style lang="sass" src="./Register.sass" scoped></style>

<template lang="html">
  <div id="register" class="flex h-full bg-white">
    <div class="flex-1 container mx-auto mt-32 flex">
      <form method="POST" @submit.prevent="register" class="block p-5 mx-auto">
        <h1 class="text-4xl mb-8 text-center">
          Registrar Usuario
        </h1>
        <!-- Name Input -->
        <input
          class="loginInput mb-8 rounded-lg"
          type="text"
          v-model="name"
          placeholder="Nombre"
          :class="name ? 'activeInput' : ''"
        />
        <br />
        <!-- Email -->
        <input
          class="loginInput mb-8 rounded-lg"
          type="email"
          v-model="email"
          placeholder="Correo Electronico"
          :class="email ? 'activeInput' : ''"
        />
        <br />
        <!-- Password Input -->
        <input
          class="loginInput mb-8 rounded-lg shadow-md"
          type="password"
          v-model="password"
          placeholder="Contraseña"
          :class="password ? 'activeInput' : ''"
        />
        <br />
        <!-- Confirm Password Input -->
        <input
          class="loginInput mb-10 rounded-lg shadow-md"
          type="password"
          v-model="confirmation"
          placeholder="Confirmar Contraseña"
          :class="confirmation ? 'activeInput' : ''"
        />
        <br />
        <div class="container mx-auto flex">
          <!-- Submit Button -->
          <button
            class="loginButton rounded-lg shadow-md ml-auto mr-auto"
            type="submit"
          >
            Registar Usuario
          </button>
        </div>

        <div class="absolute left-0 bottom-0 w-1/2">
          <!-- Error Message -->
          <Alert :msg="error" />
        </div>
      </form>
    </div>
    <div class="sidePanelLogin flex-1 container mx-auto flex">
      <div class="block p-5 m-auto">
        <img
          src="../../assets/img/login_side_art.svg"
          class="sideImage mx-auto"
        />
        <div class="flex">
          <!-- Cancel Button -->
          <button
            class="registerButton rounded-lg shadow-md mx-auto"
            type="button"
            @click="$router.push({ name: 'login' })"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
