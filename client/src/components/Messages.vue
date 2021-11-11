<template>
   <div class="message-list">
      <div class="message-wrapper" v-for="message in target.messages" :key="">
         <div class="message">
            <span class="sender">{{message.sender}}</span>:
            <span class="content">{{message.content}}</span>
            <span class="timestamp"> - {{message.timestamp}}</span>
         </div>
      </div>
   </div>
</template>

<script>

   export default {
      name: 'messages',
      props: {
         target: {
            type: Object,
            required: false
         }
      },
      data: function() {
         return {

         }
      },
      methods: {

      },
   }
</script>
