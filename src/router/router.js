import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Exercise from '../components/Exercise.vue';
import ExerciseList from '../components/ExerciseList.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/esercizi/:id',
        name: 'ExerciseList',
        component: ExerciseList
    },
    {
        path: '/esercizio/:id/:listId',
        name: 'Exercise',
        component: Exercise
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  });
  
export default router;