<template>
   <div class="login-container">
      <div class="login-wrapper">

         <h1 class="login" slot="header">LOGIN</h1>
         <form class="login login-form" method="post" @submit="onSubmit" slot="content">

            <input class="login" type="text" name="username" placeholder="Username" required>
            <br>
            <input class="login" type="password" name="password" placeholder="Password" required>
            <br>

            <button v-if="true" class="login" type="submit" name="submit">Log In</button>

         </form>

      </div>
   </div>
</template>

<script>
   import {post} from 'functions';

   export default {
      name: 'Login',
      components: {},
      props: {

      },
      data: function(){
         return {

         }
      },
      methods: {
         onSubmit: function (e) {
            const form = new FormData(e.target);
            const data = {};

            for(const entry of form){
               data[entry[0]] = entry[1];
            }

            post({
               username: data.username,
               password: data.password
            })
            .then((res) => {
               console.log(res);
            });
            e.preventDefault();
         }
      },
      mounted: function () {
         post({
            text: 'Hi'
         })
         .then((res) => console.log(res));
      }
   }
</script>
