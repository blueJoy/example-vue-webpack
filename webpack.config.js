/**
 * Created by bxz on 2028/7/24.
 */

module.exports = {

    // 这是一个主文件包括其他模块
    entry:'./src/main.js',

    //编译的文件目录
    output:{
        // 'dist'文件夹
        path:'./dist',
        publicPath:'dist/',
        //文件 dist/build.js
        filename:'build.js'
    },
    module:{
        //一些特定的编译规则
        loaders:[
            {
                //让webpack去检验文件是否是.js结尾将其转换
                test:/\.js$/,
                //通过babel转换
                loader:'babel',
                //不用转换的node_modules文件夹
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                loader:'vue'
            }
        ]
    },
    vue:{
        loaders:{
            js:'babel'
        }}


}