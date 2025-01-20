<script>
import data from '../data/data.json';

export default{
    name: 'ChallengeList',
    data(){
        return{
            profileData: data.profile,
            challenges : data.challenges,
            newChallengeName: '',
            newChallengeRules: '',
            newChallengeDuration: 0,
            isLoading: true
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
                dayDone: [],
                attempts: 0
            }
            this.challenges.push(newChallenge)
            this.saveToLocalStorage()
        },
        repeatChallenge(i){
            console.log(this.challenges[i])
            this.challenges[i].dayDone.length = 0
            this.saveToLocalStorage()

        }
    },
    mounted(){
        const savedData = localStorage.getItem('challenges')
        const profile = localStorage.getItem('profile')
        if (savedData) {
            this.profileData = JSON.parse(profile)
            this.challenges = JSON.parse(savedData)
        } else {
            this.challenges = data.challenges
            this.profileData = data.profile
            this.saveToLocalStorage();
        }
        console.log(this.profileData)
        this.isLoading = false
    }
}
</script>

<template>
    <div v-if="isLoading">
        LOADING...
    </div>
    <div v-else class="container">
        <h1 :class="profileData.data.color + '-text'">Challengesss</h1>
        <div>
            <div class="challenge-list" v-if="challenges.length">
                <RouterLink  v-for="(challenge, i) in challenges" :to="{name: 'Challenge', params:{id: challenge.name}}">
                        <h3>{{ challenge.name }}</h3>
                        <div v-if="challenge.duration - challenge.dayDone.length">
                            <span><i class="fa-solid fa-person-walking-dashed-line-arrow-right" :class="profileData.data.color"></i> <span class="day-left">{{ challenge.duration - challenge.dayDone.length }}gg</span></span>
                        </div>
                        <div v-else class="challenge-complete">
                            <span class="complete-word">COMPLETATA </span>
                            <i class="fa-solid fa-fire"></i>
                            <span class="wrap-repit">
                                <i class="fa-solid fa-rotate-right" @click.prevent="repeatChallenge(i)"></i>
                            </span>
                        </div>
                </RouterLink>
            </div>
            <h4 v-else>Aggiungi subito delle challenge</h4>
        </div>
        <div>
            <form action="">
                <h2>Aggiungi una nuova Challenge</h2>
                <div>
                    <label for="name">Nome Challenge:</label>
                    <input type="text" id="name" v-model="newChallengeName">
                </div>
                <div>
                    <label for="duration">Durata in gg:</label>
                    <input type="number" id="duration" v-model="newChallengeDuration">
                </div>
                <div>
                    <label for="rules">Regole:</label>
                    <textarea rows="4" id="rules" v-model="newChallengeRules"></textarea>
                </div>
                <div class="wrap-add">
                    <span class="add-challenge" :class="profileData.data.color + '-bg'" @click="addChallenge()">Aggiungi</span>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.challenge-list{
    .challenge-complete{
        color: green;
        font-weight: 600;
        .complete-word{
            font-size: 0.8rem;
        }
        i{
            font-weight: bold;
            background: linear-gradient(to right, yellow, orange, red);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-right: 5px;
            &.fa-solid.fa-rotate-right{
                margin-left: 3px;
            }
        }
        .wrap-repit{
            background-color: #3d3d3d;
            padding: 4px 3px;
            border-radius: 50%;
        }

    }
    a{
        display: block;
        text-decoration: none;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    }
    .day-left{
        display: inline-block;
        width: 40px;
        text-align: right;
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
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }
    }
}
</style>