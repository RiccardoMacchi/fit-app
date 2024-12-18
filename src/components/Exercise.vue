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
        <div class="header-ex">
            <h1>{{  exercise.name.toUpperCase() }}</h1>
            <Timer/>
        </div>
        <h3>N totale di serie: {{ exercise.series.length }}</h3>
        <div>
            <div>
                <h5>Descrizione</h5>
                <p>{{ exercise.description }}</p>
            </div>
            <ul>
                <h4>REPS</h4>
                <li v-for="(n, i) in exercise.series" :key="i">
                    <span @click="removeSerie(i)">
                        {{i + 1}}° serie
                    </span>
                    <div>
                        <span @click="removeReps(i)"><i class="fa-solid fa-minus"></i></span>
                        {{ n.reps >= 0 ? n.reps : n.duration_seconds }}
                        <span @click="addReps(i)"><i class="fa-solid fa-plus"></i></span>
                    </div>

                </li>
                <span class="add-serie" @click="addSerie()">Aggiungi Serie</span>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-ex{
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

}

ul{
    margin: 10px auto;
    border-top: 1px solid grey;
    li{
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 36px;
    }
}

.add-serie{
    float: right;
    margin-top: 15px;
    margin-right: 10px;
    display: inline-block;
    border-radius: 5px;
    padding: 8px 25px;
    background-color: gold;
    color: black;
}
</style>