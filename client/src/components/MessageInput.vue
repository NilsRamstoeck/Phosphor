<template>
   <div class="message-input-wrapper">
      <div class="message-input">
         <input @keyup.enter=sendMessage type="text" name="" v-model:value=message>
         <button @click=sendMessage><i class="fas fa-paper-plane"></i></button>
      </div>
   </div>
</template>

<script>
   import {post, signMessage} from '../functions';
   export default {
      name: 'message-input',
      props: {

      },
      data: function() {
         return {
            message: '',

         }
      },
      methods: {
         sendMessage: async function () {
            const msg = signMessage(this.message, window.privateKey);
         }
      },
   }
</script>
