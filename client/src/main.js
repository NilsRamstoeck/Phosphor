import Vue from 'vue';
import App from './components/App';
import router from './router';
import axios from 'axios';

let theme = window.localStorage.getItem('theme');

if(theme == null){
  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    document.body.classList.add('darkmode');
    console.log(true);
    window.localStorage.setItem('theme', 'dark');
  }
} else {
  if(theme == 'dark'){
    document.body.classList.add('darkmode');
  }
}

axios({
  method: 'POST',
  url: '/',
  baseURL: 'http://localhost:8080',
})
.then((response) => {
  console.log(response.data.message);
})

new  Vue({
  router,
  template: '<App />',
  components: {App}
}).$mount('#app');
