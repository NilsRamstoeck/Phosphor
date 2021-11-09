<template>
   <div class="phosphor">
      <contacts :contacts=contacts></contacts>
      <div class="chat-wrapper">
         <messages></messages>
         <message-input></message-input>
      </div>
   </div>
</template>

<script>
   import MessageInput from './MessageInput';
   import Messages from './Messages';
   import Contacts from './Contacts';

   export default {
      name: 'phosphor',
      components: {MessageInput, Messages, Contacts},
      props: {
         contacts: {
            type: Array,
            required: true
         }
      },
      data: function() {
         return {

         }
      },
      methods: {
         sendMessage: function () {
         }
      },
   }
</script>
