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
            selectedSeriesIndices: [],
            noteEx : '',
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
            // console.log(this.exerciseCards)
            localStorage.setItem('exerciseCards', JSON.stringify(this.exerciseCards))
            // console.log(this.exerciseCards)

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
            }
            if (this.exercise.series[i].duration_seconds > 0) {
                this.exercise.series[i].duration_seconds--
            }
            this.saveToLocalStorage() 
        },
        addSerie(){
            console.log('click')
            this.exercise.series.push({ "reps": 0, "notes" : this.noteEx })
            this.saveToLocalStorage()
            this.noteEx = ''
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
        <h3 class="serie-length">N totale di serie: {{ exercise.series.length }}</h3>
        <div>
            <!-- <div>
                <h5>Descrizione</h5>
                <p>{{ exercise.description }}</p>
            </div> -->
            <div v-if="exercise.notes">
                <b>INFO:</b>
                <p>{{ exercise.notes }}</p>
            </div>
            <ul>
                <h4>SERIE E N° RIPETIZIONI</h4>
                <li @click.prevent="completeSerie(i)" class="ex-list" :class="{'done': selectedSeriesIndices.includes(i)}" v-for="(n, i) in exercise.series" :key="i">
                    <div>
                        <i class="fa-solid fa-trash" @click.stop="removeSerie(i)"></i>
                        <span>
                            {{i + 1}}° serie
                        </span>
                    </div>
                    <span class="info">{{ n.notes }}</span>
                    <div class="reps">
                        <span @click.stop="removeReps(i)"><i class="fa-solid fa-minus"></i></span>
                        <span class="n-reps">{{ n.reps >= 0 ? n.reps : n.duration_seconds }}</span>
                        <span @click.stop="addReps(i)"><i class="fa-solid fa-plus"></i></span>
                    </div>

                </li>
                <div class="add-wrapper-serie">
                    <span class="add-serie" @click="addSerie()">Aggiungi Serie</span>
                    <div>
                        <input type="text" v-model="noteEx" placeholder="Note nuova serie">
                    </div>
                </div>
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

        .fa-solid.fa-trash{
            margin-right: 3px;
            background: linear-gradient(90deg, #ff4500, #ff6347, #ff7f50);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .reps{
            font-size: 1.3rem;
            .fa-solid.fa-minus{
                color: yellowgreen;
                padding: 5px;
                background: #3d3d3d;
                border-radius: 5px;
            }
            .fa-solid.fa-plus{
                color: #ff4500;
                padding: 5px;
                background: #3d3d3d;
                border-radius: 5px;
            }
            .n-reps{
                margin: 0px 5px;
            }
        }
    }
}
.serie-length{
    text-align: right;
}
.add-wrapper-serie{
    text-align: right;
    margin-right: 10px;
    margin-top: 15px;
    .add-serie{
        display: inline-block;
        border-radius: 5px;
        padding: 8px 25px;
        background-color: gold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        color: black;
    }
    div{
        text-align: right;
        input{
            margin-top: 5px;
            padding: 3px;
            border-radius: 5px;
        }
    }
}

</style>