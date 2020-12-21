<template>
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
          <h5 class="modal-title" id="LoginLabel">Login</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Account</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="customer.account"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="customer.password"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="login">
            Login
          </button>
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
          <h5 class="modal-title" id="RegisterLabel">Register</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Employee Login Modal -->
  <div
    class="modal fade"
    id="EmployeeLogin"
    tabindex="-1"
    aria-labelledby="EmployeeLoginLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="EmployeeLoginLabel">Employee Login</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      customer: {
        account: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      let body = {
        account: this.customer.account,
        password: this.customer.password,
      };
      let res = this.$http.send("/emplogin", "POST", body);
      res.then((res) => {
        const token = `bearer ${res.token}`;
        sessionStorage.setItem("token", token);
        this.customer.account = null;
        this.customer.password = null;
        $("#Login").modal("hide");
      });
    },
  },
};
</script>

<style>
</style>