module.exports = {
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
    // publicPath: "/",
    // assetsDir: "static/lipin",
    // outputDir: "dist",
    // runtimeCompiler: true,
    // productionSourceMap: false,
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: false,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 80,
        https: false,
        // hotOnly: false,
        /* 使用代理 */
        //  /api/getGradeListByName
        //  http://blog.coldworld.top:8080/getGradeListByName
        proxy: {
            // 请求路径地址里有/api，会做如下事情
            '/api': {
                //1. 把请求转发给target指定的服务器
                target: 'http://blog.coldworld.top:8080',
                /* 允许跨域 */
                changeOrigin: true,
                // 2. 路径重写
                "pathRewrite": {
                    "^/api": "" //匹配请求路径里面有 /api 替换成 https://www.xxx.cn
                },
            },
        },
    },
}