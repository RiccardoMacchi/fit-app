<script>
import challenges from '../data/data.json';

export default{
    name: 'ChallengeList',
    data(){
        return{
            challenges : challenges.challenges,
            newChallengeName: '',
            newChallengeRules: '',
            newChallengeDuration: 0,
        }
    },
    methods:{
        saveToLocalStorage() {
            localStorage.setItem('challenges', JSON.stringify(this.challenges))
        },
        addChallenge(){
            const newChallenge = {
                name : this.newChallengeName,
                duration : this.newChallengeDuration,
                rules : this.newChallengeRules,
                dayDone: []
            }
            this.challenges.push(newChallenge)
            this.saveToLocalStorage();
        }
    },
    mounted(){
        const savedData = localStorage.getItem('challenges')
        if (savedData) {
            this.challenges = JSON.parse(savedData)
        } else {
            this.challenges = challenges.challenges
            this.saveToLocalStorage();
        }
    }
}
</script>

<template>
    <div class="container">
        <h1>Challengesss</h1>
        <div>
            <ul v-if="challenges.length">
                <li v-for="challenge in challenges">
                    <RouterLink :to="{name: 'Challenge', params:{id: challenge.name}}">{{ challenge.name }}</RouterLink>
                    <span>Giorni mancanti: {{ challenge.duration - challenge.dayDone.length }}gg</span>
                </li>
            </ul>
            <h4 v-else>Aggiungi subito delle challenge</h4>
        </div>
        <div>
            <form action="">
                <div>
                    <label for="">Nome nuova Challenge:</label>
                    <input type="text" v-model="newChallengeName">
                </div>
                <div>
                    <label for="">Durata in gg:</label>
                    <input type="number" v-model="newChallengeDuration">
                </div>
                <div>
                    <label for="">Regole:</label>
                    <textarea name="" id="" v-model="newChallengeRules"></textarea>
                </div>
                <span @click="addChallenge()">Aggiungi</span>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>

form{
    input,
    textarea{
        width: 100%;
    }
}
</style>