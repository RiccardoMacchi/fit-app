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
            <RouterLink :to="{name:'Home'}">Home</RouterLink>
            <RouterLink :to="{name:'Home'}">Alimentazione</RouterLink>
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