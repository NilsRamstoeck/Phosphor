import Vue from 'vue';
import App from "../components/App.vue";
import axios from 'axios';

window.axios = axios;

axios({
  method: 'POST',
  url: '/',
  baseURL: 'http://localhost:8080',
})
.then((response) => {
   console.log(response.data.message);
})

new  Vue({
  el: '#app',
  components: {App}
});
