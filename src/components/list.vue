<template>
    <div>
        <h1>姓名：{{name}}</h1>
        <h2>{{age}}</h2>
        <button @click="golist">$router.router.go查看</button>
        <a v-link="{name : 'list'}">v-link查看列表</a>
        <a v-link="{name : 'index'}">回去主页</a>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return {
                name: "bxz",
                age: 21
            }
        },
        methods : {
            golist(){//方法，定义路由跳转，注意这里必须使用this，不然报错
                this.$router.router.go({name: "list"})
            }
        }
    }
</script>
