import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { BootstrapVue, /* IconsPlugin */ } from 'bootstrap-vue'
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make the imported packages available throughout the project 
Vue.use(BootstrapVue)
Vue.use(Vuex)

// Preventing production start message used for instructions.
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
