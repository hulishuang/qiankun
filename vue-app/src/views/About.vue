<template>
  <div class="about">
    <h1>app1 abort</h1>
    <div>{{test}}</div><button @click="clickAction">initGlobalState发生变更（子系统=>main）</button>
  </div>
</template>
<script>
import actions from "@/common/utils/actions"
export default {
  name: "About",
  data() {
    return {
      test: "vue-app数据监听变化"
    };
  },
  watch: {},
  props: {},
  components: {},
  computed: {},
  created() {
  },
  methods: {
    clickAction() {
      actions.setGlobalState({ test: 'vue-app -initGlobalState发生变更（子系统=>main）' })
    }
  },
  mounted() {
    window.a = 'vue-app'
    actions.onGlobalStateChange((state) => {
      this.test = state.test;
    }, false) // true:监听器时立即执行一次回调函数
  },
};
</script>
<style>
.about {
  color: red;
}
</style>

