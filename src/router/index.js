import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter)
    //引入路由组件
import routes from './routes'
//引入store
import store from '@/store'
//配置路由
let router = new VueRouter({
        routes,
        //滚动行为
        scrollBehavior(to, from, savePosition) {
            return { y: 0 }
        }
    })
    //全局前置路由守卫
router.beforeEach(async(to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户已登录
    if (token) {
        if (to.path == '/login') {
            next('/')
        } else {
            if (name) {
                next();
            } else {
                try {
                    //获取用户信息展示
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效，清除token
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
        //用户未登录
    } else {
        //用户未登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
            //登录后，直接跳转到被守卫的路径
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router