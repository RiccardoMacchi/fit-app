<script>
import { RouterLink } from "vue-router";

export default{
    name: 'Navbar'
}
</script>

<template>
    <div>
        <RouterLink :to="{name:'Home'}">
            <img src="../../../public/logo-fit-app.png" alt="Home">
        </RouterLink>
        <ul>
            <RouterLink :to="{name:'Home'}"><i class="fa-solid fa-layer-group"></i></RouterLink>
            <RouterLink :to="{name:'ChallengeList'}"><i class="fa-solid fa-bullseye"></i></RouterLink>
            <RouterLink :to="{name:'Diet'}"><i class="fa-solid fa-utensils"></i></RouterLink>
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
    ul{
        line-height: 60px;
        display: flex;
        margin: 0 10px;
        flex-grow: 1;
        justify-content: space-between;
        a{
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