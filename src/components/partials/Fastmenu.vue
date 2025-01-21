<script>
import data from '../../data/data.json';

export default{
    name: 'Fastmenu',
    data(){
        return{
            openMenu: false,
            profileData: {},
            progress: 50
        }
    },
    methods:{
        menuShow(){
            this.openMenu = !this.openMenu
            this.levelUp()
        },
        levelUp(){
            const total = this.profileData.exerciseListDone.length + this.profileData.challengeListDone.length
            console.log('totale: ', total)
            switch (true) {
                case total > 40:
                    this.profileData.data.level = 5
                    this.progress = 100;
                    break;
                case total >= 30:
                    this.profileData.data.level = 4
                    this.progress = ((total - 30) / 10) * 100;
                    break;
                case total >= 20:
                    this.profileData.data.level = 3
                    this.progress = ((total - 20) / 10) * 100;
                    break;
                case total >= 10:
                    this.profileData.data.level = 2
                    this.progress = ((total - 10) / 10) * 100;
                    break;
                case total >= 5:
                    this.profileData.data.level = 1
                    this.progress = ((total - 5) / 5) * 100;
                    break;
                default:
                    this.profileData.data.level = 1
                    this.progress = (total / 5) * 100
                    break;
            }
            console.log('progress: ',this.progress)
            localStorage.setItem('profile', JSON.stringify(this.profileData))
        },
        updateLevel(){
            console.log('prima', this.profileData)
            this.profileData = JSON.parse(localStorage.getItem('profile'))
            console.log('dopo', this.profileData)
            this.levelUp()

        }
    },
    mounted() {
        const profile = localStorage.getItem('profile');
        if (profile) {
            this.profileData = JSON.parse(profile)
        } else {
            this.profileData = { ...data.profile }
        }
        // this.profileData.data.level = 5
        console.log(this.profileData)
        this.isLoading = false;
    },
}
</script>

<template>
    <div id="opend-menu" :class="{ open: openMenu }" @click="menuShow()">
        <div v-if="!openMenu">
            <h6>Powered by ReM</h6>
        </div>
        <div v-else id="info-wrapper"> 
            <!-- parte sinistra img + level -->
            <div class="wrap-left">
                <div class="img-thumb">
                    <img :src="`/images/level-${profileData.data.level}-${profileData.data.style}.avif`" alt="">
                </div>
                <div class="level">
                    <i class="fa-solid fa-star" v-if="profileData.data.level" v-for="star in profileData.data.level"
                    :class="{
                        'bronzo': profileData.data.level === 1,
                        'argento': profileData.data.level === 2,
                        'oro': profileData.data.level === 3,
                        'zaffiro': profileData.data.level === 4,
                        'rubino': profileData.data.level === 5
                    }"></i>
                </div>
            </div>
            <!-- parte destra info + timer? -->
            <div class="wrap-right">
                <ul>
                    <li>
                        <h4 :class="profileData.data.color + '-text'">{{ profileData.data.username }}</h4>
                    </li>
                    <li>
                        <span><i class="fa-solid fa-dumbbell"></i> Esercizi</span>
                        <span>{{ profileData.exerciseListDone.length }}</span>
                    </li>
                    <li>
                        <span><i class="fa-solid fa-bullseye"></i> Challenge</span>
                        <span>{{ profileData.challengeListDone.length }}</span>
                    </li>
                </ul>
                <div class="progress-bar">
                    <div class="update-level-progress">
                        <h5>Al prossimo livello:</h5>
                        <span @click.stop.prevent="updateLevel()"><i class="fa-solid fa-rotate" :class="profileData.data.color"></i></span>
                    </div>
                    <div class="progress-container">
                        <div class="progress" :class="[
                            `percent-${progress}`,
                            `${profileData.data.color}-bg`
                        ]"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

#opend-menu {
    text-align: center;
    height: 10px;
    background-color: #000;
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 0;
    overflow: hidden;
    transition: height 1s ease;
    z-index: 1000;

    &.open {
        height: 150px;
    }

    i{
        font-size: 0.8rem;
    }

    h6 {
        font-family: 'Roboto', sans-serif;
        color: #fff;
        margin: 0;
        line-height: 1;
        letter-spacing: 1px;
        font-size: 0.5rem;
        font-weight: 400;
        opacity: 0.8;
    }
    #info-wrapper{
        width: 90%;
        margin: 15px auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .wrap-left{
            flex-wrap: 0;
            .img-thumb{
                width: 80px;
                img{
                    border-radius: 10px;
                    width: 100%;
                    aspect-ratio: 1/1;
                    object-fit: cover;
                    object-position: top;
                }
            }
        }
        .wrap-right{
            flex-grow: 1;
            padding-left: 10px;

            ul{
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    h4{
                     font-size: 1.4rem;   
                    }
                }
            }

            // Progress bar
            .progress-bar {
                width: 100%; /* Adatta alla larghezza del contenitore */
                margin: 5px 0;
                text-align: left;

                .update-level-progress{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 4px;

                    i{
                        padding: 4px;
                        background: #3d3d3d;
                        border-radius: 5px;
                    }
                }

                .progress-container {
                    width: 100%;
                    height: 10px;
                    background-color: #e0e0e0; /* Sfondo barra */
                    border-radius: 10px;
                    overflow: hidden; /* Impedisce che il contenuto esca dai bordi */
                }

                .progress {
                    height: 100%;
                    // background-color: #4caf50; /* Colore barra di progresso */
                    transition: width 0.5s ease; /* Transizione fluida per aggiornamenti */
                }

                /* Classi per incrementi del 10% */
                .percent-0 { width: 0%; }
                .percent-10 { width: 10%; }
                .percent-20 { width: 20%; }
                .percent-30 { width: 30%; }
                .percent-40 { width: 40%; }
                .percent-50 { width: 50%; }
                .percent-60 { width: 60%; }
                .percent-70 { width: 70%; }
                .percent-80 { width: 80%; }
                .percent-90 { width: 90%; }
                .percent-100 { width: 100%; }
            }


        }
    }
}
</style>
