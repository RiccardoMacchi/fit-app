<script>
import data from '../data/data.json';
import nameControll from '../functions/nameControll.js';

export default {
    name: 'Home',
    data(){
        return{
            profileData : data.profile,
            exerciseCards: data.exerciseCards,
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
            console.log(this.exerciseCards)
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
        },
        copyScheda(i){
            console.log(this.exerciseCards[i])
            const newCopyEx = JSON.parse(JSON.stringify(this.exerciseCards[i]))
            console.log('prima della funzione',newCopyEx.name)
            newCopyEx.name = this.startNameControll(newCopyEx.name)
            console.log('dopo la funzione',newCopyEx.name)
            this.exerciseCards.push(newCopyEx)
            this.saveToLocalStorage()
        },
        startNameControll(name){
            const arrayName = name.split(" ")
            
            console.log(arrayName)
            const regex = /^([a-zA-Z]+)(\d+)$/; // Dividi in due parti: lettere e numeri
            const match = arrayName[arrayName.length - 1].match(regex);

            if (match) {
                const word = match[1]; // Prima parte (alfabetica)
                if(word === "copia"){
                    arrayName.splice(arrayName.length - 1, 1)
                    let number = parseInt(match[2]); // Seconda parte (numerica)
                    let newName = arrayName.join(" ") + " " + word + ++number
                    let isPresent = this.exerciseCards.some(scheda => scheda.name.toLowerCase().includes(newName.trim().toLowerCase()))
                    if(isPresent){
                    do{
                        const newArrayName = newName.split(" ")
                        const newMatch = newArrayName[newArrayName.length - 1].match(regex)
                        let newNumber = parseInt(newMatch[2])
                        newArrayName.splice(newArrayName.length - 1, 1)
                        newName = newArrayName.join(" ") + " " + word + ++newNumber
                        isPresent = this.exerciseCards.some(scheda => scheda.name.toLowerCase().includes(newName.trim().toLowerCase()))
                    } while(isPresent)
                        return newName;
                    } else{
                        return newName;
                    }
                }
            } else {
                console.log('non ancora + copia1');
                return name + " copia1"
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
            this.exerciseCards = exerciseCards.exerciseCards
            this.saveToLocalStorage();
        }
    }

}
</script>

<template>
    <div class="container">
        <h1 :class="profileData.data.color + '-text'">Le mie Schede</h1>
        <div>
            <div class="search-bar">
                <input type="text" v-model="schedaName" placeholder="Aggiungi una nuova scheda">
                <span @click="addScheda()"><i class="fa-solid fa-plus"></i></span>
            </div>
            <h5 id="added" v-show="isAdded">Scheda aggiunta!</h5>
            <h5 id="error" v-show="isNotAdded">Impossibile aggiungere la scheda!</h5>
        </div>
        <h4>Tot schede: {{ exerciseCards.length }}</h4>
        <ul>
            <li  v-for="(card, i) in exerciseCards">
                <RouterLink :to="{name:'ExerciseList', params:{id: card.name}}"> {{ card.name }}</RouterLink>
                <div>
                    <span @click.stop="copyScheda(i)"><i class="fa-solid fa-copy" :class="profileData.data.color"></i></span>
                    <span @click.stop="removeScheda(i)"><i class="fa-solid fa-trash"></i></span>
                </div>
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
</style>