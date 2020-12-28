<template>
  <div>
    <div class="btn-group mt-5 ml-3 btns" role="group" aria-label="Basic example">
      <div>
        <router-link :to="{name:'AddProduct'}" class="btn btn-primary" tag="button">新增</router-link>
      </div>
      <div>
        <button class="btn btn-danger ml-3" @click="sendDeleteRequest">刪除</button>
      </div>
      <h3>產品列表</h3>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      productCheckedItems: []
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts", "deleteProducts"]),
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