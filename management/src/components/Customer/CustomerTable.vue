<template>
  <div>
    <h1 class="mt-5 ml-3">
      <span class="badge badge-secondary">顧客列表</span>
    </h1>
    <div class="btn-group mt-3 ml-3 btns" role="group" aria-label="Basic example">
      <div>
        <router-link :to="{name:'AddCustomer'}" class="btn btn-primary" tag="button">新增</router-link>
      </div>
      <div>
        <button class="btn btn-danger ml-3" @click="sendDeleteRequest">刪除</button>
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
          <th scope="col">帳號</th>
          <th scope="col">生日</th>
          <th scope="col">狀態</th>
          <th scope="col">創建時間</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e,index) in customers" :key="index">
          <th scope="row">
            <input
              class="form-check-input customerCheckbox"
              type="checkbox"
              aria-label="Checkbox for following text input"
              :value="e.id"
              @click="checkOrUncheckCustomer"
              ref="myInput"
            />
          </th>
          <td>
            <router-link
              class="customerName"
              :to="{name:'UpdateCustomer',params:{
              customer:e
            }}"
              tag="span"
            >{{e.account}}</router-link>
          </td>
          <td>{{e.birthDate}}</td>
          <td>{{e.activate == true?'啟用':'未啟用'}}</td>
          <td>{{e.createTime}}</td>
          <td>
            <router-link
              class="purchaseRecords badge badge-primary"
              :to="{
              name:'PurchaseRecordTable',
              params:{
                customer:e
              }
            }"
              tag="span"
            >購買紀錄</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="..." class="float-right">
      <ul class="pagination">
        <li :class="`page-item ${custPages.currentPage==1?'disabled':''}`">
          <a
            class="page-link"
            tabindex="-1"
            aria-disabled="true"
            @click="switchPage(custPages.currentPage-1>1?custPages.currentPage-1:1)"
          >Previous</a>
        </li>
        <div v-for="(item,x) in custPages.totalPages" :key="x">
          <li :class="`page-item ${x+1 === custPages.currentPage?'active':''}`">
            <a class="page-link" @click="switchPage(x+1)">{{x+1}}</a>
          </li>
        </div>
        <li :class="`page-item ${custPages.currentPage==custPages.totalPages?'disabled':''}`">
          <a
            class="page-link"
            @click="switchPage(custPages.currentPage+1==custPages.totalPages?custPages.totalPages:custPages.currentPage+1)"
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
      customerCheckedItems: []
    };
  },
  created() {
    this.getCustomers();
  },
  methods: {
    ...mapActions(["getCustomers", "deleteCustomer"]),
    checkOrUncheckCustomer(e) {
      const isTheId = element => element === e.target.value;
      const index = this.customerCheckedItems.findIndex(isTheId);
      if (e.target.checked) {
        this.customerCheckedItems.push(e.target.value);
      } else {
        this.customerCheckedItems.splice(index, 1);
      }
      this.customerCheckedItems = this.customerCheckedItems.filter(
        this.onlyUnique
      );
      const lengthOfMyInputs = this.$refs.myInput.length;
      if (lengthOfMyInputs !== this.customerCheckedItems.length)
        this.$refs.all.checked = false;
      else this.$refs.all.checked = true;
    },
    checkOrUncheckAllItem(e) {
      const myInputs = this.$refs.myInput;
      if (e.target.checked) {
        myInputs.forEach(e => {
          this.customerCheckedItems.push(e.value);
          e.checked = true;
        });
      } else {
        myInputs.forEach(e => {
          e.checked = false;
        });
        this.customerCheckedItems = [];
      }
      this.customerCheckedItems = this.customerCheckedItems.filter(
        this.onlyUnique
      );
    },
    switchPage(page) {
      this.restoreDataElements();
      this.getCustomers(`?pageNumber=${page}`);
    },
    sendDeleteRequest() {
      if (this.customerCheckedItems.length === 0) return alert("尚未選擇資料");
      const button = confirm("您確定刪除這些顧客資料嗎?");
      if (button) {
        this.deleteCustomer({ customers: this.customerCheckedItems }).then(
          () => {
            this.getCustomers();
            this.restoreDataElements();
          }
        );
      }
    },
    restoreDataElements() {
      this.customerCheckedItems = [];
      this.$refs.all.checked = false;
      this.$refs.myInput.forEach(e => {
        e.checked = false;
      });
    }
  },
  computed: {
    ...mapGetters(["customers", "custPages"])
  }
};
</script>

<style lang="less" scoped>
.customerCheckbox {
  margin-left: 10px;
}
.cbForAll {
  margin-left: 10px;
}
.customerName,
.purchaseRecords {
  cursor: pointer;
}
.customerName:hover {
  color: rgb(207, 207, 207);
}
.btns {
  h3 {
    margin-left: 30rem;
  }
}
</style>