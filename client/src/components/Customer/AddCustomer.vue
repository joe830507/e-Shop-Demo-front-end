<template>
  <div class="mt-5 ml-3">
    <router-link :to="{name:'CustomerTable'}" class="btn btn-success" tag="button">返回</router-link>
    <div class="mt-5 cust_add_form">
      <div class="input-group input-group-lg">
        <span class="input-group-text">帳號</span>
        <input
          v-model="customer.account"
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
          v-model="customer.password"
          type="password"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入您的密碼(至少10字，至多40字，僅允許中英文數字)"
        />
      </div>
      <br />
      <div class="input-group input-group-lg">
        <span class="input-group-text birthDateSpan">生日</span>
        <date-picker
          class="custBirthDateInput"
          v-model="customer.birthDate"
          value-type="format"
          placeholder="YYYY-MM-DD"
          :disabled-date="notAfterToday"
          format="YYYY-MM-DD"
        ></date-picker>
      </div>
      <br />
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">狀態</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" v-model="customer.activate">
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
import DatePicker from "vue2-datepicker";
export default {
  data() {
    return {
      customer: {
        account: null,
        password: null,
        birthDate: null,
        activate: false
      }
    };
  },
  components: {
    DatePicker
  },
  methods: {
    ...mapActions(["addCustomer"]),
    send() {
      const data = Object.assign({}, this.customer);
      if (
        this.validateEmail(data.account) &&
        this.validatePassword(data.password) &&
        this.validateBirthDate(data.birthDate)
      ) {
        data.password = this.encrypt(data.password);
        this.addCustomer(data).then(() => {
          this.customer.account = null;
          this.customer.password = null;
          this.customer.birthDate = null;
          this.customer.activate = false;
          this.$router.push({ name: "CustomerTable" });
        });
      }
    },
    notAfterToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date > today;
    }
  }
};
</script>
<style lang="less" scoped>
.cust_add_form {
  width: 50%;
}
.birthDateSpan {
  height: 34px;
}
</style>