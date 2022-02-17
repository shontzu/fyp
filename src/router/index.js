import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home.vue"
import Favourited from "../views/Favourited.vue"
import Account from "../views/Account.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/favourited',
        name: 'Favourited',
        component: Favourited
    },
    {
        path: '/account',
        name: 'Account',
        component: Account
    }    
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router