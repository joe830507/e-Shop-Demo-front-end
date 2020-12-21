<template>
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
          >
            Product
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a
              class="dropdown-item"
              href="#"
              v-for="x in productTypes"
              :key="x"
              >{{ x }}</a
            >
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      productTypes: [],
    };
  },
  created() {
    const sss = this.digestMessage("jackson123");
    sss.then((res) => {
      console.log(res);
      console.log(btoa(res));
    });
  },
  methods: {
    getInfo() {
      this.$http.send("/home", "GET").then((res) => {
        this.productTypes = res;
      });
    },
    async digestMessage(message) {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    },
  },
};
</script>

<style>
</style>