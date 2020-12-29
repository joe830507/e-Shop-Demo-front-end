<template>
  <div class="mt-5 ml-3">
    <router-link :to="{name:'SupplierTable'}" class="btn btn-success" tag="button">返回</router-link>
    <div class="mt-5 import_add_form">
      <div class="input-group input-group-lg">
        <span class="input-group-text">帳號</span>
        <input
          v-model="importRecord.account"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入您的電子郵件作為帳號"
        />
      </div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      importRecord: {}
    };
  }
};
</script>

<style>
</style>