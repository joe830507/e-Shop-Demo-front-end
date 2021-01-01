<template>
  <div class="mt-5 ml-3">
    <router-link :to="{name:'EmployeeTable'}" class="btn btn-success" tag="button">返回</router-link>
    <div class="mt-5 emp_add_form">
      <div class="input-group input-group-lg">
        <span class="input-group-text">帳號</span>
        <input
          v-model="employee.account"
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
          <label class="input-group-text" for="inputGroupSelect01">角色</label>
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
        account: null,
        password: null,
        role: null,
        activate: false
      }
    };
  },
  methods: {
    ...mapActions(["addEmployee"]),
    send() {
      const data = Object.assign({}, this.employee);
      const isValidEmail = this.validateEmail(data.account);
      const isValidPassowrd =
        data.password.length >= 10 && data.password.length <= 40;
      const isValidRole =
        data.role !== null && (data.role >= 0 || data.role <= 2);
      if (isValidEmail && isValidPassowrd && isValidRole) {
        data.password = this.encrypt(data.password);
        this.addEmployee(data).then(() => {
          this.$router.push({ name: "EmployeeTable" });
        });
      } else {
        alert("您輸入的資料有誤");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.emp_add_form {
  width: 50%;
}
</style>