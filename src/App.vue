<script setup>
import Navbar from './components/partials/Navbar.vue';
import Fastmenu from './components/partials/Fastmenu.vue';
</script>

<template>
  <Fastmenu />
  <section>
    <RouterView/>
  </section>
  <Navbar/>
</template>

<style lang="scss" scoped>
  section{
    // padding: 60px 0px;
    height: calc(100vh - 70px);
    overflow-y: scroll;
  }
</style>
