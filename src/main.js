import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, /* IconsPlugin */ } from 'bootstrap-vue'

// global variable??
Vue.prototype.$user;
// import { tryToAuth } from "../auth-me.js";
// Vue.prototype.$user = tryToAuth().then(e=>user=e.username);

const firebaseConfig = {
  apiKey:process.env.apiKey,
  authDomain:process.env.authDomain,
  databaseURL:process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket:process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};
// Make the imported packages available throughout the project
Vue.use(BootstrapVue)
Vue.use(firebaseConfig)

// Preventing production start message used for instructions.
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
