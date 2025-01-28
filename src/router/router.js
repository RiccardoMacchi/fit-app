import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Diet from '../components/Diet.vue';
import Meal from '../components/Meal.vue';
import Profile from '../components/Profile.vue';
import Cookbook from '../components/Cookbook.vue';
import Challenge from '../components/Challenge.vue';
import ChallengeList from '../components/ChallengeList.vue';
import Exercise from '../components/Exercise.vue';
import ExerciseList from '../components/ExerciseList.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/profilo',
        name: 'Profile',
        component: Profile
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
        path: '/sfide',
        name: 'ChallengeList',
        component: ChallengeList
    },
    {
        path: '/sfida/:id',
        name: 'Challenge',
        component: Challenge
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
    history: createWebHistory('/fit-app/'),
    routes
  });
  
export default router;