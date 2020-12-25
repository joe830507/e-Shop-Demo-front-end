import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Employee from "../views/Employee";
import Product from "../views/Product";
import Customer from "../views/Customer";
import PurchaseRecord from "../views/PurchaseRecord";

const routes = [
  {
    path: "/home",
    name: "Home",
    chineseName: "首頁",
    component: Home,
  },
  {
    path: "/employee",
    name: "Employee",
    chineseName: "員工",
    component: Employee,
  },
  {
    path: "/product",
    name: "Product",
    chineseName: "產品",
    component: Product,
  },
  {
    path: "/customer",
    name: "Customer",
    chineseName: "顧客",
    component: Customer,
  },
  {
    path: "/purchaseRecord",
    name: "PurchaseRecord",
    chineseName: "購買紀錄",
    component: PurchaseRecord,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.length == 0) {
    next({
      path: "/home",
    });
  } else {
    next();
  }
});

export default router;
