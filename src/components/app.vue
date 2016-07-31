<template>

    <a v-link="{name:'index'}">回到主页</a>
    <a v-link="{name:'hello'}">嵌套的路由</a>
    <a v-link="{name : 'list'}">列表页面</a>

    <div class="message">Vue is:{{ count }}</div>
    <a href="#" @click.prevent="increment">Increment</a>

    <p>
        <router-view></router-view>
    </p>

</template>

<script>

    import hello from './hello.vue'

    export default{
        data(){
            return {
                count:0
            }
        },
        methods:{
            increment(){
                this.count ++;
            }
        },
        components:{
            hello //若还有更多的组件，只需要在import的情况下，以逗号分割，继续注册就好
        }
    }


</script>

<style>
    .message{
        color: blue;
    }
</style>
