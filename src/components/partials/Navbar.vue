<script>
import { RouterLink } from "vue-router";

export default{
    name: 'Navbar'
}
</script>

<template>
    <div>
        <ul>
            <RouterLink :to="{name:'Home'}">Home</RouterLink>
            <RouterLink :to="{name:'Home'}">Alimentazione</RouterLink>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
div{
    height: 70px;

    ul{
        line-height: 70px;
        display: flex;
        justify-content: space-evenly;
        a{
            text-decoration: none;
        }
    }
}
</style>