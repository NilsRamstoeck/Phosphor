<template>
   <div class="contacts">
      <div class="contact" v-for="contact in contacts" :key="contact">
         <span class="contact-name">{{contact.name}}:  {{contact.status}}</span>
      </div>
   </div>
</template>

<script>

   export default {
      name: 'contacts',
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
            docu
         }
      },
   }
</script>
