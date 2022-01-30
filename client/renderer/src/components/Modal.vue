<template>
   <div class="modal">
      <div class="modal-wrapper">
         <div class="modal-content">
            <slot name="header"></slot>
            <slot name="content"></slot>
            <slot name="footer"></slot>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: 'modal'
   }
</script>
