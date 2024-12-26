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
            <div class="challenge-list" v-if="challenges.length">
                <RouterLink  v-for="challenge in challenges" :to="{name: 'Challenge', params:{id: challenge.name}}">
                        <h3>{{ challenge.name }}</h3>
                        <span><i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i> {{ challenge.duration - challenge.dayDone.length }}gg</span>
                </RouterLink>
            </div>
            <h4 v-else>Aggiungi subito delle challenge</h4>
        </div>
        <div>
            <form action="">
                <h2>Aggiungi una nuova Challenge</h2>
                <div>
                    <label for="">Nome Challenge:</label>
                    <input type="text" v-model="newChallengeName">
                </div>
                <div>
                    <label for="">Durata in gg:</label>
                    <input type="number" v-model="newChallengeDuration">
                </div>
                <div>
                    <label for="">Regole:</label>
                    <textarea name="" rows="4" id="" v-model="newChallengeRules"></textarea>
                </div>
                <div class="wrap-add">
                    <span class="add-challenge" @click="addChallenge()">Aggiungi</span>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.challenge-list{

    a{
        display: block;
        text-decoration: none;
        color: white;
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        border: 1px solid grey;
        padding: 10px 5px;
        &:first-child{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        &:last-child{
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        i{
            color: greenyellow;
        }
    }
}

form{
    margin-top: 20px;
    input,
    textarea{
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        background-color: #444;
    }
    .wrap-add{
        text-align: right;
        margin-top: 10px;
        .add-challenge{
            border-radius: 5px;
            padding: 8px 25px;
            background-color: gold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            color: black;
        }
    }
}
</style>