<script>
import exercises from '../data/data.json';
import { RouterLink } from "vue-router";

export default {
    name: 'Home',
    data(){
        return{
            exercises: exercises.exercises,
            isLoading: true,
            isAdded: false,
            isNotAdded: false,
            exName: '',
            }
    },
    methods:{
        saveToLocalStorage() {
            localStorage.setItem('exercises', JSON.stringify(this.exercises))
        },
        addExercise(){
            const isPresent = this.exercises.some(exercise => exercise.name.includes(this.exName.trim().toLowerCase()))
            if(this.exName.trim() !== '' && !isPresent){
                const newExercise = {
                        name: this.exName.trim(),
                        description: '',
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
    }

}
</script>

<template>
    <div class="container">
        <h1>Lista Esercizi</h1>
        <div>
            <div class="search-bar">
                <input type="text" v-model="exName">
                <span @click="addExercise()"><i class="fa-solid fa-plus"></i></span>
            </div>
            <h5 id="added" v-show="isAdded">Esercizio aggiunto!</h5>
            <h5 id="error" v-show="isNotAdded">Impossibile aggiungere l'esercizio!</h5>
        </div>
        <ul>
            <RouterLink v-for="exercie in exercises" :to="{name:'Exercise', params:{id: exercie.name}}"> {{ exercie.name }}</RouterLink>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
a{
    display: block;
    text-decoration: none;
    color: white;
    padding: 10px 5px;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 2px auto;
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

.search-bar{
    margin: 10px auto;
    display: flex;
    justify-content: flex-start;
    input{
        padding: 5px;
        flex-grow: 1;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: #444;
    }

    span{
        padding: 5px 10px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: #248f3b;
    }
}
</style>