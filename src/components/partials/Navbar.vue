<script>
import { RouterLink } from "vue-router";
import data from '../../data/data.json';


export default{
    name: 'Navbar',
    data(){
        return{
            profileData: {},
            isLoading: true
        }
    },
    mounted() {
        const profile = localStorage.getItem('profile')

        if (profile) {
            this.profileData = JSON.parse(profile)
        } else {
            this.profileData = data.profile
            localStorage.setItem('profile', JSON.stringify(this.profileData))
        }
        console.log('Dati caricati:', this.profileData);
        this.isLoading = false;
    }

}
</script>

<template>
    <div v-if="isLoading">
        LOADING
    </div>
    <div v-else>
        <RouterLink :to="{name:'Profile'}">
            <img src="../../../public/logo-fit-app.png" alt="Home">
        </RouterLink>
        <ul>
            <RouterLink :to="{name:'Home'}"><i class="fa-solid fa-dumbbell" :class="profileData.data.color"></i></RouterLink>
            <RouterLink :to="{name:'ChallengeList'}"><i class="fa-solid fa-bullseye" :class="profileData.data.color"></i></RouterLink>
            <RouterLink :to="{name:'Diet'}"><i class="fa-solid fa-utensils" :class="profileData.data.color"></i></RouterLink>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
div{
    height: 60px;
    background-color: #333;
    position: fixed;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    z-index: 1000;
    ul{
        line-height: 60px;
        display: flex;
        margin: 0 10px;
        flex-grow: 1;
        justify-content: space-between;
        text-align: center;
        a{
            flex-grow: 1;
            font-size: 1.4rem;
            text-decoration: none;
            color: gold;
        }
    }
    a{
        height: inherit;
        img{
            height: 100%;
        }
    }

}
</style>