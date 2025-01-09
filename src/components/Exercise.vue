<script>
import data from '../data/data.json';
import Timer from './Timer.vue';

export default {
    name: 'Exercise',
    data(){
        return{
            profileData: data.profile,
            exerciseCards: data.exerciseCards,
            exerciseListDone:  [],
            thisExercise: '',
            thisExerciseList: '',
            exercise: {},
            prevExercise: {},
            nextExercise: {},
            isLoading: true,
            listId: null,
            noteEx : '',
            isSaved: false,
            isAlreadySaved: false,
            pauseValue: ''
        }
    },
    components:{
        Timer
    },
    methods:{
        actualEx(id, exName) {
            const list = this.exerciseCards.find(list => list.name === id)

            if (list) {
            const index = list.exercises.findIndex(ex => ex.name === exName)

            if (index !== -1) {
                this.exercise = { ...list.exercises[index] };
                this.prevExercise = index > 0 ? { ...list.exercises[index - 1] } : null
                this.nextExercise = index < list.exercises.length - 1 ? { ...list.exercises[index + 1] } : null
                this.isLoading = false
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
            this.exercise.series[i].done = !this.exercise.series[i].done
            this.saveToLocalStorage()
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
                
                const savedProfile = JSON.parse(localStorage.getItem('profile')) || { data: {}, exerciseListDone: [], challengeListDone: [] };
                savedProfile.exerciseListDone = this.exerciseListDone;
                localStorage.setItem('profile', JSON.stringify(savedProfile));
                this.isSaved = true
                this.isAlreadySaved = false

                const list = this.exerciseCards.find(list => list.name === this.thisExerciseList)

                console.log(list)
                list.exercises.forEach(ex => {
                    ex.series.forEach(serie =>{
                        serie.done = false
                    })
                });
            } else{
                console.log('già presente')
                this.isSaved = false
                this.isAlreadySaved = true

                const list = this.exerciseCards.find(list => list.name === this.thisExerciseList)
                console.log(list)
                list.exercises.forEach(ex => {
                    ex.series.forEach(serie =>{
                        serie.done = false
                    })
                });
            }
        },
        setPause(){
            this.exercise.pause = this.pauseValue
            const list = this.exerciseCards.find(list => list.name === this.thisExerciseList)
            if (list) {
                const index = list.exercises.findIndex(ex => ex.name === this.exercise.name)
                if (index !== -1) {
                    list.exercises[index].pause = this.pauseValue
                }
            }
            this.saveToLocalStorage()
            this.pauseValue = ''
        },
        modPause(){
            this.exercise.pause = ''
            const list = this.exerciseCards.find(list => list.name === this.thisExerciseList)
            if (list) {
                const index = list.exercises.findIndex(ex => ex.name === this.exercise.name)
                if (index !== -1) {
                    list.exercises[index].pause = this.pauseValue
                }
            }
            this.saveToLocalStorage()
            this.pauseValue = ''
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
            this.profileData = JSON.parse(savedProfile)
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
                <h1 :class="profileData.data.color + '-text'">{{  exercise.name.toUpperCase() }}</h1>
                <div class="timer">
                    <Timer :time="exercise.pause"/>
                </div>
                <div v-if="exercise.pause" class="pause-mod">
                    <h5>Pausa: {{ exercise.pause }}</h5>
                    <i class="fa-solid fa-pencil" :class="profileData.data.color" @click="modPause()"></i>
                </div>
                <div v-else class="pause-set">
                    <div class="set-bar">
                        <input type="text" placeholder="Tempo della pausa" @keypress.enter="setPause()" v-model="pauseValue">
                        <i class="fa-solid fa-stopwatch" :class="profileData.data.color" @click="setPause()"></i>
                    </div>
                    <span>Es: 2' 30''</span>
                </div>
            </div>
        </div>
        <div class="back-list">
            <RouterLink :class="profileData.data.color" :to="{name:'ExerciseList', params:{id: thisExerciseList}}">
                <i class="fa-solid fa-layer-group"></i>
            </RouterLink>
            <h3 class="serie-length">N° tot serie: {{ exercise.series.length }}</h3>
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
                <li @click.prevent="completeSerie(i)" class="ex-list" 
                :class="{'done' : n.done}"
                v-for="(n, i) in exercise.series" :key="i">
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
                    <span class="add-serie" :class="profileData.data.color + '-bg'" @click="addSerie()">Aggiungi Serie</span>
                    <div>
                        <input type="text" v-model="noteEx" placeholder="Note nuova serie">
                    </div>
                </div>
            </ul>
        </div>
        <div class="prev-next">
            <RouterLink v-if="prevExercise" :class="profileData.data.color" :to="{name:'Exercise', params:{id: prevExercise.name, listId: thisExerciseList }}">
                <i class="fa-solid fa-caret-left"></i>
            </RouterLink>
            <span v-else></span>
            <RouterLink v-if="nextExercise" :class="profileData.data.color" :to="{name:'Exercise', params:{id: nextExercise.name, listId: thisExerciseList }}">
                <i class="fa-solid fa-caret-right"></i>
            </RouterLink> 
            <span class="btn-complete" :class="profileData.data.color" v-else @click="completeScheda()"><i class="fa-regular fa-floppy-disk"></i></span>
        </div>
        <div class="is-saved">
            <h4 v-show="isSaved" class="saved">Scheda completata e salvata!!</h4>
            <h4 v-show="isAlreadySaved" class="already-saved">Scheda già salvata oggi!!</h4>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1{
    font-size: 2.5rem;
}
.header-ex{
    margin: 20px 0;
    text-align: center;

    .pause-mod{
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1.3rem;
        h5{
            display: inline-block;
        }
    }
    .pause-set{
        .set-bar {
            width: 70%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            border-radius: 4px;
            padding: 5px 10px;
            background-color: #303030;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            input[type="text"] {
                flex: 1;
                border: none;
                outline: none;
                padding: 5px;
                font-size: 1rem;
                background-color: #303030;
                width: 100%;
            }
            i {
                margin-left: 8px;
                font-size: 1.2rem;
            }
        }

        span{
            display: block;
            width: 70%;
            margin: 0 auto;
            text-align: left;
            font-size: 0.8rem;
            color: grey;
        }
    }
}
.back-list{
    display: flex;
    justify-content: space-between;

    a{
        background: linear-gradient(90deg, #cc3700, #d4523a, #d8653e);
        padding: 3px 15px;
        border-radius: 5px;
        text-decoration: none;
    }
}

ul{
    margin: 10px auto;
    border-top: 1px solid grey;
    h4{
        margin: 5px auto;
        font-size: 1.1rem;
    }
    li{
        list-style: none;
        padding: 2px 4px;
        margin: 2px auto;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 36px;

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
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
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

        i{
            font-size: 2.5rem;
        }
    }
    .btn-complete{
        font-size: 1rem;
        padding: 10px 25px;
        background-color: #3d3d3d;
        border-radius: 5px;
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