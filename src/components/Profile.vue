<script>
import data from '../data/data.json';

export default {
    name: 'Profile',
    data() {
        return {
            profileData: {},
            modify: false,
            isLoading: true,
            profileUsername: '',
            profileDateOfBirth: null,
            profileWeight: null,
            selectColor: '',
            colors: [
                'yellow',
                'green',
                'purple',
                'blue',
                'red'
            ],
            styles:[
                'cartoon',
                'anime',
                'colors'
            ]
        };
    },
    methods: {
        saveProfileData() {
            const newProfileData = {
                data: {
                    username: this.profileUsername,
                    dateOfBirth: this.profileDateOfBirth,
                    weight: parseFloat(this.profileWeight),
                    level: 1,
                    color: this.profileData.data.color ? this.profileData.data.color : this.colors[0],
                    style: this.profileData.data.style ? this.profileData.data.style : this.styles[0]
                },
                exerciseListDone: this.profileData.exerciseListDone,
                challengeListDone: this.profileData.challengeListDone

            };
            localStorage.setItem('profile', JSON.stringify(newProfileData))
            this.profileData = newProfileData
        },
        modProfileData(){
            const clearProfileData = {
                data : {
                    username: '',
                    dateOfBirth: '',
                    weight: null,
                    level: 1,
                    color: this.profileData.data.color ? this.profileData.data.color : this.colors[0],
                    style: this.profileData.data.style ? this.profileData.data.style : this.styles[0]
                },
                exerciseListDone: this.profileData.exerciseListDone,
                challengeListDone: this.profileData.challengeListDone
            }
            localStorage.setItem('profile', JSON.stringify(clearProfileData))
            this.profileData = clearProfileData
        },
        allData() {
            if (!this.profileData || !this.profileData.data) {
                console.log('Dati non disponibili.')
                return false
            }

            const { username, dateOfBirth, weight } = this.profileData.data
            const isUsernameValid = username?.trim() !== ''
            const isDateOfBirthValid = dateOfBirth?.trim() !== ''
            const isWeightValid = weight !== null && weight !== undefined

            return isUsernameValid && isDateOfBirthValid && isWeightValid
        },
        levelUp(){
             // console.log(this.profileData.exerciseListDone)
           // console.log(this.profileData.challengeListDone)
            const total = this.profileData.exerciseListDone.length + this.profileData.challengeListDone.length
            switch (true) {
                case total > 40:
                    this.profileData.data.level = 5
                    break;
                case total >= 30:
                    this.profileData.data.level = 4
                    break;
                case total >= 20:
                    this.profileData.data.level = 3
                    break;
                case total >= 10:
                    this.profileData.data.level = 2
                    break;
                case total >= 5:
                    this.profileData.data.level = 1
                    break;
                default:
                    this.profileData.data.level = 1
                    break;
            }
            console.log(this.profileData.data.level)
            localStorage.setItem('profile', JSON.stringify(this.profileData))
        },
        changeColor(color){
            this.profileData.data.color = color
            localStorage.setItem('profile', JSON.stringify(this.profileData))
            window.location.reload();
        },
        changeStyle(style){
            this.profileData.data.style = style
            localStorage.setItem('profile', JSON.stringify(this.profileData))
            window.location.reload();
        }

    },
    mounted() {
        const profile = localStorage.getItem('profile');
        if (profile) {
            this.profileData = JSON.parse(profile)
            this.profileUsername = this.profileData.data.username
            this.profileDateOfBirth = this.profileData.data.dateOfBirth
            this.profileWeight = this.profileData.data.weight
        } else {
            this.profileData = data.profile.data
        }
        this.levelUp()
        this.profileData.data.level = 1
        console.log(this.profileData.data.level)
        this.isLoading = false;
    },
};
</script>

