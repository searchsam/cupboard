<template>
    <div id="request" class="container mx-auto px-4">
      <div class="p-5 mt-20">
        <h1 class="font-thin text-6xl mr-6">
          Solicitudes {{ this.$route.params.id }}
        </h1>
      </div>


      <!-- Request List -->

    </div>
</template>

<script type="text/javascript">
export default {
  name: "request",
  data() {
    return {
      error: null
    };
  }
};
</script>

<style lang="sass" scoped></style>
