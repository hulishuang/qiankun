<template>
  <div id="container">
    <router-view v-if="!isChildApp" />
    <layout
      v-show="isChildApp"
      v-sys-loading="loading"
      :isLoadingSys="loading"
      :isChildApp="isChildApp"
      :content="content"
      :isSub="true"
    ></layout>
  </div>
</template>

<script>
import Layout from '@views/Layout.vue'
export default {
  name: "App",
  data() {
    return {
    };
  },
  props: {
    loading: Boolean,
    content: String,
  },
  components: {
    'layout': Layout
  },
  computed: {
    isChildApp() {
      console.log(
        "this.$route.path.match",
        this.$route.path,
        this.$route.path.match("/app/")
      );
      return (
        this.$route.path.match("/app/") || this.$route.path === "/indexSub"
      );
    },
  },
  methods: {
    goto(item) {
      history.pushState(null, item.activeRule, item.activeRule);
      // this.current = item.name
    },
    listenRouterChange() {
      const _wr = function (type) {
        const orig = history[type];
        return function () {
          const rv = orig.apply(this, arguments);
          const e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
        };
      };
      history.pushState = _wr("pushState");

      window.addEventListener("pushState", this.bindCurrent);
      window.addEventListener("popstate", this.bindCurrent);

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("pushState", this.bindCurrent);
        window.removeEventListener("popstate", this.bindCurrent);
      });
    },
  },
  created() {
    console.log('created', this.content)
  },
  mounted() {},
};
</script>

<style lang="scss">
#layout-wrapper {
  height: 40px;
  background: red;
}
.layout-header {
  height: 50px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 50px;
  position: relative;
  .logo {
    float: left;
    margin: 0 50px;
  }
  .sub-apps {
    list-style: none;
    margin: 0;
    li {
      list-style: none;
      display: inline-block;
      padding: 0 20px;
      cursor: pointer;
      &.active {
        color: #42b983;
        text-decoration: underline;
      }
    }
  }
  .userinfo {
    position: absolute;
    right: 100px;
    top: 0;
  }
}
</style>
