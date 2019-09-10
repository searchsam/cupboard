<template>
  <div class="container mx-auto px-4">
    <ApolloQuery :query="require('../graphql/Users.gql')">
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="data">
          <div v-for="user in data.users" :key="user.id">{{ user.name }}</div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
h3
  margin: 40px 0 0

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983
</style>
