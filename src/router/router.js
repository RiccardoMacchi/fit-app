import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Exercise from '../components/Exercise.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/esercizio/:id',
        name: 'Exercise',
        component: Exercise
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  });
  
export default router;