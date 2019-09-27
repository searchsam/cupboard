<template lang="html">
    <form class="p-4" method="POST" @submit.prevent="createOrder">
          <input
            type="text"
            v-model="name"
            class="h-12 border-2 border-gray-400 mr-2"
            placeholder="Nombre"
          />
          <DatePick
            v-model="deadline"
            max="2019-12-30"
            min="2019-01-01"
            :format="'YYYY-MM-DD'"
            :startWeekOnSunday="true"
            placeholder="Fecha"
            class="mr-2"
          />
          <label>
            <input
              v-model="status"
              type="checkbox"
              class="h-12 border-2 border-gray-400 mr-2"
            />
            {{ status ? "Activa" : "Completada" }}
          </label>
          <button
            class="bg-yellow-500 text-white text-xl h-12 w-40 hover:bg-yellow-400"
            type="submit"
          >
            Actualizar Orden
          </button>
          <Alert :msg="error" />
        </form>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
