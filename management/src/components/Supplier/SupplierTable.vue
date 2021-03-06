<template>
  <div>
    <h1 class="mt-5 ml-3">
      <span class="badge badge-secondary">供應商列表</span>
    </h1>
    <div class="d-flex mt-3 btns">
      <div>
        <router-link :to="{name:'AddSupplier'}" class="ml-3 btn btn-primary" tag="button">新增</router-link>
      </div>
      <div>
        <button class="ml-3 btn btn-danger" @click="sendDeleteRequest">刪除</button>
      </div>
      <div class="ml-3 float-right" role="group" aria-label="Basic example">
        <div class="input-group mb-3 typeSelector">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">供應商類型</label>
          </div>
          <select class="custom-select" id="inputGroupSelect01" v-model="query.productType">
            <option selected :value="null">請選擇...</option>
            <option :value="x.id" v-for="(x,index) in productTypes" :key="index">{{x.name}}</option>
          </select>
        </div>
      </div>
      <div>
        <button class="ml-3 btn btn-primary queryBtn" @click="queryRequest">查詢</button>
      </div>
    </div>

    <table class="table table-dark table-striped mt-3 ml-3">
      <thead>
        <tr>
          <th scope="col">
            <span>All</span>
            <input
              class="form-check-input cbForAll"
              type="checkbox"
              aria-label="Checkbox for following text input"
              @click="checkOrUncheckAllItem"
              ref="all"
            />
          </th>
          <th scope="col">名稱</th>
          <th scope="col">電話</th>
          <th scope="col">電子郵件</th>
          <th scope="col">供貨類型</th>
          <th scope="col">創建時間</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e,index) in suppliers" :key="index">
          <th scope="row">
            <input
              class="form-check-input supplierCheckbox"
              type="checkbox"
              aria-label="Checkbox for following text input"
              :value="e.id"
              @click="checkOrUncheckSupplier"
              ref="myInput"
            />
          </th>
          <td>
            <router-link
              class="supplierName"
              :to="{name:'UpdateSupplier',params:{
              supplier:e
            }}"
              tag="span"
            >{{e.name}}</router-link>
          </td>
          <td>{{e.phone}}</td>
          <td>{{e.email}}</td>
          <td>{{setProductType(e)}}</td>
          <td>{{e.createTime}}</td>
          <td class="operations">
            <router-link
              class="badge badge-primary"
              :to="{name:'ImportGoods',params:{
              supplier:e
            }}"
              tag="span"
            >叫貨</router-link>
            <router-link
              class="badge badge-info"
              :to="{name:'ImportRecords',params:{
              supplier:e
            }}"
              tag="span"
            >叫貨清單</router-link>
          </td>
        </tr>
        <tr v-if="suppliers.length === 0">
          <td colspan="7" class="text-center">查無資訊</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="..." class="float-right">
      <ul class="pagination">
        <li :class="`page-item ${supplierPages.currentPage==1?'disabled':''}`">
          <a
            class="page-link"
            tabindex="-1"
            aria-disabled="true"
            @click="switchPage(supplierPages.currentPage-1>1?supplierPages.currentPage-1:1)"
          >Previous</a>
        </li>
        <div v-for="(item,x) in supplierPages.totalPages" :key="x">
          <li :class="`page-item ${x+1 === supplierPages.currentPage?'active':''}`">
            <a class="page-link" @click="switchPage(x+1)">{{x+1}}</a>
          </li>
        </div>
        <li
          :class="`page-item ${supplierPages.currentPage==supplierPages.totalPages?'disabled':''}`"
        >
          <a
            class="page-link"
            @click="switchPage(supplierPages.currentPage+1==supplierPages.totalPages?supplierPages.totalPages:supplierPages.currentPage+1)"
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
      supplierCheckedItems: [],
      query: {
        productType: null
      }
    };
  },
  created() {
    this.getSuppliers();
  },
  methods: {
    ...mapActions(["getSuppliers", "deleteSupplier"]),
    queryRequest() {
      if (this.query.productType) {
        const queryString = `?productTypeID=${this.query.productType}`;
        this.getSuppliers(queryString);
      } else {
        this.getSuppliers();
      }
    },
    checkOrUncheckSupplier(e) {
      const isTheId = element => element === e.target.value;
      const index = this.supplierCheckedItems.findIndex(isTheId);
      if (e.target.checked) {
        this.supplierCheckedItems.push(e.target.value);
      } else {
        this.supplierCheckedItems.splice(index, 1);
      }
      this.supplierCheckedItems = this.supplierCheckedItems.filter(
        this.onlyUnique
      );
      const lengthOfMyInputs = this.$refs.myInput.length;
      if (lengthOfMyInputs !== this.supplierCheckedItems.length)
        this.$refs.all.checked = false;
      else this.$refs.all.checked = true;
    },
    checkOrUncheckAllItem(e) {
      const myInputs = this.$refs.myInput;
      if (e.target.checked) {
        myInputs.forEach(e => {
          this.supplierCheckedItems.push(e.value);
          e.checked = true;
        });
      } else {
        myInputs.forEach(e => {
          e.checked = false;
        });
        this.supplierCheckedItems = [];
      }
      this.supplierCheckedItems = this.supplierCheckedItems.filter(
        this.onlyUnique
      );
    },
    switchPage(page) {
      this.restoreDataElements();
      this.getSuppliers(`?pageNumber=${page}`);
    },
    sendDeleteRequest() {
      if (this.supplierCheckedItems.length === 0) return alert("尚未選擇資料");
      const button = confirm("您確定刪除這些供應商資料嗎?");
      if (button) {
        this.deleteSupplier({ suppliers: this.supplierCheckedItems }).then(
          () => {
            this.getSuppliers();
            this.restoreDataElements();
          }
        );
      }
    },
    restoreDataElements() {
      this.supplierCheckedItems = [];
      this.$refs.all.checked = false;
      this.$refs.myInput.forEach(e => {
        e.checked = false;
      });
    },
    setProductType(e) {
      return this.productTypes.filter(value => {
        return value.id === e.productTypeID;
      })[0].name;
    }
  },
  computed: {
    ...mapGetters(["suppliers", "supplierPages", "productTypes"])
  }
};
</script>

<style lang="less" scoped>
.supplierCheckbox {
  margin-left: 10px;
}
.cbForAll {
  margin-left: 10px;
}
.supplierName {
  cursor: pointer;
}
.supplierName:hover {
  color: rgb(207, 207, 207);
}
.operations {
  span {
    cursor: pointer;
    margin-left: 5px;
  }
}
.typeSelector {
  height: 30px;
  width: 300px;
}
</style>