import { reqGetSearchInfo } from '@/api'
//search模块小仓库
//仓库存储数据的地方
const state = {
    searchList: {}
};
//修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, getSearchList) {
        state.searchList = getSearchList
    }
};
//处理业务逻辑或者处理异步
const actions = {
    async getSearchList({ commit }, params) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
//类似计算属性，简化仓库数据
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}