<template>
  <div id="app">
    <Navbar></Navbar>

    <div class="container mt-5 mb-5">
      <router-view />
    </div>

    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";
// import Footer from "./components/footer/Footer.vue";

export default {
  components: {
    Navbar
    // Footer
  }
};
</script>

<style scoped>
/* #app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
} */
</style>

