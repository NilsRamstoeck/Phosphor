<template>
  <div class="login">
    <h1>Login :)</h1>

    <form class="login-form" >

      <label for="Username">Username</label>
      <input type="text" name="Username" placeholder="Name">
      <br>
      <label for="Password">Password</label>
      <input type="password" name="Password" placeholder="Password">
      <br>
      <button type="submit" name="submit">Log In</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    props: {

    },
    data: function(){
      return {

      }
    },
    methods: {

    },
    mounted: function () {
      console.log("MOUNTED");
    }
  }
</script>

<style scoped>

</style>
