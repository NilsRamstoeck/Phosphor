<template>
   <div class="login-container">
      <div class="login-wrapper">

         <h1 class="login" slot="header">LOGIN</h1>
         <form class="login login-form" method="post" @submit="login" slot="content">

            <input class="login" type="text" name="username" placeholder="Username" required value="Phospor">
            <br>

            <!-- TESTING -->
            <input class="login" type="password" name="password" placeholder="Password" required-when-not-testing>
            <!--         -->

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
      convertToPem
   } from 'functions';

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
         login: function (e) {
            e.preventDefault();
            const self = this;
            setTimeout(async function () {

               const data = self.getFormData();

               console.log(data);

               //TESTING//
               if(data.password == '') data.password = 'password' //testing passwords
               ////////////

               const {publicKey, privateKey} = await generateKeyPair(data);
               const msg = signMessage(data.username, privateKey);

               const tpem = convertToPem({privateKey, publicKey});
               // console.log(tpem.publicKey);
               // console.log(verifySignedMessage(msg, publicKey));


               const response = await post('login', {
                  msg
               });

               await self.handleResponse(response);

               /// ONLY FOR TESTING ///
               const pem = convertToPem({privateKey, publicKey});
               localStorage.setItem('privateKey', pem.privateKey);
               localStorage.setItem('username', data.username);
               ////////////////////////

            }, 500);
         },
         register: function(){
            const self = this;
            //TODO: figure out why I used a timeout?
            setTimeout(async function () {

               const data = self.getFormData();

               //TESTING//
               if(data.password == '') data.password = 'passwort' //testing passwords
               ////////////

               const {publicKey, privateKey} = await generateKeyPair(data);
               const keyPair2 = await generateKeyPair(data);


               const msg = signMessage(data.username, privateKey);
               const pem = convertToPem({privateKey, publicKey});
               const pem2 = convertToPem(keyPair2);
               console.log(verifySignedMessage(msg, publicKey));
               // console.log(verifySignedMessage(msg, keyPair2.publicKey));
               console.log(publicKey, keyPair2.publicKey);
               console.log(pem.publicKey);
               console.log(pem2.publicKey);
               const response = await post('register', {
                  msg,
                  publicKey: pem.publicKey
               });

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
               const status = 'offline';
               this.showModal = false;
               this.$parent.loggedIn = true;
               this.$parent.contacts = response.data.contacts.map(name => {return {name, status}});
               window.privateKey = (await generateKeyPair(this.getFormData())).privateKey;
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

         /// ONLY FOR TESTING ///
         // const self = this;
         // const privateKey = localStorage.getItem('privateKey');
         // if(privateKey){
         //    const msg = signMessage(localStorage.getItem('username'), privateKeyFromPem(privateKey));
         //
         //    post('login', {
         //       msg
         //    }).then(response => {
         //       self.handleResponse(response);
         //    });
         // }
         //////////////////////////////

      },
      beforeDestroy: function () {
         document.removeEventListener('register_event', this.registerEventHandler);
      }
   }
</script>
