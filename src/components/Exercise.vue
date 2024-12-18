<script>
import exercises from '../data/data.json';
import Timer from './Timer.vue';

export default {
    name: 'Exercise',
    data(){
        return{
            exercises: exercises.exercises,
            thisExercise: '',
            exercise: {
            },
            isLoading: true,
        }
    },
    components:{
        Timer
    },
    methods:{
        actualExercise(id){
            this.exercises.forEach(ex => {
                if(ex.name === id){
                    this.exercise = ex
                    this.isLoading = false
                    console.log(this.exercises)
                }
            });
        },
        saveToLocalStorage() {
            localStorage.setItem('exercises', JSON.stringify(this.exercises))
        },
        addReps(i) {
            if(this.exercise.series[i].reps >= 0){
                this.exercise.series[i].reps++
            } else {
                this.exercise.series[i].duration_seconds++
            }
            this.saveToLocalStorage()
        },
        removeReps(i) {
            if (this.exercise.series[i].reps > 0) {
                this.exercise.series[i].reps--
                this.saveToLocalStorage()
            }
            if (this.exercise.series[i].duration_seconds > 0) {
                this.exercise.series[i].duration_seconds--
                this.saveToLocalStorage()
            }
        },
        addSerie(){
            console.log('click')
            this.exercise.series.push({ "reps": 0 })
            this.saveToLocalStorage()
        },
        removeSerie(i){
            this.exercise.series.splice(i,1)
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
    <div class="container" v-else>
        <div>
            <h1>{{  exercise.name }}</h1>
            <Timer/>
        </div>
        <p>Description</p>
        <div>
            <span>N di serie: {{ exercise.series.length }}</span>
            <ul>
                <h4>REPS</h4>
                <li v-for="(n, i) in exercise.series" :key="i">
                    <span @click="removeSerie(i)">
                        {{i + 1}} serie
                    </span>
                    <span @click="removeReps(i)">-</span>
                    reps:{{ n.reps ? n.reps : n.duration_seconds }}
                    <span @click="addReps(i)">+</span>

                </li>
                <span @click="addSerie()">ADD Serie</span>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>