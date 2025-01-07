<script>
import data from '../data/data.json';
import Timer from './Timer.vue';

export default {
    name: 'Exercise',
    data(){
        return{
            exerciseCards: data.exerciseCards,
            exerciseListDone:  [],
            thisExercise: '',
            thisExerciseList: '',
            exercise: {},
            prevExercise: {},
            nextExercise: {},
            isLoading: true,
            listId: null,
            selectedSeriesIndices: [],
            noteEx : '',
            isSaved: false,
            isAlreadySaved: false
        }
    },
    components:{
        Timer
    },
    methods:{
        actualEx(id, exName) {
            const list = this.exerciseCards.find(list => list.name === id);

            if (list) {
            const index = list.exercises.findIndex(ex => ex.name === exName);

            if (index !== -1) {
                this.exercise = { ...list.exercises[index] };
                this.prevExercise = index > 0 ? { ...list.exercises[index - 1] } : null;
                this.nextExercise = index < list.exercises.length - 1 ? { ...list.exercises[index + 1] } : null;
                this.isLoading = false;
            }
        }
        },

        saveToLocalStorage() {
            localStorage.setItem('exerciseCards', JSON.stringify(this.exerciseCards))
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
        completeScheda(){
            const newDate = new Date()
            const formattedDate = newDate.toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            if(!this.exerciseListDone.some( el => el.name === this.thisExerciseList && el.date === formattedDate)){
                const newExDone = {
                    name: this.thisExerciseList,
                    date: formattedDate
                }
                this.exerciseListDone.push(newExDone)
                
                const savedProfile = JSON.parse(localStorage.getItem('profile')) || { data: {}, exerciseListDone: [] };
                savedProfile.exerciseListDone = this.exerciseListDone;
                localStorage.setItem('profile', JSON.stringify(savedProfile));
                this.isSaved = true
                this.isAlreadySaved = false
            } else{
                console.log('già presente')
                this.isSaved = false
                this.isAlreadySaved = true
            }
        }
    },
    mounted(){
        const savedData = localStorage.getItem('exerciseCards')
        if (savedData) {
            this.exerciseCards = JSON.parse(savedData)
        } else {
            this.exerciseCards = data.exerciseCards
            this.saveToLocalStorage();
        }

        const savedProfile = localStorage.getItem('profile');
        if (savedProfile) {
            this.exerciseListDone = JSON.parse(savedProfile).exerciseListDone;
        } else {
            this.exerciseListDone = [];
        }

        this.thisExercise = this.$route.params.id
        this.thisExerciseList = this.$route.params.listId
        this.actualEx(this.thisExerciseList, this.thisExercise)
    },
    watch: {
        '$route.params': {
            handler(newParams) {
                this.thisExercise = newParams.id;
                this.thisExerciseList = newParams.listId;
                this.actualEx(this.thisExerciseList, this.thisExercise);
            },
            immediate: true,
        },
    },
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
        <div class="back-list">
            <RouterLink :to="{name:'ExerciseList', params:{id: thisExerciseList}}">
                <i class="fa-solid fa-layer-group"></i>
            </RouterLink>
            <h3 class="serie-length">N totale di serie: {{ exercise.series.length }}</h3>
        </div>
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
        <div class="prev-next">
            <RouterLink v-if="prevExercise" :to="{name:'Exercise', params:{id: prevExercise.name, listId: thisExerciseList }}">
                <i class="fa-solid fa-caret-left"></i>
            </RouterLink>
            <span v-else></span>
            <RouterLink v-if="nextExercise" :to="{name:'Exercise', params:{id: nextExercise.name, listId: thisExerciseList }}">
                <i class="fa-solid fa-caret-right"></i>
            </RouterLink> 
            <span class="btn-complete" v-else @click="completeScheda()"><i class="fa-regular fa-floppy-disk"></i></span>
        </div>
        <div class="is-saved">
            <h4 v-show="isSaved" class="saved">Scheda completata e salvata!!</h4>
            <h4 v-show="isAlreadySaved" class="already-saved">Scheda già salvata oggi!!</h4>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1{
    font-size: 1.8rem;
}
.header-ex{
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.back-list{
    display: flex;
    justify-content: space-between;

    a{
        background: linear-gradient(90deg, #cc3700, #d4523a, #d8653e);
        padding: 3px 15px;
        border-radius: 5px;
        color: gold;
        text-decoration: none;
    }
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
            font-size: 0.7rem;
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
                display: inline-block;
                text-align: center;
                width: 25px;
            }
        }
    }
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

.prev-next{
    display: flex;
    justify-content: space-between;
    align-items: center;
    a{
        background-color: #3d3d3d;
        padding: 2px 12px;
        border-radius: 5px;
        color: gold;

        i{
            font-size: 2.5rem;
        }
    }
    .btn-complete{
        font-size: 1rem;
        padding: 10px 25px;
        background-color: #3d3d3d;
        border-radius: 5px;
        color: gold;
    }
}
.is-saved{
    text-align: center;
    margin-top: 10px;

    .saved{
        color: green;
    }

    .already-saved{
        color: red;
    }
}

</style>