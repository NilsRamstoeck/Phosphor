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
   import {post, handleError} from 'functions';
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
         onSubmit: async function (e) {
            e.preventDefault();

            const response = await this.handlePost('login');
            this.handleResponse(response);
         },
         register: async function(){
            const response = await this.handlePost('register');
            this.handleResponse(response);
         },
         handlePost: async function (type) {
            const form = new FormData(document.querySelector('.login-form'));
            const data = {};

            for(const entry of form){
               data[entry[0]] = entry[1];
            }

            return await post(type, {
               username: data.username,
               password: data.password
            });

         },
         handleResponse: function(response) {
            if(response && response.result){
               switch(response.action){
                  case 'login':
                  case 'register':
                  this.showModal = false;
                  this.$parent.loggedIn = true;
                  break;
                  case null:
                  case undefined:
                  default:
                  console.error('Nonsensical Server Response:', response);
               }
            } else {
               handleError(response);
            }
         },
         registerEventHandler: function () {
            this.showModal = true;
            console.log('receive');
         }
      },
      mounted: function () {
         document.addEventListener('register_event', this.registerEventHandler);
      },
      beforeDestroy: function () {
         document.removeEventListener('register_event', this.registerEventHandler);
      }
   }
</script>
