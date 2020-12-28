<template>
  <div class="mt-5 ml-3">
    <router-link :to="{name:'SupplierTable'}" class="btn btn-success" tag="button">返回</router-link>
    <div class="mt-5 supplier_update_form">
      <div class="input-group input-group-lg">
        <span class="input-group-text">供應商名稱</span>
        <input
          v-model="supplier.name"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入供應商名稱"
        />
      </div>
      <br />
      <div class="input-group input-group-lg">
        <span class="input-group-text">供應商電話</span>
        <input
          v-model="supplier.phone"
          type="phone"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入供應商的電話"
        />
      </div>
      <br />
      <div class="input-group input-group-lg">
        <span class="input-group-text">供應商電子郵件</span>
        <input
          v-model="supplier.email"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入供應商電子郵件"
        />
      </div>
      <button class="btn btn-primary float-right mt-3" @click="send">送出</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      supplier: {
        id: null,
        name: null,
        phone: null,
        email: null,
        createTime: null
      }
    };
  },
  created() {
    if (this.$route.params.supplier) {
      this.supplier = Object.assign({}, this.$route.params.supplier);
      sessionStorage.setItem("supplier", JSON.stringify(this.supplier));
    } else {
      this.supplier = JSON.parse(sessionStorage.getItem("supplier"));
    }
  },
  methods: {
    ...mapActions(["updateSupplier"]),
    send() {
      const data = Object.assign({}, this.supplier);
      if (this.validatePhone(data.phone) && this.validateName(data.name)) {
        this.updateSupplier(data).then(() => {
          this.$router.push({ name: "SupplierTable" });
        });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("supplier");
    next();
  }
};
</script>
<style lang="less" scoped>
.supplier_update_form {
  width: 50%;
}
</style>