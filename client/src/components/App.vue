<template>
   <div class="app">
      <login v-if="!loggedIn"></login>
   </div>
</template>

<script>
   import Login from './Login';
   export default{
      name: 'App',
      components: {Login},
      data: function () {
         return{
            loggedIn: false,
         }
      }
   }
</script>
