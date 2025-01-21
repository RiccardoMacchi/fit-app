<script>
import data from '../data/data.json';
import nameControll from '../functions/nameControll';
import { RouterLink } from "vue-router";

export default {
    name: 'ExerciseList',
    data(){
        return{
            profileData: data.profile,
            exerciseCards: data.exerciseCards,
            exerciseListName: '',
            exercises: [],
            isLoading: true,
            isAdded: false,
            isNotAdded: false,
            exName: '',
            changeName: [],
            newName: ''
            }
    },
    methods:{
        saveToLocalStorage() {
            localStorage.setItem('exerciseCards', JSON.stringify(this.exerciseCards))
        },
        addExercise(){
            const isPresent = this.exercises.some(exercise => exercise.name.toLowerCase().includes(this.exName.trim().toLowerCase()))
            if(this.exName.trim() !== '' && !isPresent){
                const newExercise = {
                        name: this.exName.trim(),
                        description: '',
                        pause: '',
                        series: [
                        { reps: 0 }
                    ],
                }
                this.exercises.push(newExercise)
                this.saveToLocalStorage();
                this.exName = ''
                this.isAdded = true
                this.isNotAdded = false
            } else{
                this.isAdded = false
                this.isNotAdded = true
                this.exName = ''

            }
        },
        removeExercise(i){
            console.log(i)
            this.exercises.splice(i, 1)
            this.saveToLocalStorage()

        },
        copyExercise(i){
            console.log(this.exercises[i])
            const newCopyEx = JSON.parse(JSON.stringify(this.exercises[i]))
            console.log('prima della funzione',newCopyEx.name)
            console.log(this.exercises)
            newCopyEx.name = nameControll(newCopyEx.name, this.exercises)
            console.log('dopo la funzione',newCopyEx.name)
            this.exercises.push(newCopyEx)
            this.saveToLocalStorage()
        },
        actualList(id){
            this.exerciseCards.forEach(list =>{
                if(list.name === id){
                    this.exercises = list.exercises
                }
            })
        },
        checkAllDone(i) {
            if (!this.exercises[i] || !this.exercises[i].series) {
                return false
            }
            return this.exercises[i].series.every(serie => serie.done)
        },
        modName(i){
            this.changeName.length = 0
            this.changeName.push(i)
            this.newName = this.exercises[i].name
        },
        confirmChangeName(i){
            console.log('start confirm')
            const isPresent = this.exercises.some(scheda => scheda.name.toLowerCase().includes(this.newName.trim().toLowerCase()))
            if(!isPresent){
                this.exercises[i].name = this.newName
                this.saveToLocalStorage()
                const indexToRemove = this.changeName.indexOf(i)
                this.changeName.splice(indexToRemove, 1)
                this.isAdded = true
                this.isNotAdded = false
            } else {
                this.isAdded = false
                this.isNotAdded = true
            }
        }
    },
    mounted(){
        const savedData = localStorage.getItem('exerciseCards')
        const profile = localStorage.getItem('profile')
        
        if (savedData) {
            this.profileData = JSON.parse(profile)
            this.exerciseCards = JSON.parse(savedData)
        } else {
            this.exerciseCards = data.exerciseCards
            this.saveToLocalStorage();
        }
        
        this.exerciseListName = this.$route.params.id
        this.actualList(this.exerciseListName)
        // this.checkAllDone()
    }

}
</script>

<template>
    <div class="container">
        <h1 :class="profileData.data.color + '-text'">{{ exerciseListName }}</h1>
        <div>
            <div class="search-bar">
                <input type="text" v-model="exName" placeholder="Aggiungi un nuovo esercizio">
                <span @click="addExercise()"><i class="fa-solid fa-plus"></i></span>
            </div>
            <h5 id="added" v-show="isAdded">Esercizio aggiunto!</h5>
            <h5 id="error" v-show="isNotAdded">Impossibile aggiungere l'esercizio!</h5>
        </div>
        <div class="line" :class="profileData.data.color + '-bg-line'"></div>
        <h3>I miei esercizi:</h3>
        <h4 class="right">Tot: {{ exercises.length }}</h4>
        <ul>
            <li v-for="(exercie, i) in exercises" :class="{ 'done' : checkAllDone(i) }">
                <RouterLink :to="{name:'Exercise', params:{id: exercie.name, listId: exerciseListName }}">
                    <div class="list-el">
                        <span v-if="!changeName.includes(i)" @click.stop.prevent="modName(i)">
                            {{ exercie.name }}
                        </span>
                        <div v-else class="input-container">
                            <input type="text" v-model="newName" @click.stop.prevent @keyup.enter="confirmChangeName(i)">
                            <i class="fa-solid fa-check" @click.stop.prevent="confirmChangeName(i)"></i>
                        </div>
                        <div>
                            <div class="icon-container" @click.stop.prevent="copyExercise(i)"><i class="fa-solid fa-copy" :class="profileData.data.color"></i></div>
                            <div class="icon-container" @click.stop.prevent="removeExercise(i)"><i class="fa-solid fa-trash"></i></div>
                        </div>
                    </div>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

h5{
    padding-left: 10px;
    &#added{
        color: green;
    }
    &#error{
        color: red;
    }
}
</style>