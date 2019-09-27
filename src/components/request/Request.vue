<template>
  <div class="item-list">
    <p class="p-5">
      <span class="p-5">
                {{ request.description }} {{ request.quantity }} ({{
                  request.user.name
                }})
              </span>
      <span class="float-right">
                <a href="#">denegar</a>
                <a href="#">editar</a>
              </span>
    </p>
  </div>
</template>

<script>
  export default {
      name: 'Request',

      props: {
          request: {
              type: Object,
              required: true
          }
      }
  }
</script>
