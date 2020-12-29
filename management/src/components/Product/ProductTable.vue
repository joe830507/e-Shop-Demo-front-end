<template>
  <div>
    <h1 class="mt-5 ml-3">
      <span class="badge badge-secondary">產品列表</span>
    </h1>
    <div class="btn-group mt-3 ml-3 btns" role="group" aria-label="Basic example">
      <div>
        <router-link :to="{name:'AddProduct'}" class="btn btn-primary" tag="button">新增</router-link>
      </div>
      <div>
        <button class="btn btn-danger ml-3" @click="sendDeleteRequest">刪除</button>
      </div>
      <div>
        <button class="btn btn-info ml-3" data-toggle="modal" data-target="#AddProductType">新增產品分類</button>
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
          <th scope="col">價格</th>
          <th scope="col">庫存數量</th>
          <th scope="col">類型</th>
          <th scope="col">創建時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e,index) in products" :key="index">
          <th scope="row">
            <input
              class="form-check-input productCheckbox"
              type="checkbox"
              aria-label="Checkbox for following text input"
              :value="e.id"
              @click="checkOrUncheckProduct"
              ref="myInput"
            />
          </th>
          <td>
            <router-link
              class="productName"
              :to="{name:'UpdateProduct',params:{
              product:e
            }}"
              tag="span"
            >{{e.name}}</router-link>
          </td>
          <td>{{e.price}}</td>
          <td>{{e.quantity}}</td>
          <td>{{e.type}}</td>
          <td>{{e.createTime}}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="..." class="float-right">
      <ul class="pagination">
        <li :class="`page-item ${productPages.currentPage==1?'disabled':''}`">
          <a
            class="page-link"
            tabindex="-1"
            aria-disabled="true"
            @click="switchPage(productPages.currentPage-1>1?productPages.currentPage-1:1)"
          >Previous</a>
        </li>
        <div v-for="(item,x) in productPages.totalPages" :key="x">
          <li :class="`page-item ${x+1 === productPages.currentPage?'active':''}`">
            <a class="page-link" @click="switchPage(x+1)">{{x+1}}</a>
          </li>
        </div>
        <li :class="`page-item ${productPages.currentPage==productPages.totalPages?'disabled':''}`">
          <a
            class="page-link"
            @click="switchPage(productPages.currentPage+1==productPages.totalPages?productPages.totalPages:productPages.currentPage+1)"
          >Next</a>
        </li>
      </ul>
    </nav>
    <!-- Modal -->
    <div
      class="modal fade"
      id="AddProductType"
      tabindex="-1"
      aria-labelledby="AddProductTypeLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddProductTypeLabel">新增產品類型</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <label for="Account" class="col-sm-2 col-form-label">名稱</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="productType.name" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" @click="sendAddProductType">送出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      productCheckedItems: [],
      productType: {
        name: null
      },
      query: {
        productType: null
      }
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts", "deleteProducts", "addProductType"]),
    queryRequest() {
      if (this.query.productType) {
        const queryString = `?productType=${this.query.productType}`;
        this.getProducts(queryString);
      } else {
        this.getProducts();
      }
    },
    checkOrUncheckProduct(e) {
      const isTheId = element => element === e.target.value;
      const index = this.productCheckedItems.findIndex(isTheId);
      if (e.target.checked) {
        this.productCheckedItems.push(e.target.value);
      } else {
        this.productCheckedItems.splice(index, 1);
      }
      this.productCheckedItems = this.productCheckedItems.filter(
        this.onlyUnique
      );
      const lengthOfMyInputs = this.$refs.myInput.length;
      if (lengthOfMyInputs !== this.productCheckedItems.length)
        this.$refs.all.checked = false;
      else this.$refs.all.checked = true;
    },
    checkOrUncheckAllItem(e) {
      const myInputs = this.$refs.myInput;
      if (e.target.checked) {
        myInputs.forEach(e => {
          this.productCheckedItems.push(e.value);
          e.checked = true;
        });
      } else {
        myInputs.forEach(e => {
          e.checked = false;
        });
        this.productCheckedItems = [];
      }
      this.productCheckedItems = this.productCheckedItems.filter(
        this.onlyUnique
      );
    },
    switchPage(page) {
      this.restoreDataElements();
      this.getProducts(`?pageNumber=${page}`);
    },
    sendDeleteRequest() {
      if (this.productCheckedItems.length === 0) return alert("尚未選擇資料");
      const button = confirm("您確定刪除這些供應商資料嗎?");
      if (button) {
        this.deleteProducts({ products: this.productCheckedItems }).then(() => {
          this.getProducts();
          this.restoreDataElements();
        });
      }
    },
    restoreDataElements() {
      this.productCheckedItems = [];
      this.$refs.all.checked = false;
      this.$refs.myInput.forEach(e => {
        e.checked = false;
      });
    },
    sendAddProductType() {
      this.addProductType(this.productType).then(() => {
        this.productType.name = null;
        $("#AddProductType").modal("hide");
        this.getProducts();
      });
    }
  },
  computed: {
    ...mapGetters(["products", "productPages"])
  }
};
</script>

<style lang="less" scoped>
.productCheckbox {
  margin-left: 10px;
}
.cbForAll {
  margin-left: 10px;
}
.productName {
  cursor: pointer;
}
.productName:hover {
  color: rgb(207, 207, 207);
}
.btns {
  h3 {
    margin-left: 30rem;
  }
}
</style>