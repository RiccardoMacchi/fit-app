<script>
import data from '../data/data.json';

export default{
    name: 'Meal',
    data(){
        return{
            profileData: data.profile,
            diet: data.diet[0].cookbook,
            mealName: '',
            meal: {

            },
            isLoading: true,
            newDishName: '',
            newIngredient: '',
            newIngredients: [],
            newPreparation: '',
            isError: false,
            errorNewDish: false
        }
    },
    methods:{
        saveToLocalStorage() {
            localStorage.setItem('diet', JSON.stringify(this.diet))
        },
        actualMeal(id){
            this.diet.forEach(meal => {
                if(meal.name === id){
                    this.meal = meal
                }
            });
        },
        addIngredients(){
            if(this.newIngredient.trim() !== '' && !this.newIngredients.includes(this.newIngredient.trim())){
                this.newIngredients.push(this.newIngredient)
                this.newIngredient = ''
                this.isError = false
            } else{
                this.isError = true
            }
        },
        addDish(){
            let newDish = {
                name: this.newDishName,
                ingredients: this.newIngredients,
                preparation: this.newPreparation
            }
            if(this.newDishName.trim() !== ''){
                for (let i = 0; i < this.diet.length; i++) {
                    if(this.diet[i].name === this.mealName){
                        this.diet[i].dishes.push(newDish)
                        this.saveToLocalStorage()
                        this.newDishName = ''
                        this.newIngredients = []
                        this.newPreparation = ''
                        this.errorNewDish = false
                    }
                }
            } else{
                this.errorNewDish = true
            }
        },
        removeDish(i){
            for (let k = 0; k < this.diet.length; k++) {
                    if(this.diet[k].name === this.mealName){
                        this.diet[k].dishes.splice(i, 1)
                        this.saveToLocalStorage()
                    }
                }
        }
    },
    mounted(){
        const savedData = localStorage.getItem('diet')
        const profile = localStorage.getItem('profile')
        if (savedData) {
            this.diet = JSON.parse(savedData)
            this.profileData = JSON.parse(profile)

            this.isLoading = false
        } else {
            this.diet = data.diet[0].cookbook
            this.saveToLocalStorage();
            this.isLoading = false
        }
        console.log(this.diet[0])
        this.mealName = this.$route.params.id
        this.actualMeal(this.mealName)
    }
}
</script>

<template>
    <div v-if="isLoading">
        LOADING
    </div>
    <div v-else class="container">
        <div class="title">
            <h1 :class="profileData.data.color + '-text'">{{ mealName.toUpperCase() }}</h1>
            <div class="list-diet" :class="profileData.data.color + '-bg-linear'">
                <RouterLink :to="{name: 'Cookbook'}">
                    <i class="fa-solid fa-backward"></i>
                </RouterLink>
            </div>
        </div>
        <div>
            <ul>
                <h4>Piatti a disposizione: {{ meal.dishes.length }}</h4>
                <li v-for="(dish, i) in meal.dishes">
                    <div class="title-dish">
                        <div>
                            <i class="fa-solid fa-utensils"></i>
                            <h3>{{ dish.name }}</h3>
                        </div>
                        <span @click="removeDish(i)"><i class="fa-solid fa-trash"></i></span>
                    </div>
                    <div class="ingredients">
                        <h5>Ingredienti:</h5>
                        <span class="bedge" :class="profileData.data.color + '-bg-linear'"  v-for="ingredients in dish.ingredients">
                            {{ ingredients }}
                        </span>
                    </div>
                    <div>
                        <h5>Preparazione:</h5>
                        <p> {{ dish.preparation }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <div>
            {{ meal }}
        </div> -->
        <div class="add-dish">
            <div>
                <label for="name">Nome piatto:</label>
                <input class="input-name" id="name" type="text" v-model="newDishName" placeholder="Inserisci il nome del piatto">
            </div>
            <div>
                <label for="ingredients">Ingredienti:</label>
                <div class="search-bar">
                    <input type="text" id="ingredients" v-model="newIngredient" @keyup.enter="addIngredients()" placeholder="Inserisci e aggiungi ogni ingrediente">
                    <span class="add-ico" @click="addIngredients()"><i class="fa-solid fa-plus"></i></span>
                </div>
                <span class="bedge" :class="profileData.data.color + '-bg-linear'" v-for="ingredient in newIngredients">{{ ingredient }}</span>
                <h5 v-show="isError" class="error">Ingrediete già presente</h5>
            </div>
            <div>
                <label for="prep">Preparazione:</label>
                <textarea id="prep" rows="6" v-model="newPreparation" placeholder="Scrivi i passaggi per la preparazione"></textarea>
            </div>
            <div class="btn-add">
                <h5 v-show="errorNewDish" class="error">Aggiungi almeno il nome del piatto!</h5>
                <span :class="profileData.data.color + '-bg'" @click="addDish()">Aggiungi Piatto</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
li{
    list-style: none;
    margin: 10px auto;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 10px;
}
.bedge {
    display: inline-block;
    padding: 0.3em 0.8em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.375rem;
    margin-right: 5px;
}

.error{
    color: red;
    margin: 2px auto;
}
.title-dish{
    display: flex;
    justify-content: space-between;
    i{
        font-size: 1.5rem;
        color: #7e7e7e;
    }
    h3{
        display: inline-block;
        margin-left: 15px;
    }
}

.add-dish{
    textarea,
    .input-name{
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        background-color: #444;
        margin: 10px auto;
    }
    .btn-add{
        margin-top: 10px;
        text-align: right;
        span{
            padding: 5px 10px;
            border-radius: 5px;
        }
    }
}

.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px auto;
    .list-diet{
        text-align: center;
        border-radius: 5px;
        font-weight: 600;
        position: relative;
        padding: 20px 30px;
        a{
            color: black;
            text-decoration: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
}

</style>