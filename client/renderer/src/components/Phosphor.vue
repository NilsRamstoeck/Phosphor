<template>
   <div class="phosphor">
      <contacts></contacts>
      <div class="chat-wrapper">
         <chat-header></chat-header>
         <messages :target=target></messages>
         <message-input></message-input>
      </div>
   </div>
</template>

<script>
   import MessageInput from './MessageInput';
   import Messages from './Messages';
   import Contacts from './Contacts';
   import ChatHeader from './ChatHeader';

   import {post} from 'functions';

   export default {
      name: 'phosphor',
      components: {MessageInput, Messages, Contacts, ChatHeader},
      props: {
      },
      data: function() {
         return {
            target: {},
         }
      },
      methods: {
         sendMessage: function () {
         }
      },
      beforeMount: async function () {
         socket.connectToServer();
      },
   }
</script>
