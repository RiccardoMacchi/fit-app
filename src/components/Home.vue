<script>
import exercises from '../data/data.json';
import { RouterLink } from "vue-router";

export default {
    name: 'Home',
    data(){
        return{
            exercises: exercises.exercises
        }
    },
    methods:{
        saveToLocalStorage() {
            localStorage.setItem('exercises', JSON.stringify(this.exercises))
        },
    },
    mounted(){
        const savedData = localStorage.getItem('exercises')
        if (savedData) {
            this.exercises = JSON.parse(savedData)
        } else {
            this.exercises = exercises.exercises
            this.saveToLocalStorage();
        }
    }

}
</script>

<template>
    <h1>Fit Home</h1>
    <ul>
        <RouterLink v-for="exercie in exercises" :to="{name:'Exercise', params:{id: exercie.name}}"> {{ exercie.name }}</RouterLink>
    </ul>
</template>

<style lang="scss" scoped>
a{
    display: block;
}
</style>