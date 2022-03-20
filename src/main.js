import Vue from 'vue'
import App from './App.vue'
//三级联动组件-全局组件
import TypeNav from '@/components/TypeNav';
//轮播图组件-全局组件
import Carsousel from '@/components/Carousel'
//分页器组件-全局组件
import Pagination from '@/components/Pagination';
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
//引入路由
import router from '@/router'
//引入Vuex
import store from '@/store';
//引入mock数据
import '@/mock/mockServe';
// 引包---swiper样式
import 'swiper/css/swiper.css'
//统一接口api文件
import * as API from '@/api';
//引入element-ui组件
import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'
import "@/plugins/validate"
Vue.use(VueLazyload, {
    loading: atm
})
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    //配置全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    //注册路由
    router,
    //注册仓库：组件实例会多一个$store属性
    store
}).$mount('#app')