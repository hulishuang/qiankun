<template>
  <div class="about">
    <h1>vue2 abort</h1>
    <div>{{ test }}</div>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      test: "vue-app2数据监听变化",
    };
  },
  watch: {},
  props: {},
  components: {},
  computed: {},
  created() {
  },
  methods: {},
  mounted() {
    window.RXGW.subject
      .filter(
        (subjectData) =>
          subjectData.target.includes('changeVueTest') &&
          subjectData.type === "vueTest"
      )
      .subscribe({
        next: (subjectData) => {
          this.test = subjectData.data.test
          console.log('window', window.test)
        }
      });
  }
};
</script>
<style>
.about {
  color: blue;
}
</style>