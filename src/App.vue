<template>
  <div>
    <Navbar />
    <router-view class="mt-5" />
    <Modal />
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
export default {
  name: "App",
  components: {
    Navbar,
    Modal
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
