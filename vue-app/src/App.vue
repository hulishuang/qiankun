<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="home">Home</router-link> |
      <router-link to="about">About</router-link>
    </div> -->
    <div>{{ test }}</div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      test: "我是app1",
    };
  },
  watch: {},
  props: {},
  components: {},
  computed: {},
  methods: {},
  created() {
    window.RXGW.subject
      .filter((subjectData) => subjectData.target.includes(process.env.VUE_APP_SYS_NAME) && subjectData.type === "router")
      .subscribe({
        next: (subjectData) => {
          const path = subjectData.data.path;
          if (this.$router.history.current.path !== path) {
            this.$router.push({ path });
          }
        },
      });
  },
  mounted() {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
