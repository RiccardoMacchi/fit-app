import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Diet from '../components/Diet.vue';
import Meal from '../components/Meal.vue';
import Cookbook from '../components/Cookbook.vue';
import Exercise from '../components/Exercise.vue';
import ExerciseList from '../components/ExerciseList.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/alimentazione',
        name: 'Diet',
        component: Diet
    },
    {
        path: '/ricettario',
        name: 'Cookbook',
        component: Cookbook
    },
    {
        path: '/pasto/:id',
        name: 'Meal',
        component: Meal
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