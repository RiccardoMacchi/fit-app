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
            schedaName: '',
            }
    },
    methods:{
        saveToLocalStorage() {
            localStorage.setItem('exerciseCards', JSON.stringify(this.exerciseCards))
        },
        addScheda(){
            const isPresent = this.exerciseCards.some(scheda => scheda.name.toLowerCase().includes(this.schedaName.trim().toLowerCase()))
            if(this.schedaName.trim() !== '' && !isPresent){
                const newScheda = {
                        name: this.schedaName.trim(),
                        description: '',
                        exercises: []
                }
                this.exerciseCards.push(newScheda)
                this.saveToLocalStorage()
                this.schedaName = ''
                this.isAdded = true
                this.isNotAdded = false
            } else{
                this.isAdded = false
                this.isNotAdded = true
                this.schedaName = ''
            }
        },
        removeScheda(i){
            this.exerciseCards.splice(i, 1)
            this.saveToLocalStorage()
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
                <input type="text" v-model="schedaName">
                <span @click="addScheda()"><i class="fa-solid fa-plus"></i></span>
            </div>
            <h5 id="added" v-show="isAdded">Scheda aggiunta!</h5>
            <h5 id="error" v-show="isNotAdded">Impossibile aggiungere la scheda!</h5>
        </div>
        <h4>Tot schede: {{ exerciseCards.length }}</h4>
        <ul>
            <li  v-for="(card, i) in exerciseCards">
                <RouterLink :to="{name:'ExerciseList', params:{id: card.name}}"> {{ card.name }}</RouterLink>
                <span @click.stop="removeScheda(i)"><i class="fa-solid fa-trash"></i></span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
li{
    list-style: none;
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