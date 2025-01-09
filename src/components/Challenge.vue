<script>
import data from '../data/data.json';

export default{
    name: 'Challenge',
    data(){
        return{
            challengeName: '',
            challenges: data.challenges,
            challengeDone: data.profile.challengeListDone,
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
            // console.log(this.challengeDayDone.length)
            if(i - this.challengeDayDone[this.challengeDayDone.length - 1] === 1 || i - this.challengeDayDone[this.challengeDayDone.length - 1] === 0 || (!this.challengeDayDone.length && i === 1)){
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

                if(this.challengeDayDone.length === this.challenge.duration){
                    const newDate = new Date()
                    const formattedDate = newDate.toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
                    if(!this.challengeDone.some(el => el.name === this.challenge.name && el.date === formattedDate)){
                        const newChalDone = {
                            name: this.challenge.name,
                            date: formattedDate
                        }
                        this.challengeDone.push(newChalDone)
                        console.log('pushed')
                        const savedProfile = JSON.parse(localStorage.getItem('profile')) || { data: {}, exerciseListDone: [], challengeListDone: []  }
                        savedProfile.challengeListDone.push(newChalDone)
                        localStorage.setItem('profile', JSON.stringify(savedProfile))
                    }
                }
            } else {
                console.log('non si saltano i giorni')
                this.isCheating = true
            }
        },
        repeatChallenge(){
            this.challengeDayDone.length = 0
            this.challenge.dayDone = this.challengeDayDone
            this.challenge.attempts++
            this.saveToLocalStorage()
        }
    },
    mounted(){
        const savedData = localStorage.getItem('challenges')
        if (savedData) {
            this.challenges = JSON.parse(savedData)
        } else {
            this.challenges = data.challenges
            this.profileData = data.profile.challengeListDone
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
        <div v-if="challenge.attempts">
            <span>Completata: {{ challenge.attempts }}</span>
        </div>
        <div class="challenge-complete" v-if="challengeDayDone.length === challenge.duration">
            <h5>Challenge completata!</h5>
            <div class="btns">
                <RouterLink :to="{name: 'ChallengeList'}">Torna alle Challenges <i class="fa-solid fa-arrow-left"></i></RouterLink>
                <span @click="repeatChallenge()">Ripeti challenge<i class="fa-solid fa-rotate-right"></i></span>
            </div>
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
    width: 90%;
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
    h5{
        margin-bottom: 10px;
        font-size: 1.3rem;
    }

    .btns{
        a,
        span{
            display: block;
            background-color: orange;
            border-radius: 5px;
            border: 1px solid black;
            margin-bottom: 5px;
        }
        i{
            margin-left: 5px;
        }
    }
}

.error{
    color: red;
    text-align: center;
}
</style>