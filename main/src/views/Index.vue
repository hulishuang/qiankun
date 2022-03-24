<template>
  <div class="home-container">
      <template v-for="item in modelList">
        <div :key="item.id" class="hc-content" @click.stop="toOtherSystemRoute(item, item.code)">
          <img :src="item.bgImage" alt="" class="hc-bg">
          <span @click.stop="toOtherSystemRoute(item, item.code)" class="square">
            <div class="hc-bottom">
              {{item.name}}
            </div>
          </span>
        </div>
      </template>
    </div>
</template>

<script>
// import { loadMicroApp } from 'qiankun'
// import actions from "@/common/utils/actions"
export default {
  name: 'Index',
  data() {
    return {
      modelList: [
        {
          routeName: 'vue-app',
          name: 'vue-app',
          bgImage: 'https://img1.baidu.com/it/u=3886212450,854269223&fm=26&fmt=auto&gp=0.jpg'
        },
        {
          routeName: 'vue-test',
          name: 'vue-test',
          bgImage: 'https://img1.baidu.com/it/u=3886212450,854269223&fm=26&fmt=auto&gp=0.jpg'
        }
      ]
    }
  },
  computed: {
  },
  props: {
  },
  watch: {
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
    toOtherSystemRoute(item) {
      // actions.setGlobalState({ test: '我要发生变更' })
      this.$router.push({ path: `/app/${item.routeName}` })
      // this.$router.push({ path: `/app/indexSub`, query: JSON.stringify(item.routeName) })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.home-container {
  display: flex;
  flex-wrap: wrap;
 .hc-content {
   width: 100px;
   height: 100px;
   margin-right: 10px;
   cursor: pointer;
   img {
     width: 100px;
     height: 100px;
   }
 } 
}
</style>
