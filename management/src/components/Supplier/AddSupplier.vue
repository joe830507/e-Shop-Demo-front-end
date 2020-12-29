<template>
  <div class="mt-5 ml-3">
    <router-link :to="{name:'SupplierTable'}" class="btn btn-success" tag="button">返回</router-link>
    <div class="mt-5 supplier_add_form">
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
      <br />
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">供應商類型</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" v-model="supplier.productType">
          <option selected :value="null">請選擇...</option>
          <option :value="x.id" v-for="(x,index) in productTypeArray" :key="index">{{x.name}}</option>
        </select>
      </div>
      <button class="btn btn-primary float-right mt-3" @click="send">送出</button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      supplier: {
        name: null,
        phone: null,
        email: null,
        productType: null
      },
      productTypeArray: []
    };
  },
  created() {
    this.setProductTypes();
  },
  methods: {
    ...mapActions(["addSupplier"]),
    send() {
      const data = Object.assign({}, this.supplier);
      if (
        this.validateName(data.name) &&
        this.validatePhone(data.phone) &&
        this.validateEmail(data.email) &&
        this.validateProductType(data.productType)
      ) {
        this.addSupplier(data).then(() => {
          this.supplier.name = null;
          this.supplier.phone = null;
          this.supplier.email = null;
          this.$router.push({ name: "SupplierTable" });
        });
      }
    },
    setProductTypes() {
      if (this.productTypes.length !== 0) {
        sessionStorage.setItem(
          "productTypes",
          JSON.stringify(this.productTypes)
        );
        this.productTypeArray = Object.assign({}, this.productTypes);
      } else {
        this.productTypeArray = JSON.parse(
          sessionStorage.getItem("productTypes")
        );
      }
    }
  },
  computed: {
    ...mapGetters(["productTypes"])
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("productTypes");
    next();
  }
};
</script>
<style lang="less" scoped>
.supplier_add_form {
  width: 50%;
}
</style>