<template>
  <div>
    <Header></Header>
    <!-- 路由组件 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>

import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  mounted() {
    //通过Vuex发送请求，获取数据，存储到仓库
    //全局组件TypeNav需要categoryList；放在App根组件，只挂载一次，所以只执行一次，提高性能
    this.$store.dispatch('categoryList')
  },
}
</script>
<style scoped>
  
</style>

