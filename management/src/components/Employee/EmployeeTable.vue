<template>
  <div>
    <div class="btn-group mt-5 ml-3 btns" role="group" aria-label="Basic example">
      <div>
        <router-link :to="{name:'AddEmployee'}" class="btn btn-primary" tag="button">新增</router-link>
      </div>
      <div>
        <button class="btn btn-danger ml-3" @click="sendDeleteRequest">刪除</button>
      </div>
      <h3>員工列表</h3>
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
              @click="checkOrUncheckAllEmp"
              ref="all"
            />
          </th>
          <th scope="col">帳號</th>
          <th scope="col">狀態</th>
          <th scope="col">創建時間</th>
          <th scope="col">角色</th>
        </tr>
      </thead>
      <tbody class="empDataSet">
        <tr v-for="(e,index) in employees" :key="index">
          <th scope="row">
            <input
              class="form-check-input empCheckbox"
              type="checkbox"
              aria-label="Checkbox for following text input"
              :value="e.id"
              @click="checkOrUncheckEmp"
              ref="myInput"
            />
          </th>
          <td>
            <router-link
              class="empAccount"
              :to="{name:'UpdateEmployee',params:{
              employee:e
            }}"
              tag="span"
            >{{e.account}}</router-link>
          </td>
          <td>{{e.activate == true?'啟用':'未啟用'}}</td>
          <td>{{e.createTime}}</td>
          <td>{{e.role}}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="..." class="float-right">
      <ul class="pagination">
        <li :class="`page-item ${empPages.currentPage==1?'disabled':''}`">
          <a
            class="page-link"
            tabindex="-1"
            aria-disabled="true"
            @click="switchPage(empPages.currentPage-1>1?empPages.currentPage-1:1)"
          >Previous</a>
        </li>
        <div v-for="(item,x) in empPages.totalPages" :key="x">
          <li :class="`page-item ${x+1 === empPages.currentPage?'active':''}`">
            <a class="page-link" @click="switchPage(x+1)">{{x+1}}</a>
          </li>
        </div>
        <li :class="`page-item ${empPages.currentPage==empPages.totalPages?'disabled':''}`">
          <a
            class="page-link"
            @click="switchPage(empPages.currentPage+1==empPages.totalPages?empPages.totalPages:empPages.currentPage+1)"
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
      empCheckedItem: []
    };
  },
  created() {
    this.getEmployees();
  },
  methods: {
    ...mapActions(["getEmployees", "deleteEmployee"]),
    checkOrUncheckEmp(e) {
      const isTheId = element => element === e.target.value;
      const index = this.empCheckedItem.findIndex(isTheId);
      if (e.target.checked) {
        this.empCheckedItem.push(e.target.value);
      } else {
        this.empCheckedItem.splice(index, 1);
      }
      this.empCheckedItem = this.empCheckedItem.filter(this.onlyUnique);
      const lengthOfMyInputs = this.$refs.myInput.length;
      if (lengthOfMyInputs !== this.empCheckedItem.length)
        this.$refs.all.checked = false;
      else this.$refs.all.checked = true;
    },
    checkOrUncheckAllEmp(e) {
      const myInputs = this.$refs.myInput;
      if (e.target.checked) {
        myInputs.forEach(e => {
          this.empCheckedItem.push(e.value);
          e.checked = true;
        });
      } else {
        myInputs.forEach(e => {
          e.checked = false;
        });
        this.empCheckedItem = [];
      }
      this.empCheckedItem = this.empCheckedItem.filter(this.onlyUnique);
    },
    switchPage(page) {
      this.restoreDataElements();
      this.getEmployees(`?pageNumber=${page}`);
    },
    sendDeleteRequest() {
      if (this.empCheckedItem.length === 0) return alert("尚未選擇資料");
      const isNeededToDelete = confirm("您確定刪除這些員工資料嗎?");
      if (isNeededToDelete) {
        this.deleteEmployee({ employees: this.empCheckedItem }).then(() => {
          this.restoreDataElements();
          this.getEmployees();
        });
      }
    },
    restoreDataElements() {
      this.empCheckedItem = [];
      this.$refs.all.checked = false;
      this.$refs.myInput.forEach(e => {
        e.checked = false;
      });
    }
  },
  computed: {
    ...mapGetters(["employees", "empPages"])
  }
};
</script>

<style lang="less" scoped>
.empCheckbox {
  margin-left: 10px;
}
.cbForAll {
  margin-left: 10px;
}
.empAccount {
  cursor: pointer;
}
.empAccount:hover {
  color: rgb(207, 207, 207);
}
.btns {
  h3 {
    margin-left: 30rem;
  }
}
</style>