<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <div class="col-2">
          <Sidebar />
        </div>
        <div class="col-9">
          <router-view />
        </div>
      </div>
    </div>
    <Modal />
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    Modal,
  },
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
