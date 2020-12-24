<template>
  <nav class="navbar navbar-expand-lg navbar-expand myNavbar">
    <router-link class="navbar-brand" :to="{name:'Home'}">
      <img
        class="myLogo rounded"
        alt="Vue logo"
        src="../assets/a23e9968-7011-436e-b498-092ecbdf4252_200x200.png"
      />
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibileNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="collapsibileNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link navText" :to="{name:'Home'}">首頁</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link navText" :to="{name:'Home'}">購物車</router-link>
        </li>
        <li class="nav-item">
          <span class="nav-link navText" data-toggle="modal" data-target="#Login" v-if="!isLogin">登入</span>
        </li>
        <li class="nav-item">
          <span
            class="nav-link navText"
            data-toggle="modal"
            data-target="#Register"
            v-if="!isLogin"
          >註冊</span>
        </li>
        <li class="nav-item">
          <span class="nav-link navText" v-if="isLogin" @click="custLogout">登出</span>
        </li>
      </ul>
    </div>
  </nav>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >產品分類</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-for="x in productTypes" :key="x">{{ x }}</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      modalShow: false
    };
  },
  created() {
    this.fetchProductTypes();
  },
  methods: {
    ...mapActions(["fetchProductTypes", "custLogout"])
  }
};
</script>
<style lang="less" scoped>
.myNavbar {
  height: 70px;
  background-color: rgb(0, 0, 0);
  .myLogo {
    width: 5rem;
    height: 5rem;
    position: relative;
    z-index: 1;
    margin-left: 10rem;
  }
  #collapsibileNavbar {
    ul {
      margin-right: 10rem !important;
      .navText {
        color: rgb(255, 255, 255);
      }
      .navText:hover {
        color: rgb(226, 216, 216);
      }
    }
  }
}
</style>