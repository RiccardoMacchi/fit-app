<script setup>
import Navbar from './components/partials/Navbar.vue';
import Footer from './components/partials/Footer.vue';
</script>

<template>
  <Navbar/>
  <section>
    <RouterView/>
  </section>
  <Footer />
</template>

<style lang="scss" scoped>
  section{
    padding: 60px 0px;
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
</style>
