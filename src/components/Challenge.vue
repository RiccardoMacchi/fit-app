<script>
import challenges from '../data/data.json';

export default{
    name: 'Challenge',
    data(){
        return{
            challengeName: '',
            challenges: challenges.challenges,
            challenge: {

            },
            challengeDayDone: [],
            isCheating: false,
            isLoading: true,
        }
    },
    methods:{
        saveToLocalStorage() {
            localStorage.setItem('challenges', JSON.stringify(this.challenges))
        },
        actualChallenge(id){
            this.challenges.forEach(challenge => {
                if(challenge.name === id){
                    this.challenge = challenge
                    this.challengeDayDone = challenge.dayDone
                    this.isLoading = false
                }
            });
        },
        completeDay(i){
            if(i - this.challengeDayDone[this.challengeDayDone.length - 1] === 1 || i - this.challengeDayDone[this.challengeDayDone.length - 1] === 0 || this.challengeDayDone.length === 0){
                if(!this.challengeDayDone.includes(i)){
                    this.challengeDayDone.push(i)
                    this.challenge.dayDone = this.challengeDayDone
                    this.saveToLocalStorage()
                    this.isCheating = false
                } else {
                    const indexToRemove = this.challengeDayDone.indexOf(i)
                    this.challengeDayDone.splice(indexToRemove, 1)
                    this.challenge.dayDone = this.challengeDayDone
                    this.saveToLocalStorage()
                    this.isCheating = false
                }
            } else {
                console.log('non si saltano i giorni')
                this.isCheating = true
            }
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
        this.challengeName = this.$route.params.id
        this.actualChallenge(this.challengeName)
    }
}
</script>

<template>
    <div v-if="isLoading">
        LOADING
    </div>
    <div v-else class="container">
        <h1>Challenge: {{ challenge.name }}</h1>
        <div>
            <h4>Regole della Challenge:</h4>
            <p>{{ challenge.rules }}</p>
        </div>
        <h5 v-show="isCheating" class="error">Non si saltano i giorni!!</h5>
        <div class="wrap-counter">
            <div @click="completeDay(i)" class="counter" v-for="i in challenge.duration" :class="challengeDayDone.includes(i) ? 'done' : ''">
                <span v-html="challengeDayDone.includes(i) ? '<i class=\'fa-solid fa-star\'></i>' : i"></span>
            </div>
        </div>
        <div class="challenge-complete" v-if="challengeDayDone.length === challenge.duration">
            <h5>Challenge completata</h5>
            <RouterLink :to="{name: 'ChallengeList'}">Torna alle Challenges</RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrap-counter{
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    .counter{
        flex: 0 0 calc(100% / 5 - (80px / 5));
        aspect-ratio: 1/1;
        background-color: rgb(173, 173, 173);
        position: relative;
        span{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
    
    .done{
        background-color: green;
        span{
            background: linear-gradient(45deg, #ffd700, #ffc107, #ff8c00);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        }
    }
}
.challenge-complete{
    position: absolute;
    background: linear-gradient(45deg, #ffd700, #ffc107, #ff8c00);
    color: black;
    padding: 30px;
    width: 80%;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    border: 3px solid black;
    a{
        color: black;
        text-decoration: none;
    }
}

.error{
    color: red;
    text-align: center;
}
</style>