<template>
    <div>
        <header1></header1>
        <div>{{msg}}</div>
        <other></other>
    </div>
</template>
<style>

</style>
<script>

    import header1 from './common/header1.vue';
    import other from './common/other.vue'
    export default{
        data(){
            return{
                msg:'hello vue !'
            }
        },
        components:{
            other,header1
        }
    }
</script>
