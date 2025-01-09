<script>
import data from '../data/data.json';

export default{
    name: 'Diet',
    data(){
        return{
            profileData: data.profile,
        }
    },
    methods:{
        saveToLocalStorage() {
            localStorage.setItem('diet', JSON.stringify(this.diet))
        },
    },
    mounted(){
        const profile = localStorage.getItem('profile')
        if (profile) {
            this.profileData = JSON.parse(profile)
            this.isLoading = false
        } else {
            this.profileData = JSON.parse(profile)
            this.saveToLocalStorage();
            this.isLoading = false
        }
    }
}
</script>

<template>
    <div class="container">
        <h1 :class="profileData.data.color + '-text'">Alimentazione</h1>
        <div class="list-diet" :class="profileData.data.color + '-bg-line'">
            <RouterLink :to="{name: 'Cookbook'}">
                <h2>Ricettario</h2>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.list-diet{
    // background: linear-gradient(135deg, #f5a962, #ea9f25, #d36b44);
    border-radius: 10px;
    text-align: center;
    padding: 25px 10px;

    a{
        text-decoration: none;
        color: #000000;
    }
}

</style>