import Vue from 'vue';
import App from './components/App';
import router from './router';

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

new  Vue({
   template: '<App />',
   components: {App}
}).$mount('#app');
