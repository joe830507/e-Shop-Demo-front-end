<template>
  <div>
    <h1 class="animate__animated animate__backInDown welcomeTexts">Welcome to e-Shop.</h1>
  </div>
</template>
<script>
// import Chat from "../mixins/chat";
export default {
  // mixins: [Chat],
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.wholeItem {
  font-size: 90%;
}
.homeElement {
  background-color: rgb(0, 0, 0);
  height: 100px;
}
.subList {
  width: 13rem;
  height: 20rem;
  background-color: rgb(255, 255, 255);
}
.myBlock {
  background: rgb(255, 255, 255);
  height: 200px;
}
.messageBoard {
  width: 15%;
  height: 300px;
  overflow: scroll;
  background-color: rgb(156, 134, 134);
  position: fixed;
  right: 50px;
  bottom: 0;
  padding-left: 0px;
  padding-right: 0px;
  .topBar {
    height: 25px;
    width: 100%;
    background-color: rgb(187, 160, 160, 0.5);
    text-align: center;
    img {
      height: 15px;
      width: 15px;
      opacity: 0.5;
    }
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.welcomeTexts {
  text-align: center;
  margin-top: 21rem;
  font-size: 4rem;
  color: #351c75;
}
</style>