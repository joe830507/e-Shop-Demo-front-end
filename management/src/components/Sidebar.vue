<template>
  <div class="sidenav">
    <router-link
      v-for="route in $router.options.routes"
      :key="route"
      :to="{ name: route.name }"
      tag="a"
      >{{ route.chineseName }}</router-link
    >
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
};
</script>
<style lang="less" scoped>
/* Fixed sidenav, full height */
.sidenav {
  height: 100%;
  width: 14%;
  position: fixed;
  z-index: 1;
  left: 0;
  background-color: rgb(8, 14, 32);
  overflow-x: hidden;
  padding-top: 20px;
}

/* Style the sidenav links and the dropdown button */
.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
}

/* On mouse-over */
.sidenav a:hover {
  color: #f1f1f1;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>