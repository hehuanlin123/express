import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode:'hash',
    routes:[
        {
            path:'/',
            component:() => import('../views/Home.vue'),
            name:'Home'
        },
        {
            path:'/detail',
            component:() => import('../views/Detail.vue'),
            name:'Detail'
        },
        {
            path:'/add',
            component:() => import('../views/Add.vue'),
            name:'Add'
        },
    ]
})

export default router;