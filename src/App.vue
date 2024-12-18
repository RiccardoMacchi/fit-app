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

</style>
