<script>
import diet from '../data/data.json';

export default{
    name: 'Meal',
    data(){
        return{
            diet: diet.diet[0].cookbook,
            mealName: '',
            meal: {

            },
            isLoading: true,
            newDishName: '',
            newIngredient: '',
            newIngredients: [],
            newPreparation: '',


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
            this.newIngredients.push(this.newIngredient)
            this.newIngredient = ''
        },
        addDish(){
            let newDish = {
                name: this.newDishName,
                ingredients: this.newIngredients,
                preparation: this.newPreparation
            }
            for (let i = 0; i < this.diet.length; i++) {
                if(this.diet[i].name === this.mealName){
                    this.diet[i].dishes.push(newDish)
                    this.saveToLocalStorage()
                    this.newDishName = ''
                    this.newIngredients = []
                    this.newPreparation = ''
                }
            }
        }
    },
    mounted(){
        const savedData = localStorage.getItem('diet')
        if (savedData) {
            this.diet = JSON.parse(savedData)
            this.isLoading = false
        } else {
            this.diet = diet.diet[0].cookbook
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
        <h1>{{ mealName }}</h1>
        <div>
            <ul>
                <h4>Piatti a disposizione: {{ meal.dishes.length }}</h4>
                <li v-for="dish in meal.dishes">
                    <h3>
                        {{ dish.name }}
                    </h3>
                    <div class="ingredients">
                        <h5>Ingredienti:</h5>
                        <span v-for="ingredients in dish.ingredients">
                            {{ ingredients }}
                        </span>
                    </div>
                    <p><h5>Preparazione:</h5> {{ dish.preparation }}</p>
                </li>
            </ul>
        </div>
        <!-- <div>
            {{ meal }}
        </div> -->
        <div class="add-dish">
            <div>
                <label for="name">Nome piatto:</label>
                <input type="text" v-model="newDishName">
            </div>
            <div>
                <label for="ingredients">Ingredienti:</label>
                <input type="text" v-model="newIngredient">
                <button @click="addIngredients()">Aggiungi</button>
                <span>{{ newIngredients }}</span>
            </div>
            <div>
                <label for="prep">Preparazione:</label>
                <textarea name="prep" v-model="newPreparation"></textarea>
            </div>
            <button @click="addDish()">Aggiungi Piatto</button>
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
    span {
        display: inline-block;
        padding: 0.2em 0.6em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.375rem;
        background-color: #007bff;
        margin-right: 5px;
    }
}

.add-dish{
    textarea,
    input{
        width: 100%;
        padding: 5px;
    }
}

</style>