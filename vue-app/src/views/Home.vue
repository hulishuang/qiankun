<template>
  <div class="home">
    <h1>app1 home</h1>
    <div @click="changeMain">rxjs点击改变main的值</div>
    <div @click="changeVueTest">rxjs点击改变vue-test的值</div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
    };
  },
  watch: {},
  props: {},
  components: {},
  computed: {},
  created() {
    
  },
  methods: {
    changeMain() {
      window.RXGW.subject.next({
        target: ['changeMain'],
        type: 'main',
        data: { test: 'vue-app改变main的值' }
      })
      window.test = '21121221212121'
    },
    changeVueTest() {
      window.RXGW.subject.next({
        target: ['changeVueTest'],
        type: 'vueTest',
        data: { test: 'vue-app改变vueTest的值' }
      }) 
      window.test = '21121221212121'
    }
  },
  mounted() {
  },
};
</script>
