<script type="text/javascript" src="./Login.js"></script>
<style lang="sass" src="./Login.sass" scoped></style>

<template lang="html">
  <div id="login" class="flex h-full bg-white">
    <div class="sidePanelLogin flex-1 container mx-auto flex">
      <div class="block p-5 m-auto">
        <img
          src="../../assets/img/register_side_art.svg"
          class="sideImage mx-auto"
        />
        <div class="flex">
          <!-- Show Register Form Button -->
          <button
            class="registerButton rounded-lg shadow-md mx-auto"
            type="button"
            @click="$router.push({ name: 'register' })"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
    <div class="flex-1 container mx-auto mt-32 flex">
      <form method="POST" @submit.prevent="login" class="block p-5 mx-auto">
        <h1 class="text-4xl mb-8 text-center">Iniciar Sesión</h1>
        <!-- Email Input -->
        <input
          class="loginInput mb-8 rounded-lg"
          type="email"
          v-model="username"
          placeholder="Correo Electrónico"
          :class="username ? 'activeInput' : ''"
        />
        <br />
        <!-- Password Input -->
        <input
          class="loginInput mb-10 rounded-lg"
          type="password"
          v-model="password"
          placeholder="Contraseña"
          :class="password ? 'activeInput' : ''"
        />
        <br />
        <div class="container mx-auto flex">
          <!-- Submit Button -->
          <button
            class="loginButton rounded-lg shadow-md ml-auto mr-auto"
            type="submit"
          >
            Iniciar Sesion
          </button>
        </div>

        <div class="absolute right-0 bottom-0 w-1/2">
          <!-- Error Message -->
          <Alert :msg="error" />
        </div>
      </form>
    </div>
  </div>
</template>
