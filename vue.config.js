module.exports = {
    // 减少打包后Map文件
    productionSourceMap: false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    //配置代理跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://39.98.123.211",
            },
        },
    },
};