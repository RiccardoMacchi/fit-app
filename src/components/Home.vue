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
            changeName: [],
            newName: ''
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
            newCopyEx.name = nameControll(newCopyEx.name, this.exerciseCards)
            console.log('dopo la funzione',newCopyEx.name)
            this.exerciseCards.push(newCopyEx)
            this.saveToLocalStorage()
        },
        modName(i){
            this.changeName.length = 0
            this.changeName.push(i)
            this.newName = this.exerciseCards[i].name
        },
        confirmChangeName(i){
            console.log('start confirm')
            const isPresent = this.exerciseCards.some(scheda => scheda.name.toLowerCase().includes(this.newName.trim().toLowerCase()))
            if(!isPresent){
                this.exerciseCards[i].name = this.newName
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
    }

}
</script>

<template>
    <div class="container">
        <h1 :class="profileData.data.color + '-text'">SCHEDE</h1>
        <div>
            <!-- <h2 :class="profileData.data.color + '-text'">Aggiungi scheda</h2> -->
            <div class="search-bar">
                <input type="text" v-model="schedaName" placeholder="Aggiungi una nuova scheda">
                <span @click="addScheda()"><i class="fa-solid fa-plus"></i></span>
            </div>
            <h5 id="added" v-show="isAdded">Scheda aggiunta!</h5>
            <h5 id="error" v-show="isNotAdded">Impossibile aggiungere la scheda!</h5>
        </div>
        <div class="line" :class="profileData.data.color + '-bg-line'"></div>
        <h3>Le mie schede:</h3>
        <h4 class="right">Tot: {{ exerciseCards.length }}</h4>
        <ul>
            <li  v-for="(card, i) in exerciseCards">
                <RouterLink :to="{name:'ExerciseList', params:{id: card.name}}">
                    <div class="list-el">
                        <span v-if="!changeName.includes(i)" @click.stop.prevent="modName(i)">
                            {{ card.name }}
                        </span>
                        <div v-else class="input-container">
                            <input type="text" v-model="newName" @click.stop.prevent @keyup.enter="confirmChangeName(i)">
                            <i class="fa-solid fa-check" @click.stop.prevent="confirmChangeName(i)"></i>
                        </div>
                        <div>
                            <div class="icon-container" @click.stop.prevent="copyScheda(i)"><i class="fa-solid fa-copy" :class="profileData.data.color"></i></div>
                            <div class="icon-container" @click.stop.prevent="removeScheda(i)"><i class="fa-solid fa-trash"></i></div>
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