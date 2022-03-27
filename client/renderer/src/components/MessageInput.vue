<template>
   <div class="message-input-wrapper">
      <div class="message-input">
         <input @keyup.enter=sendMessage type="text" placeholder="Type your message here..." v-model:value=message>
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
            message: 'Message',

         }
      },
      methods: {
         sendMessage: async function () {
            console.log(this.$root);
            const msg = signMessage(this.message, this.$root.keyPair.privateKey);
            socket.send(msg);
         }
      },
   }
</script>
