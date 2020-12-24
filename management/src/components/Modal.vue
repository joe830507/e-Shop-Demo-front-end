<template>
  <!-- Login Modal -->
  <div class="modal fade" id="Login" tabindex="-1" aria-labelledby="LoginLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="LoginLabel">登入</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row mb-3">
              <label for="Account" class="col-sm-2 col-form-label">帳號</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="Account" v-model="customer.account" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="Password" class="col-sm-2 col-form-label">密碼</label>
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control"
                  id="Password"
                  v-model="customer.password"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="login">Login</button>
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
                <input type="email" class="form-control" id="Account" v-model="customer.account" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="Password" class="col-sm-2 col-form-label">密碼</label>
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control"
                  id="Password"
                  v-model="customer.password"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      customer: {
        account: null,
        password: null
      }
    };
  },
  methods: {
    ...mapActions(["custLogin", "custRegister"]),
    login() {
      let requestBody = Object.assign({}, this.customer);
      requestBody.password = this.encrypt(this.customer.password);
      this.custLogin(requestBody).then(() => {
        this.customer.account = null;
        this.customer.password = null;
        $("#Login").modal("hide");
      });
    },
    register() {
      this.custRegister(this.customer).then(() => {
        this.customer.account = null;
        this.customer.password = null;
        $("#Register").modal("hide");
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>