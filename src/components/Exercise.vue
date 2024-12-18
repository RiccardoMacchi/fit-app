<script>
import exercises from '../data/data.json';

export default {
    name: 'Exercise',
    data(){
        return{
            exercises: exercises.exercises,
            thisExercise: '',
            exercise: {
            },
            isLoading: true
        }
    },
    methods:{
        actualExercise(id){
            // console.log(exercises.exercises)
            this.exercises.forEach(ex => {
                if(ex.name === id){
                    this.exercise = ex
                    this.isLoading = false
                }
            });
        },
        saveToLocalStorage() {
            localStorage.setItem('exercises', JSON.stringify(this.exercises))
        },
        addReps(i) {
            this.exercise.series[i].reps++
            this.saveToLocalStorage()
        },
        removeReps(i) {
            if (this.exercise.series[i].reps > 0) {
                this.exercise.series[i].reps--
                this.saveToLocalStorage()
            }
        },
        addSerie(){
            console.log('click')
            this.exercise.series.push({ "reps": 0 })
            this.saveToLocalStorage()

        }
    },
    mounted(){
        const savedData = localStorage.getItem('exercises')
        if (savedData) {
            this.exercises = JSON.parse(savedData)
        } else {
            this.exercises = exercises.exercises
            this.saveToLocalStorage();
        }
        this.thisExercise = this.$route.params.id
        this.actualExercise(this.thisExercise)
    }
}
</script>

<template>
    <div v-if="isLoading">
        LOADING
    </div>
    <div v-else>
        <h1>{{  exercise.name }}</h1>
        <p>Description</p>
        <div>
            <span>N Serie: {{ exercise.series.length }}</span>
            <ul>
                <h4>REPS</h4>
                <li v-for="(n, i) in exercise.series" :key="i">
                    {{i + 1}} serie
                    <span @click="removeReps(i)">-</span>
                    reps:{{ n.reps }}
                    <span @click="addReps(i)">+</span>

                </li>
                <span @click="addSerie()">ADD Serie</span>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>