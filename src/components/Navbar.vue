<template>
    <nav class="navbar navbar-expand-lg navbar-expand myNavbar">
        <router-link class="navbar-brand" :to="{name:'Home'}">
            <img class="myLogo rounded" alt="Vue logo" src="../assets/logo_transparent.png">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibileNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="collapsibileNavbar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link navText" :to="{name:'Home'}">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link navText" :to="{name:'Home'}">Cart</router-link>
                </li>
                <li class="nav-item">
                    <span class="nav-link navText" data-toggle="modal" data-target="#Login">Login</span>
                </li>
                <li class="nav-item">
                    <span class="nav-link navText" data-toggle="modal" data-target="#Register">Register</span>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    data() {
      return {
        modalShow: false
      }
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
.myNavbar{
    background-color: rgb(0, 0, 0);
    .myLogo{
        width: 3rem;
        height: 3rem;
        position: relative;
        z-index: 1;
        margin-left: 10rem;
    }
    #collapsibileNavbar{
        ul{
            margin-right: 10rem !important;
            .navText{
                color: rgb(255, 255, 255);
            }
            .navText:hover{
                color: rgb(226, 216, 216);
            }
        }
    }
}
</style>