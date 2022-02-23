import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import { BootstrapVue, /* IconsPlugin */ } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// FIREBASE: Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "firebaseApiKey",
  authDomain: "foodio-331305.firebaseapp.com",
  projectId: "foodio-331305",
  storageBucket: "foodio-331305.appspot.com",
  messagingSenderId: "1078970661936",
  appId: "1:1078970661936:web:6d3762d0bcd067540d81f5",
  measurementId: "G-20QXH74KSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Make the imported packages available throughout the project 
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(analytics)

// Preventing production start message used for instructions.
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
