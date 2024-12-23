<script>
import diet from '../data/data.json';

export default{
    name: 'Cookbook',
    data(){
        return{
            diet: diet.diet[0].cookbook,
            isLoading: true
        }
    },
    methods:{
        saveToLocalStorage() {
            localStorage.setItem('diet', JSON.stringify(this.diet))
        },
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
    }
}
</script>

<template>
    <div v-if="isLoading">
        LOADING...
    </div>
    <div v-else class="container">
        <h1>Ricettario</h1>
        <div v-for="cook in diet">
            <RouterLink :to="{ name: 'Meal', params:{id: cook.name}}">
                {{ cook.name }}
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>