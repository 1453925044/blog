// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
// const path = require('path');
// // gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');


module.exports = {
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: false,
    pages: {
        index: {
            title: '魏先生个人博客',
            entry: 'src/main.js',
            template: 'public/index.html', //模板来源
            filename: 'index.html',//在 dist/index.html 的输出
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    /* webpack-dev-server 相关配置 */
    devServer: {
        open: true,//配置自动启动浏览器
        host: '0.0.0.0',//所有的地址均能访问
        port: 8088,
        https: false, //是否开启https
        disableHostCheck: true,
        /* 使用代理 */
        proxy: {
            '/api': {
                target: 'http://weichaooqx.com/api',// 本地接口的域名
                // target: 'http://localhost:3000',// 本地接口的域名
                ws: false,
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置，为true的话，请求的header将会设置为匹配目标服务器的规则（Access-Control-Allow-Origin）
                pathRewrite: {
                    '^/api': ''//本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉 
                }
            }
        },
    },
    // 第三方插件配置
    pluginOptions: {},
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return;
        return {
            plugins: [
                // 开启gzip压缩
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.js$|\.css$|\.html$/,
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                }),
            ],
        };
    }
}