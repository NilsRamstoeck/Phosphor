<template>
   <div class="contact-list">
      <div class="contact-wrapper" v-for="contact in contacts" :key="contact.name">
         <div :id="'contact-' + contact.name"  @click="setTarget(contact)" class="contact">
            <span class="contact-name">{{contact.name}}:  {{contact.status}}</span>
         </div>
      </div>
   </div>
</template>

<script>
   import {loadMessages} from '../functions.js';
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
         setTarget(target){
            let {name, messages} = target;
            if(messages == undefined){
               messages = loadMessages(name);
               //this should be illegal but it works so who cares ¯\_(ツ)_/¯
               target.messages = messages;
            }
            this.$parent.target = {name, messages};
            document.querySelectorAll('.contact-list > .contact-wrapper > .contact')
            .forEach(node => node.classList.remove('active'));
            document.querySelector('#contact-' + name).classList.add('active')
         }
      },
   }
</script>
