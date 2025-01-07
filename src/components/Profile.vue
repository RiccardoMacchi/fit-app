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
        };
    },
    methods: {
        saveProfileData() {
            const newProfileData = {
                data: {
                    username: this.profileUsername,
                    dateOfBirth: this.profileDateOfBirth,
                    weight: parseInt(this.profileWeight)
                },
                exerciseListDone: this.profileData.exerciseListDone,
                challengeListDone: this.profileData.challengeListDone

            };
            localStorage.setItem('profile', JSON.stringify(newProfileData))
            this.profileData = newProfileData
        },
        modProfileData(){
            const clearProfileData = {
                data : {},
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
            this.profileData = { data: {}, exerciseListDone: [], challengeListDone: [] };
        }

        this.isLoading = false;
    },
};
</script>

<template>
    <div v-if="isLoading">
        LOADING
    </div>
    <div v-else class="container">
        <h1>Profilo</h1>
        <div class="profile-info">
            <h2>Informazioni Personali</h2>
            <div class="img-profile">
                <img src="../../public/luna-mercurio-leone.webp" alt="">
            </div>
            <p v-if="profileData.data.username">Nome: <span>{{ profileData.data.username }}</span></p>
            <div v-else>
                <label for="name">Nome:</label>
                <input type="text" id="name" v-model="profileUsername">
            </div>
            <p v-if="profileData.data.dateOfBirth">Data di nascita: <span>{{ profileData.data.dateOfBirth }}</span></p>
            <div v-else>
                <label for="dateOfBirth">Data di nascita:</label>
                <input type="date" id="dateOfBirth" v-model="profileDateOfBirth">
            </div>
            <p v-if="profileData.data.weight">Peso: <span>{{ profileData.data.weight }}kg</span></p>
            <div v-else>
                <label for="weight">Peso:</label>
                <input type="number" step="0.1" id="weight" v-model="profileWeight">
            </div>
            <div class="btn-save-mod">
                <span v-if="!allData()" @click="saveProfileData()"><i class="fa-solid fa-cloud-arrow-up"></i></span>
                <span v-else @click="modProfileData()"><i class="fa-solid fa-pencil"></i></span>
            </div>
        </div>
        <h3>Monitora i tuoi progressi</h3>
        <div class="line"></div>
        <div v-if="profileData.exerciseListDone.length" class="list-ex-done">
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
        <div class="line"></div>
        <div v-if="profileData.challengeListDone.length" class="list-challenge-done">
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
            background: linear-gradient(135deg, #f7c788, #e89b42, #c55732);
            color: black;
            border-radius: 5px;
        }
    }
    .img-profile{
        margin: 5px;
        img{
            border-radius: 10px;
            width: 100%;
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
    text-transform: uppercase;
    background: linear-gradient(to right, gold 0%, darkgoldenrod 50%, rgb(40, 39, 39) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    margin: 15px auto;
}

.line{
    width: 60%;
    margin: 0 auto;
    background: linear-gradient(to left, gold 0%, darkgoldenrod 50%, rgb(40, 39, 39) 100%);
    height: 2px;
    margin: 20px auto;

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
