import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/HomePage.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ],
    linkActiveClass: 'active'
})

export default router
	