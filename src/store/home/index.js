//home模块小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api';
//search模块小仓库
//仓库存储数据的地方
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
};
//修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList.slice(0, 16);
    },
    GETBANNERLIST(state, getBannerList) {
        state.bannerList = getBannerList
    },
    GETFLOORLIST(state, getFloorList) {
        state.floorList = getFloorList
    }
};
//处理业务逻辑或者处理异步
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            state.categoryList.length = 16
            commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
};
//类似计算属性，简化仓库数据
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}