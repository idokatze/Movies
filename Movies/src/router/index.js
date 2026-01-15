import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import MovieIndex from '@/pages/MovieIndex.vue'
import MovieDetails from '@/pages/MovieDetails.vue'
import MovieEdit from '@/pages/MovieEdit.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/movie',
            name: 'MovieIndex',
            component: MovieIndex,
        },
        {
            path: '/movie/:id',
            name: 'MovieDetails',
            component: MovieDetails,
        },
        {
            path: '/movie/edit/:id?',
            name: 'MovieEdit',
            component: MovieEdit,
        },
    ],
})

export default router
