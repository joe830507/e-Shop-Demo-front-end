import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Employee from "../views/Employee";
import Product from "../views/Product";
import Customer from "../views/Customer";
import Supplier from "../views/Supplier.vue";
// ----------------Employee
import EmployeeTable from "../components/Employee/EmployeeTable.vue";
import AddEmployee from "../components/Employee/AddEmployee.vue";
import UpdateEmployee from "../components/Employee/UpdateEmployee.vue";
// ----------------Supplier
import SupplierTable from "../components/Supplier/SupplierTable.vue";
import AddSupplier from "../components/Supplier/AddSupplier.vue";
import UpdateSupplier from "../components/Supplier/UpdateSupplier.vue";
import ImportGoods from "../components/Supplier/ImportGoods.vue";
import ImportRecords from "../components/Supplier/ImportRecords.vue";
// ----------------Customer
import CustomerTable from "../components/Customer/CustomerTable.vue";
import AddCustomer from "../components/Customer/AddCustomer.vue";
import UpdateCustomer from "../components/Customer/UpdateCustomer.vue";
import PurchaseRecordTable from "../components/Customer/PurchaseRecordTable.vue";
// ----------------Product
import ProductTable from "../components/Product/ProductTable.vue";
import AddProduct from "../components/Product/AddProduct.vue";
import UpdateProduct from "../components/Product/UpdateProduct.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: {
      name: "Home",
    },
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      chineseName: "首頁",
    },
    component: Home,
  },
  {
    path: "/employee",
    meta: {
      chineseName: "員工",
    },
    component: Employee,
    children: [
      {
        path: "/",
        name: "EmployeeTable",
        component: EmployeeTable,
      },
      {
        path: "addEmp",
        name: "AddEmployee",
        component: AddEmployee,
      },
      {
        path: "updateEmp",
        name: "UpdateEmployee",
        component: UpdateEmployee,
      },
    ],
  },
  {
    path: "/customer",
    meta: {
      chineseName: "顧客",
    },
    component: Customer,
    children: [
      {
        path: "/",
        name: "CustomerTable",
        component: CustomerTable,
      },
      {
        path: "addCustomer",
        name: "AddCustomer",
        component: AddCustomer,
      },
      {
        path: "updateCustomer",
        name: "UpdateCustomer",
        component: UpdateCustomer,
      },
      {
        path: "purchaseRecordTable",
        name: "PurchaseRecordTable",
        component: PurchaseRecordTable,
      },
    ],
  },
  {
    path: "/product",
    meta: {
      chineseName: "產品",
    },
    component: Product,
    children: [
      {
        path: "/",
        name: "ProductTable",
        component: ProductTable,
      },
      {
        path: "addProduct",
        name: "AddProduct",
        component: AddProduct,
      },
      {
        path: "updateProduct",
        name: "UpdateProduct",
        component: UpdateProduct,
      },
    ],
  },
  {
    path: "/supplier",
    meta: {
      chineseName: "供應商",
    },
    component: Supplier,
    children: [
      {
        path: "/",
        name: "SupplierTable",
        component: SupplierTable,
      },
      {
        path: "addSupplier",
        name: "AddSupplier",
        component: AddSupplier,
      },
      {
        path: "updateSupplier",
        name: "UpdateSupplier",
        component: UpdateSupplier,
      },
      {
        path: "importGoods",
        name: "ImportGoods",
        component: ImportGoods,
      },
      {
        path: "importRecords",
        name: "ImportRecords",
        component: ImportRecords,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
