<template>
  <div class="home">
    <h1>vue2 Home</h1>
    <div>{{test}}</div><button @click="clickAction">ivue-app2-initGlobalState发生变更（子系统=>main）</button>
  </div>
</template>

<script>
import actions from "@/common/utils/actions"
export default {
  name: "Home",
  data() {
    return {
      test: "vue-app2数据监听变化"
    };
  },
  watch: {},
  props: {},
  components: {},
  computed: {},
  created() {
    window.a = 'test'
  },
  methods: {
    clickAction() {
      actions.setGlobalState({ test: 'vue-app2-initGlobalState点击了（子系统=>main）' })
    }
  },
  mounted() {
    console.log('window.a', window.a)
    actions.onGlobalStateChange((state) => {
      this.test = state.test;
    }, false) // true:监听器时立即执行一次回调函数
  },
};
</script>
<style>
