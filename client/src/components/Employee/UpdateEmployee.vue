<template>
  <div class="mt-5 ml-3">
    <router-link :to="{name:'EmployeeTable'}" class="btn btn-success" tag="button">返回</router-link>
    <div class="mt-5 emp_update_form">
      <div class="input-group input-group-lg">
        <span class="input-group-text">帳號</span>
        <input
          v-model="employee.account"
          disabled
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入您的電子郵件作為帳號"
        />
      </div>
      <br />
      <div class="input-group input-group-lg">
        <span class="input-group-text">密碼</span>
        <input
          v-model="employee.password"
          type="password"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入您的密碼(至少10字，至多40字)"
        />
      </div>
      <br />
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">選項</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" v-model="employee.role">
          <option selected :value="null">請選擇...</option>
          <option :value="0">Admin</option>
          <option :value="1">Manager</option>
          <option :value="2">General</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">狀態</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" v-model="employee.activate">
          <option selected :value="false">未啟用</option>
          <option :value="true">啟用</option>
        </select>
      </div>
      <button class="btn btn-primary float-right" @click="send">送出</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      employee: {
        id: null,
        account: null,
        password: null,
        role: null,
        activate: false
      }
    };
  },
  created() {
    this.setEmployee();
  },
  methods: {
    ...mapActions(["updateEmployee"]),
    setEmployee() {
      if (this.$route.params.employee) {
        const employee = Object.assign({}, this.$route.params.employee);
        const role = this.roles.filter(x => {
          return x.role === employee.role;
        })[0];
        this.employee = Object.assign({}, employee);
        this.employee.activate = Boolean(this.employee.activate);
        this.employee.role = role.value;
        sessionStorage.setItem("employee", JSON.stringify(this.employee));
      } else {
        this.employee = JSON.parse(sessionStorage.getItem("employee"));
      }
    },
    send() {
      const data = Object.assign({}, this.employee);
      if (data.password) {
        if (this.validatePassword(data.password)) {
          data.password = this.encrypt(data.password);
        } else {
          return alert("密碼格式有誤");
        }
      }
      if (!this.validateRole(data.role)) {
        return alert("請選擇一種角色");
      }
      this.updateEmployee(data).then(() => {
        this.$router.push({ name: "EmployeeTable" });
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("employee");
    next();
  }
};
</script>
<style lang="less" scoped>
.emp_update_form {
  width: 50%;
}
</style>