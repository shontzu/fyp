import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home.vue"
import isFavourited from "../views/Favourited.vue"
import Account from "../views/Account.vue"
import Compare from "../views/Compare.vue"
import SeeAll from "../views/SeeAll.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/isFavourited',
        name: 'isFavourited',
        component: isFavourited
    },
    {
        path: '/account',
        name: 'Account',
        component: Account
    },
    {
        path: '/compare/:merchant',
        name: 'Compare',
        component: Compare,
        props: true,
    },
    {
        path: '/seeAll/:query',
        name: 'seeAll',
        component: SeeAll
    } ,
    {
        path: '/seeAll',
        name: 'seeAllNoQ',
        component: SeeAll
    }  
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router