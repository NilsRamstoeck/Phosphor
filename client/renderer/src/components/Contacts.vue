<template>
   <div class="contact-list">
      <span class="add-contact-btn" @click="showModal = true">+</span>
      <div class="contact-wrapper" v-for="contact in contacts" :key="contact.name">
         <div :id="'contact-' + contact.name"  @click="setTarget(contact)" class="contact">
            <span class="contact-name">{{contact.name}}:  {{contact.status}}</span>
         </div>
      </div>

      <modal v-if="showModal" class="add-contact-modal">
         <h1 slot=header>Add contact</h1>
         <div slot=content>
            <p>
               Add user from central database
            </p>
            <form class="add-contact-form" @submit="addContact" >
               <input type="text" name="" value="" placeholder="username">
            </form>
         </div>
         <span slot=footer>
            <button class="modal-btn" @click="showModal = false" type="button" >Cancel</button>
         </span>
      </modal>

   </div>
</template>

<script>
   import Modal from './Modal';
   import {loadMessages, post} from 'functions';

   export default {
      name: 'contacts',
      components: {Modal},
      props: {
      },
      data: function() {
         return {
            contacts: [],
            showModal: false,
         }
      },
      methods: {
         loadContacts: async function () {
            const response = await post('contacts', this.$root.signedUsername);
            this.contacts = [];
            response.data.contacts.forEach((contact, i) => {
               this.contacts[i] = {
                  name: contact,
                  status: 'offline',
                  messages: []
               }
            });
         },
         addContact: async function(e){
            e.preventDefault();

         },
         setTarget: async function(target){
            const response = socket.connectToUser(target.name);
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
      beforeMount: function () {
         this.loadContacts();
      }
   }
</script>
