<template>
  <div class="mt-5 ml-3">
    <router-link :to="{name:'SupplierTable'}" class="btn btn-success" tag="button">返回</router-link>
    <div class="mt-4 import_add_form">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">產品</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" v-model="importRecord.productId">
          <option selected :value="null">請選擇...</option>
          <option :value="x.id" v-for="(x,index) in products" :key="index">{{x.name}}</option>
        </select>
      </div>
      <div class="input-group input-group-prepend mt-3">
        <span class="input-group-text">進貨價格</span>
        <input
          v-model="importRecord.importPrice"
          type="number"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-prepend"
          placeholder="請輸入進貨價格"
        />
      </div>
      <div class="input-group input-group-prepend mt-3">
        <span class="input-group-text">數量</span>
        <input
          v-model="importRecord.quantity"
          type="number"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-prepend"
          placeholder="請輸入數量"
        />
      </div>
      <button class="btn btn-primary float-right mt-3" @click="sendAddRequest">送出</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      importRecord: {
        productId: null,
        supplierId: null,
        quantity: 0,
        importPrice: 0
      },
      supplier: {
        id: null,
        productType: null
      }
    };
  },
  created() {
    this.temporarilyStoreSupplier();
    this.queryRequest();
  },
  methods: {
    ...mapActions(["getProducts", "addImportRecord"]),
    temporarilyStoreSupplier() {
      if (this.$route.params.supplier) {
        this.supplier = Object.assign({}, this.$route.params.supplier);
        sessionStorage.setItem("supplier", JSON.stringify(this.supplier));
      } else {
        this.supplier = JSON.parse(sessionStorage.getItem("supplier"));
      }
      this.importRecord.supplierId = this.supplier.id;
    },
    queryRequest() {
      if (this.supplier.productType) {
        const queryString = `?productType=${this.supplier.productType}`;
        this.getProducts(queryString);
      } else {
        this.getProducts();
      }
    },
    sendAddRequest() {
      const data = Object.assign({}, this.importRecord);
      data.importPrice = Number(data.importPrice);
      data.quantity = Number(data.quantity);
      this.addImportRecord(data).then(() => {
        this.$router.push({ name: "SupplierTable" });
      });
    }
  },
  computed: {
    ...mapGetters(["products"])
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("supplier");
    next();
  }
};
</script>

<style lang="less" scoped>
.import_add_form {
  width: 50%;
}
</style>