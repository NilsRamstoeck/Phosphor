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

</script>

<style scoped>
   .modal{
      position: fixed;
   }
   .modal-wrapper{
      position: absolute;
      height: 100vh;
      width: 100vw;
      background: rgba(0, 0, 0, 0.5)
   }
   .modal-content{
      margin: auto auto;
      height: max-content;
      width: 30vw;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #fff;
   }
</style>
