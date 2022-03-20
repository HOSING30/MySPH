//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css";
//引入当前模块中的store
import store from '@/store'
//创建axios实例
const requests = axios.create({
        //基础路径
        baseURL: "/api",
        //请求超时的时间
        timeout: 5000
    })
    //请求拦截器
requests.interceptors.request.use((config) => {
        //config是一个配置对象，包含headers请求头
        if (store.state.detail.uuid_token) {
            config.headers.userTempId = store.state.detail.uuid_token;
        }
        //需要带token给服务器
        if (store.state.user.token) {
            config.headers.token = store.state.user.token
        }
        nprogress.start();
        return config;
    })
    //响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
})

export default requests;