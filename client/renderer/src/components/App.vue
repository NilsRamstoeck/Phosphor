<template>
   <div class="app">
      <login v-if="!loggedIn"></login>
      <phosphor v-if="loggedIn"></phosphor>
   </div>
</template>

<script>
   import Login from './Login';
   import Phosphor from './Phosphor';
   export default{
      name: 'App',
      components: {Login, Phosphor},
      data: function () {
         return{
            loggedIn: false,
            keyPair: undefined,
            signedUsername: undefined,
         }
      }
   }
</script>