<template>
    <div v-if="isLoading">
        LOADING
    </div>
    <div v-else class="container">
        <h1 :class="profileData.data.color + '-text'">Profilo</h1>
        <div class="profile-info">
            <h2>Informazioni Personali</h2>
            <div class="img-profile">
                <img :src="`/images/level-${profileData.data.level}-${profileData.data.style}.avif`" alt="">
            </div>
            <div>
                <p>Livello: <span><i class="fa-solid fa-star" v-if="profileData.data.level" v-for="star in profileData.data.level"
                    :class="{
                        'bronzo': profileData.data.level === 1,
                        'argento': profileData.data.level === 2,
                        'oro': profileData.data.level === 3,
                        'zaffiro': profileData.data.level === 4,
                        'rubino': profileData.data.level === 5
                    }"></i>
                    <i v-else class="fa-solid fa-star wood"></i>
                </span>
                </p>
            </div>
            <p v-if="profileData.data.username">Username: <span>{{ profileData.data.username }}</span></p>
            <div v-else>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="profileUsername" placeholder="Inserisci il tuo Username">
            </div>
            <p v-if="profileData.data.dateOfBirth">Data di nascita: <span>{{ profileData.data.dateOfBirth }}</span></p>
            <div v-else>
                <label for="dateOfBirth">Data di nascita:</label>
                <input type="date" id="dateOfBirth" v-model="profileDateOfBirth">
            </div>
            <p v-if="profileData.data.weight">Peso: <span>{{ profileData.data.weight }}kg</span></p>
            <div v-else>
                <label for="weight">Peso:</label>
                <input type="number" step="0.1" id="weight" v-model="profileWeight" placeholder="Inserisci il tuo peso in kg">
            </div>
            <div class="btn-save-mod">
                <span v-if="!allData()" @click="saveProfileData()" :class="profileData.data.color + '-bg-linear'"><i class="fa-solid fa-cloud-arrow-up"></i></span>
                <span v-else @click="modProfileData()" :class="profileData.data.color + '-bg-linear'"><i class="fa-solid fa-pencil"></i></span>
            </div>
            <div class="line" :class="profileData.data.color + '-bg-line'"></div>
            <div>
                <h4 class="mod-title" :class="profileData.data.color + '-text'">Modifica lo stile:</h4>
            </div>
            <div class="colors">
                <div class="color-options">
                    <h4>Colore:</h4>
                    <div 
                        v-for="color in colors" 
                        :key="color" 
                        class="color-dot"
                        :class="{
                            [color + '-bg']: true,
                            selected: color === profileData.data.color
                            }"
                            @click="changeColor(color)">
                    </div>
                </div>
            </div>
            <div class="styles">
                <div class="style-options">
                    <h4>Stili:</h4>
                    <div 
                        v-for="style in styles" 
                        :key="style"
                        class="style-dot"
                        :class="{
                            selected: style === profileData.data.style
                            }"
                        @click="changeStyle(style)">
                        <span v-if="style === 'colors'"><i class="fa-solid fa-yin-yang" :class="profileData.data.color + '-text'"></i></span>
                        <span v-else-if="style === 'anime'"><i class="fa-solid fa-dragon" :class="profileData.data.color + '-text'"></i></span>
                        <span v-else-if="style === 'cartoon'"><i class="fa-brands fa-fort-awesome" :class="profileData.data.color + '-text'"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <h3 :class="profileData.data.color + '-text'">Monitora i tuoi progressi</h3>
        <div class="line" :class="profileData.data.color + '-bg-line'"></div>
        <div v-if="profileData.exerciseListDone && profileData.exerciseListDone.length" class="list-ex-done">
            <h2>Lista Esercizi Completati</h2>
            <ul>
                <li><h5>Nome Scheda:</h5><h5>Data:</h5></li>
                <li v-for="(exercise, index) in profileData.exerciseListDone" :key="index">
                    {{ exercise.name }} <span>{{ exercise.date }}</span>
                </li>
            </ul>
        </div>
        <div class="no-list" v-else>
            <h5>Ancora nessuna scheda completata</h5>
        </div>
        <div class="line" :class="profileData.data.color + '-bg-line'"></div>
        <div v-if="profileData.challengeListDone && profileData.challengeListDone.length" class="list-challenge-done">
            <h2>Lista Challenge Completate</h2>
            <ul>
                <li><h5>Nome Scheda:</h5><h5>Data:</h5></li>
                <li v-for="(challenge, index) in profileData.challengeListDone" :key="index">
                    {{ challenge.name }} <span>{{ challenge.date }}</span>
                </li>
            </ul>
        </div>
        <div class="no-list" v-else>
            <h5>Ancora nessuna challenge completata</h5>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile-info{

    input{
        width: 100%;
        padding: 5px;
        border-radius: 10px;
        background-color: #444;
    }
    .btn-save-mod{
        text-align: right;
        margin-top: 10px;

        span{
            padding: 5px 15px;
            color: black;
            border-radius: 5px;
        }
    }
    .img-profile{
        margin: 5px;
        img{
            border-radius: 10px;
            width: 100%;
            aspect-ratio: 1/1;
            object-fit: cover;
            object-position: top;
        }
    }
}
p{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    font-weight: 600;
}

h3{
    font-weight: bold;
    font-size: 1.5rem;
    text-transform: uppercase;
    text-align: center;
    margin: 15px auto;
}

.mod-title{
    font-size: 1.4rem;
    margin-top: 20px;
}

.colors {
    margin: 10px auto;
    .color-options {
        display: flex;
        gap: 10px;
    }

    .color-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid transparent;
        transition: transform 0.2s, border 0.2s;
    }

    .color-dot:hover {
        transform: scale(1.2);
    }

    .color-dot.selected {
        border: 2px solid #a0a0a0;
    }
}

.styles {
    margin: 10px auto;
    .style-options {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .style-dot {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid transparent;
        transition: transform 0.2s, border 0.2s;
        position: relative;

        span{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }

    .selected {
        border: 2px solid #a0a0a0;
    }
}

.list-challenge-done,
.list-ex-done{
    li{
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid grey;
        padding: 4px;
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
    h2{
        font-size: 1.4rem;
    }
}
.no-list{
    h5{
        text-align: center;
        color: red;
        margin: 20px auto;
    }
}

</style>
