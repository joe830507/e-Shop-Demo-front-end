import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    encrypt(message) {
      return Base64.stringify(sha256(message));
    },
  },
  computed: {
    ...mapGetters(["productTypes", "isLogin"]),
  },
};
