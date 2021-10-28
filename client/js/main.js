import Vue from 'vue';
import App from "../components/App.vue";
import axios from 'axios';

axios.defaults.port = 8080;

axios({
  method: 'post',
  url: 'localhost:8080/',
  port: '8080'
}).then((response) => console.log);

console.log(axios);

new  Vue({
  el: '#app',
  components: {App}
});
