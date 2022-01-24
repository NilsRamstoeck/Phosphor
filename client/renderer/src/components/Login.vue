<template>
   <div class="login-container">
      <div class="login-wrapper">

         <h1 class="login" slot="header">LOGIN</h1>
         <form class="login login-form" method="post" @submit="login" slot="content">

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
   import Modal from './Modal';
   import {
      post,
      handleError,
      generateKeyPair,
      signMessage,
      verifySignedMessage,
      convertToPem,
      convertFromPem,
   } from 'functions';

   export default {
      name: 'Login',
      components: {Modal},
      props: {

      },
      data: function(){
         return {
            showModal: false,
            signedUsername: null,
            keypair: null,
         }
      },
      methods: {
         login: function (e) {
            e.preventDefault();
            const self = this;
            setTimeout(async function () {

               const data = self.getFormData();

               console.log(data);

               self.keypair = await generateKeyPair(data);
               const {publicKey, privateKey} = self.keypair;
               self.signedUsername = signMessage(data.username, privateKey);

               const response = await post('login', {msg: self.signedUsername});
               await self.handleResponse(response);

               /// ONLY FOR TESTING ///
               const pem = convertToPem({privateKey, publicKey});
               localStorage.setItem('keyPair', JSON.stringify(pem));
               localStorage.setItem('username', data.username);
               ////////////////////////

            }, 500);
         },
         register: function(){
            const self = this;
            //TODO: figure out why I used a timeout?
            setTimeout(async function () {

               const data = self.getFormData();

               self.keypair = await generateKeyPair(data);
               const {publicKey, privateKey} = self.keypair;
               self.signedUsername = signMessage(data.username, privateKey);

               const pem = convertToPem({privateKey, publicKey});
               const msg = {...self.signedUsername, publicKey: pem.publicKey};

               const response = await post('register', msg);
               await self.handleResponse(response);

            }, 500);
         },
         getFormData : function() {
            const form = new FormData(document.querySelector('.login-form'));

            let data = {};
            for(const entry of form){
               data[entry[0]] = entry[1];
            }

            return data;
         },
         handleResponse: async function(response) {
            if(response && response.result){
               this.showModal = false;
               this.$parent.loggedIn = true;
               this.$parent.privateKey = this.keyPair.privateKey;
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

         // ONLY FOR TESTING ///
         const self = this;
         const pem = JSON.parse(localStorage.getItem('keyPair'));
         if(pem){
            self.keyPair = convertFromPem(pem);
            const msg = signMessage(localStorage.getItem('username'), self.keyPair.privateKey);

            post('login', {
               msg
            }).then(response => {
               self.handleResponse(response);
            });
         }
         ////////////////////////////

      },
      beforeDestroy: function () {
         document.removeEventListener('register_event', this.registerEventHandler);
      }
   }
</script>
