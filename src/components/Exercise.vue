<script>
import exerciseCards from '../data/data.json';
import Timer from './Timer.vue';

export default {
    name: 'Exercise',
    data(){
        return{
            exerciseCards: exerciseCards.exerciseCards,
            thisExercise: '',
            thisExerciseList: '',
            exercise: {},
            isLoading: true,
            listId: null,
            selectedSeriesIndices: []
        }
    },
    components:{
        Timer
    },
    methods:{
        actualEx(id, exName) {
            const list = this.exerciseCards.find(list => list.name === id);

            if (list) {
                const exercise = list.exercises.find(ex => ex.name === exName);
                
                if (exercise) {
                    this.exercise = { ...exercise };
                    this.isLoading = false;
                }
            }
        },

        saveToLocalStorage() {
            console.log(this.exerciseCards)
            localStorage.setItem('exerciseCards', JSON.stringify(this.exerciseCards))
            console.log(this.exerciseCards)

        },
        addReps(i) {
            if(this.exercise.series[i].reps >= 0){
                this.exercise.series[i].reps++
                console.log(this.exercise.series[i].reps)
            } else {
                this.exercise.series[i].duration_seconds++
            }
            
            this.saveToLocalStorage()
        },
        removeReps(i) {
            if (this.exercise.series[i].reps > 0) {
                this.exercise.series[i].reps--
            }
            if (this.exercise.series[i].duration_seconds > 0) {
                this.exercise.series[i].duration_seconds--
            }
            this.saveToLocalStorage() 
        },
        addSerie(){
            console.log('click')
            this.exercise.series.push({ "reps": 0 })
            this.saveToLocalStorage()
        },
        removeSerie(i){
            this.exercise.series.splice(i,1)
            this.saveToLocalStorage()
        },
        completeSerie(i) {
        const index = this.selectedSeriesIndices.indexOf(i)
        if (index === -1) {
            this.selectedSeriesIndices.push(i)
        } else {
            this.selectedSeriesIndices.splice(index, 1)
        }
    },
    },
    mounted(){
        const savedData = localStorage.getItem('exerciseCards')
        if (savedData) {
            this.exerciseCards = JSON.parse(savedData)
        } else {
            this.exerciseCards = exerciseCards.exerciseCards
            this.saveToLocalStorage();
        }
        this.thisExercise = this.$route.params.id
        this.thisExerciseList = this.$route.params.listId
        this.actualEx(this.thisExerciseList, this.thisExercise)
    }
}
</script>

<template>
    <div v-if="isLoading">
        LOADING
    </div>
    <div class="container" v-else>
        <div class="header-ex">
            <div>
                <h1>{{  exercise.name.toUpperCase() }}</h1>
                <h5>Pausa: {{ exercise.pause }}</h5>
            </div>

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
                <li @click.prevent="completeSerie(i)" class="ex-list" :class="{'done': selectedSeriesIndices.includes(i)}" v-for="(n, i) in exercise.series" :key="i">
                    <span @click.stop="removeSerie(i)">
                        {{i + 1}}° serie
                    </span>
                    <span class="info">{{ n.notes }}</span>
                    <div>
                        <span @click.stop="removeReps(i)"><i class="fa-solid fa-minus"></i></span>
                        {{ n.reps >= 0 ? n.reps : n.duration_seconds }}
                        <span @click.stop="addReps(i)"><i class="fa-solid fa-plus"></i></span>
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
        padding: 2px 4px;
        margin: 1.5px auto;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 36px;
        &.done{
            background-color: green;
        }

        .info{
            font-size: 0.8rem;
        }
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