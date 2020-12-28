import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      roles: [
        { role: "Admin", value: 0 },
        { role: "Manager", value: 1 },
        { role: "General", value: 2 },
      ],
      error: {
        name: "名稱格式錯誤",
        phone: "電話格式錯誤",
        email: "電子郵件格式錯誤",
        password: "密碼格式錯誤",
        birthDate: "日期格式錯誤",
      },
    };
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      return vm.$store.state.employee.isLogin;
    });
  },
  methods: {
    encrypt(message) {
      return Base64.stringify(sha256(message));
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    validateEmail(data) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return this.sendResult(regex.test(data), this.error.email);
    },
    validatePassword(data) {
      const regex = /^[a-zA-Z0-9]{10,40}$/;
      return this.sendResult(regex.test(data), this.error.password);
    },
    validateBirthDate(data) {
      const regex = /^(\d){4}-(\d){2}-(\d){2}$/;
      return this.sendResult(regex.test(data), this.error.birthDate);
    },
    validatePhone(data) {
      const regex = /^09\d{8}$/;
      return this.sendResult(regex.test(data), this.error.phone);
    },
    validateName(data) {
      const regex = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,40}$/;
      return this.sendResult(regex.test(data), this.error.name);
    },
    validateRole(data) {
      return data !== null && (data >= 0 || data <= 2);
    },
    sendResult(isPassed, msg) {
      if (!isPassed) alert(msg);
      return isPassed;
    },
  },
  computed: {
    ...mapGetters(["productTypes", "isLogin", "displayLoading"]),
  },
};
