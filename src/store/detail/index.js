//home模块小仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api';
import { getUUID } from '@/utils/uuid_token'
//search模块小仓库
//仓库存储数据的地方
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
};
//修改state的唯一手段
const mutations = {
    GETGOODINFO(state, getGoodInfo) {
        state.goodInfo = getGoodInfo
    }
};
//处理业务逻辑或者处理异步
const actions = {
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    async addOrUpdateShopCart({ commit }, { skuid, skunum }) {
        //服务器写入数据成功后，没有返回数据
        let result = await reqAddOrUpdateShopCart(skuid, skunum);
        if (result.code == 200) {
            return 'success'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
};
//类似计算属性，简化仓库数据
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}