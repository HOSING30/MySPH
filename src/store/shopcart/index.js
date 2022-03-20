import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
//购物车页面仓库
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, getCartList) {
        state.cartList = getCartList
    }
};
const actions = {
    //获取购物车列表
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车中一个商品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'success'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    //修改商品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'success'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //删除勾选的商品
    async deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : "";
            //将遍历的每个promise放入数组中
            PromiseAll.push(promise)
        });
        //当数组所有元素为true才返回true
        return Promise.all(PromiseAll)
    },
    //修改全部商品状态
    async updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked });
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}