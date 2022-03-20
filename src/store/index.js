import Vue from 'vue';
import Vuex from 'vuex';
//引入模块
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import user from './uesr'
import trade from './trade'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})