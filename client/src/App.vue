<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <router-view />
        </div>
      </div>
    </div>
    <Modal />
    <Loading :hidden="displayLoading" />
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Loading from "./components/Loading";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Navbar,
    Modal,
    Loading
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
