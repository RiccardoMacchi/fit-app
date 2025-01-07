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
        <div class="title">
            <h1>{{ mealName.toUpperCase() }}</h1>
            <div class="list-diet">
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
                        <span class="bedge" v-for="ingredients in dish.ingredients">
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
                <input class="input-name" type="text" v-model="newDishName" placeholder="Nome nuovo piatto">
            </div>
            <div>
                <label for="ingredients">Ingredienti:</label>
                <div class="search-bar">
                    <input type="text" v-model="newIngredient" @keyup.enter="addIngredients()" placeholder="Inserisci e aggiungi ogni igrediente">
                    <span class="add-ico" @click="addIngredients()"><i class="fa-solid fa-plus"></i></span>
                </div>
                <span class="bedge" v-for="ingredient in newIngredients">{{ ingredient }}</span>
                <h5 v-show="isError" class="error">Ingrediete già presente</h5>
            </div>
            <div>
                <label for="prep">Preparazione:</label>
                <textarea name="prep" rows="6" v-model="newPreparation" placeholder="Scrivi i passaggi per la preparazione"></textarea>
            </div>
            <div class="btn-add">
                <h5 v-show="errorNewDish" class="error">Aggiungi almeno il nome del piatto!</h5>
                <span @click="addDish()">Aggiungi Piatto</span>
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
    background: linear-gradient(135deg, #f5a962, #ea9f25, #d36b44);
    color: black;
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
            background-color: #2bb62b;
            color: black;
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

        .add-ico{
            padding: 5px 10px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: #248f3b;
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
        background: linear-gradient(135deg, #f7c788, #e89b42, #c55732);
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