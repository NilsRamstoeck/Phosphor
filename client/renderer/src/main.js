import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './components/App';

function applyTheme(theme){
   if(theme == 'dark'){
      document.body.classList.add('darkmode');
   } else {
      document.body.classList.remove('darkmode');
   }
}

window.theme.get()
.then((theme) => {
   applyTheme(theme);
});

window.theme.onupdated(async (event, theme) => {
   applyTheme(theme);
})

new  Vue({
   template: '<App />',
   components: {App}
}).$mount('#app');
