<template>
  <footer class="footer mt-auto py-3">
    <img src="../assets/settings.png" alt="Employee" class="justify-content-end" data-toggle="modal" data-target="#EmployeeLogin">
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   height: 35px;
   background-color: rgb(255, 255, 255);
   color: white;
   text-align: right;
   img{
     margin-right: 10px;
     margin-bottom: 15px;
     width: 10px;
     height: 10px;
     cursor: pointer;
   }
}
</style>