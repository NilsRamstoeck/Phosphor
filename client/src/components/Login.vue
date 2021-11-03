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
      <modal v-if="showModal" class="register-modal">
         <h1 slot=header>Register</h1>
         <div slot=content>
            <p>
               No user is associated with that username. Would you like to register?
            </p>
         </div>
         <span slot=footer>
            <button class="modal-btn" @click="showModal = false" type="button" >Cancel</button>
            <button class="modal-btn" @click="register" type="button" >Register</button>
         </span>
      </modal>
   </div>
</template>

<script>
   import {post} from 'functions';
   import Modal from './Modal';

   export default {
      name: 'Login',
      components: {Modal},
      props: {

      },
      data: function(){
         return {
            showModal: false
         }
      },
      methods: {
         onSubmit: function (e) {
            const form = new FormData(e.target);
            const data = {};

            for(const entry of form){
               data[entry[0]] = entry[1];
            }

            const self = this;

            post('login', {
               username: data.username,
               password: data.password
            })
            .then(response => {
               if(response.result){
                  console.log('LOGIN SUCCESSFUL');
                  self.$parent.loggedIn = true;
               } else {
                  if(response.error){
                     if(response.error = 'wrong_password'){
                        console.log('wrong password');
                     } else if(response.error = 'inexistent_user'){
                        self.showModal = true;
                     }
                  } else {
                  }
                  console.log('This should never be reached');
               }
            });

            e.preventDefault();
         },
         register: async function(){
            const form = new FormData(document.querySelector('.login-form'));
            const data = {};

            for(const entry of form){
               data[entry[0]] = entry[1];
            }

            const response = await post('register', {
               username: data.username,
               password: data.password
            });

            const self = this;

            if(response.result){
               console.log('Register SUCCESSFUL');
               self.showModal = false;
               self.$parent.loggedIn = true;
            } else {
               console.log('Something went wrong');
            }

         }
      },
      mounted: function () {
      }
   }
</script>
