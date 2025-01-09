<script>
import exerciseCards from '../data/data.json';
import { RouterLink } from "vue-router";

export default {
    name: 'ExerciseList',
    data(){
        return{
            exerciseCards: exerciseCards.exerciseCards,
            exerciseListName: '',
            exercises: [],
            isLoading: true,
            isAdded: false,
            isNotAdded: false,
            exName: '',
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
        }
    },
    mounted(){
        const savedData = localStorage.getItem('exerciseCards')
        if (savedData) {
            this.exerciseCards = JSON.parse(savedData)
        } else {
            this.exerciseCards = exerciseCards.exerciseCards
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
        <h1>{{ exerciseListName }}</h1>
        <div>
            <div class="search-bar">
                <input type="text" v-model="exName" placeholder="Aggiungi un nuovo esercizio">
                <span @click="addExercise()"><i class="fa-solid fa-plus"></i></span>
            </div>
            <h5 id="added" v-show="isAdded">Esercizio aggiunto!</h5>
            <h5 id="error" v-show="isNotAdded">Impossibile aggiungere l'esercizio!</h5>
        </div>
        <ul>
            <li v-for="(exercie, i) in exercises" :class="{ 'done' : checkAllDone(i) }">
                <RouterLink :to="{name:'Exercise', params:{id: exercie.name, listId: exerciseListName }}"> {{ exercie.name }} 
                </RouterLink>
                <span @click.stop="removeExercise(i)"><i class="fa-solid fa-trash"></i></span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
li{
    display: block;
    padding: 10px 5px;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 2px auto;
    display: flex;
    justify-content: space-between;
    a{
        text-decoration: none;
        color: white;
        flex-grow: 1;
    }
}

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