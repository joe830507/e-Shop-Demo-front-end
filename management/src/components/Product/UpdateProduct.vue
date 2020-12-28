<template>
  <div class="mt-5 ml-3">
    <router-link :to="{name:'ProductTable'}" class="btn btn-success" tag="button">返回</router-link>
    <div class="mt-5 product_add_form">
      <div class="input-group input-group-lg">
        <span class="input-group-text">名稱</span>
        <input
          v-model="product.name"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入名稱(20個字以內)"
        />
      </div>
      <br />
      <div class="input-group input-group-lg">
        <span class="input-group-text">價格</span>
        <input
          v-model="product.price"
          type="number"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入價格"
        />
      </div>
      <br />
      <div class="input-group input-group-lg">
        <span class="input-group-text">數量</span>
        <input
          v-model="product.quantity"
          type="number"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入數量"
        />
      </div>
      <br />
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">類型</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" v-model="product.type">
          <option selected :value="null">請選擇...</option>
          <option :value="x.id" v-for="(x,index) in productTypeArray" :key="index">{{x.name}}</option>
        </select>
      </div>
      <br />
      <div class="input-group input-group-lg">
        <span class="input-group-text">圖片連結</span>
        <input
          v-model="product.pictureLink"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="請輸入圖片連結"
        />
      </div>
      <br />
      <button
        class="btn btn-primary"
        data-toggle="modal"
        :disabled="!product.pictureLink"
        data-target="#ProductPicture"
      >展示圖片</button>
      <br />
      <br />
      <div class="form-group">
        <span class="input-group-text">描述</span>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          placeholder="請輸入描述(200個字為限)"
          rows="3"
          v-model="product.description"
        ></textarea>
      </div>
      <br />
      <button class="btn btn-primary float-right mt-3" @click="send">送出</button>
    </div>
    <!-- ProductPicture -->
    <div
      class="modal fade"
      id="ProductPicture"
      tabindex="-1"
      aria-labelledby="ProductPictureLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ProductPictureLabel">圖片</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              v-if="product.pictureLink"
              ref="picLink"
              :style="`width: ${myPicInfo.width}px;height: ${myPicInfo.height}px`"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      product: {
        id: null,
        name: null,
        price: 0,
        quantity: 0,
        type: null,
        description: null,
        pictureLink: null
      },
      productTypeArray: [],
      myPicInfo: {
        width: 450,
        height: null
      }
    };
  },
  created() {
    this.setProductTypeParams();
    this.setProductParams();
  },
  methods: {
    ...mapActions(["updateProduct"]),
    setProductParams() {
      if (this.$route.params.product) {
        sessionStorage.setItem(
          "product",
          JSON.stringify(this.$route.params.product)
        );
        this.product = Object.assign({}, this.$route.params.product);
      } else {
        this.product = JSON.parse(sessionStorage.getItem("product"));
      }
      const _this = this;
      this.product.type = Object.values(this.productTypeArray).filter(e => {
        return e.name === _this.product.type;
      })[0].id;
    },
    setProductTypeParams() {
      if (this.productTypes.length !== 0) {
        sessionStorage.setItem(
          "productTypes",
          JSON.stringify(this.productTypes)
        );
        this.productTypeArray = Object.assign({}, this.productTypes);
      } else {
        this.productTypeArray = JSON.parse(
          sessionStorage.getItem("productTypes")
        );
      }
    },
    send() {
      const data = Object.assign({}, this.product);
      if (
        this.validateProductName(data.name) &&
        this.validateProductPrice(data.price) &&
        this.validateProductQuantity(data.quantity) &&
        this.validateProductType(data.type) &&
        this.validateProductPictureLink(data.pictureLink) &&
        this.validateProductDescription(data.description)
      ) {
        data.price = Number(data.price);
        data.quantity = Number(data.quantity);
        this.updateProduct(data).then(() => {
          this.$router.push({ name: "ProductTable" });
        });
      }
    }
  },
  watch: {
    "product.pictureLink"(value) {
      const img = new Image();
      const _this = this;
      img.onload = function() {
        _this.myPicInfo.height =
          this.height / (this.width / _this.myPicInfo.width);
        _this.$refs["picLink"].src = value;
      };
      img.src = value;
    }
  },
  computed: {
    ...mapGetters(["productTypes"])
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("productTypes");
    sessionStorage.removeItem("product");
    next();
  }
};
</script>
<style lang="less" scoped>
.product_add_form {
  width: 50%;
}
</style>