<template>
  <div class="login container mx-auto px-4">
    <FormLogin />
  </div>
</template>

<script>
import FormLogin from "@/components/FormLoginApollo.vue";

export default {
  name: "login",
  components: {
    FormLogin
  }
};
</script>
