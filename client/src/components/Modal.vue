<template>
  <div>
    <!-- Login Modal -->
    <div
      class="modal fade"
      id="Login"
      tabindex="-1"
      aria-labelledby="LoginLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="LoginLabel">顧客登入</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <label for="Account" class="col-sm-2 col-form-label">帳號</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" v-model="customer.account" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="Password" class="col-sm-2 col-form-label">密碼</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" v-model="customer.password" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" @click="login">登入</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Register Modal -->
    <div
      class="modal fade"
      id="Register"
      tabindex="-1"
      aria-labelledby="RegisterLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="RegisterLabel">註冊</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <label for="Account" class="col-sm-2 col-form-label">帳號</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" v-model="customer.account" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="Password" class="col-sm-2 col-form-label">密碼</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" v-model="customer.password" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="Password" class="col-sm-2 col-form-label">生日</label>
                <div class="col-sm-10">
                  <date-picker
                    v-model="customer.birthDate"
                    value-type="format"
                    placeholder="YYYY-MM-DD"
                    :disabled-date="notAfterToday"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary">送出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
export default {
  data() {
    return {
      customer: {
        account: null,
        password: null,
        birthDate: null
      }
    };
  },
  components: {
    DatePicker
  },
  methods: {
    ...mapActions(["customerLogin", "getProducts"]),
    login() {
      const data = Object.assign({}, this.customer);
      if (
        this.validateEmail(data.account) &&
        this.validatePassword(data.password)
      )
        data.password = this.encrypt(data.password);
      this.customerLogin(data).then(() => {
        $("#Login").modal("hide");
        this.customer.account = null;
        this.customer.password = null;
      });
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
</style>