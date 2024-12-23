<script>
import exerciseCards from '../data/data.json';

export default {
    name: 'Home',
    data(){
        return{
            exerciseCards: exerciseCards.exerciseCards,
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
        addScheda(){
            const isPresent = this.exerciseCards.some(scheda => scheda.name.includes(this.exName.trim().toLowerCase()))
            if(this.exName.trim() !== '' && !isPresent){
                const newExercise = {
                        name: this.exName.trim(),
                        description: '',
                        series: [
                        { reps: 0 }
                    ],
                }
                this.exerciseCards.push(newExercise)
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
        const savedData = localStorage.getItem('exerciseCards')
        if (savedData) {
            this.exerciseCards = JSON.parse(savedData)
        } else {
            this.exerciseCards = exerciseCards.exerciseCards
            this.saveToLocalStorage();
        }
    }

}
</script>

<template>
    <div class="container">
        <h1>Le mie Schede</h1>
        <div>
            <div class="search-bar">
                <input type="text" v-model="exName">
                <span @click="addScheda()"><i class="fa-solid fa-plus"></i></span>
            </div>
            <h5 id="added" v-show="isAdded">Esercizio aggiunto!</h5>
            <h5 id="error" v-show="isNotAdded">Impossibile aggiungere l'esercizio!</h5>
        </div>
        <h4>Tot schede: {{ exerciseCards.length }}</h4>
        <ul>
            <RouterLink v-for="card in exerciseCards" :to="{name:'ExerciseList', params:{id: card.name}}"> {{ card.name }}</RouterLink>
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

h4{
    text-align: right;
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