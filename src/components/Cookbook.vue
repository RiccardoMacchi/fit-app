<script>
import data from '../data/data.json';

export default{
    name: 'Cookbook',
    data(){
        return{
            profileData: data.profile,
            diet: data.diet[0].cookbook,
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
        const profile = localStorage.getItem('profile')
        if (savedData) {
            this.profileData = JSON.parse(profile)
            this.diet = JSON.parse(savedData)
            this.isLoading = false
        } else {
            this.profileData = JSON.parse(profile)
            this.diet = data.diet[0].cookbook
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
        <h1 :class="profileData.data.color + '-text'">Ricettario</h1>
        <RouterLink :class="profileData.data.color + '-bg-line'" class="list-cookbook" v-for="cook in diet" :to="{ name: 'Meal', params:{id: cook.name}}">
            {{ cook.name }}
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.list-cookbook{
    display: inline-block;
    width: 100%;
    padding: 20px;
    text-align: center;
    margin: 3px auto;
    border-radius: 5px;
    text-decoration: none;
    color: black;
    font-weight: 600;
}

</style>