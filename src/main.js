/**
 * Created by bxz on 2028/7/24.
 */

//引入vue以及vue-router
import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);

//引入组件
import index from './components/app.vue';
import list from './components/list.vue';
import hello from './components/hello.vue';


/*
new Vue({
    el:'body',
    data:{
        message:'Hello Vue !'
    }
})*/

/*new Vue({
    el:'body',
    components:{
        Router
    }
})*/



// 路由器需要一个根组件。
var App = Vue.extend({})

//创建路由实例
var router = new VueRouter()

//定义路由规则
router.map({
    '/index':{
        name:'index',
        component:index,
        //在index下设置子路由
        subRoutes:{
            // 当匹配到/index/hello时，会在index的<router-view>内渲染
            '/hello':{
                name:'hello',   //可有可无，主要是为了方便使用
                component:hello
            }
        }
    },
    '/list':{
        name:'list',
        component:list
    }
})

router.redirect({
    '*':"/index"
})

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App,'#app')
