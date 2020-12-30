<template>
  <div>
    <h1 class="mt-5 ml-3">
      <span class="badge badge-secondary">叫貨清單</span>
    </h1>
    <div class="d-flex mt-3 ml-3">
      <router-link :to="{name:'SupplierTable'}" class="btn btn-success" tag="button">返回</router-link>
    </div>
    <table class="table table-dark table-striped mt-3 ml-3">
      <thead>
        <tr>
          <th scope="col">產品名稱</th>
          <th scope="col">供應商名稱</th>
          <th scope="col">進貨量</th>
          <th scope="col">進貨價</th>
          <th scope="col">狀態</th>
          <th scope="col">創建時間</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e,index) in importRecords" :key="index">
          <td>{{e.productName}}</td>
          <td>{{supplier.name}}</td>
          <td>{{e.quantity}}</td>
          <td>{{e.importPrice}}</td>
          <td>{{setImportStatus(e.status)}}</td>
          <td>{{e.createTime}}</td>
          <td>
            <span class="badge badge-primary" v-if="e.status===1">更新</span>
          </td>
        </tr>
        <tr v-if="importRecords.length === 0">
          <td colspan="7" class="text-center">查無資訊</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="..." class="float-right">
      <ul class="pagination">
        <li :class="`page-item ${importRecordPages.currentPage==1?'disabled':''}`">
          <a
            class="page-link"
            tabindex="-1"
            aria-disabled="true"
            @click="switchPage(importRecordPages.currentPage-1>1?importRecordPages.currentPage-1:1)"
          >Previous</a>
        </li>
        <div v-for="(item,x) in importRecordPages.totalPages" :key="x">
          <li :class="`page-item ${x+1 === importRecordPages.currentPage?'active':''}`">
            <a class="page-link" @click="switchPage(x+1)">{{x+1}}</a>
          </li>
        </div>
        <li
          :class="`page-item ${importRecordPages.currentPage==importRecordPages.totalPages?'disabled':''}`"
        >
          <a
            class="page-link"
            @click="switchPage(importRecordPages.currentPage+1==importRecordPages.totalPages?importRecordPages.totalPages:importRecordPages.currentPage+1)"
          >Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      ImportRecordCheckedItems: [],
      supplier: {
        id: null,
        name: null,
        productType: null
      }
    };
  },
  created() {
    this.temporarilyStoreSupplier();
    this.queryRequest();
  },
  methods: {
    ...mapActions(["getImportRecords", "updateImportRecord"]),
    temporarilyStoreSupplier() {
      if (this.$route.params.supplier) {
        this.supplier = Object.assign({}, this.$route.params.supplier);
        sessionStorage.setItem("supplier", JSON.stringify(this.supplier));
      } else {
        this.supplier = JSON.parse(sessionStorage.getItem("supplier"));
      }
    },
    queryRequest() {
      if (this.supplier.id) {
        const queryString = `?supplierId=${this.supplier.id}&productType=${this.supplier.productType}`;
        this.getImportRecords(queryString);
      } else {
        this.getImportRecords();
      }
    },
    checkOrUncheckAllItem(e) {
      const myInputs = this.$refs.myInput;
      if (e.target.checked) {
        myInputs.forEach(e => {
          this.ImportRecordCheckedItems.push(e.value);
          e.checked = true;
        });
      } else {
        myInputs.forEach(e => {
          e.checked = false;
        });
        this.ImportRecordCheckedItems = [];
      }
      this.ImportRecordCheckedItems = this.ImportRecordCheckedItems.filter(
        this.onlyUnique
      );
    },
    sendAddRequest() {},
    setImportStatus(status) {
      switch (status) {
        case 1:
          return "已叫貨";
        case 2:
          return "已到貨";
        default:
          break;
      }
    },
    checkOrUncheckImportRecord(e) {
      const isTheId = element => element === e.target.value;
      const index = this.ImportRecordCheckedItems.findIndex(isTheId);
      if (e.target.checked) {
        this.ImportRecordCheckedItems.push(e.target.value);
      } else {
        this.ImportRecordCheckedItems.splice(index, 1);
      }
      this.ImportRecordCheckedItems = this.ImportRecordCheckedItems.filter(
        this.onlyUnique
      );
      const lengthOfMyInputs = this.$refs.myInput.length;
      if (lengthOfMyInputs !== this.ImportRecordCheckedItems.length)
        this.$refs.all.checked = false;
      else this.$refs.all.checked = true;
    }
  },
  computed: {
    ...mapGetters(["importRecords", "importRecordPages"])
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("supplier");
    next();
  }
};
</script>

<style lang="less" scoped>
.importRecordCheckbox {
  margin-left: 10px;
}

.cbForAll {
  margin-left: 10px;
}
</style>