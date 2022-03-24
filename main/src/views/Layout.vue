<template>
  <div class="layout-wrapper">
    <div class="layout-header">
      <ul class="sub-apps">
        <li
          v-for="item in microApps"
          :class="{ active: item.isActive }"
          :key="item.name"
          @click="goto(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="userinfo" @click="clickTest">{{test}}</div>
    </div>
    <div class="layout-content">
      <div class="layout-left">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <template v-for="item in navList">
            <el-menu-item @click="handleOpen(item)" :index="item.id" :key="item.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="content">
        <div v-show="$route.path.includes('indexSub')">我是首页</div>
        <div
          v-html="contentStorage['vue-app']"
        ></div>
        <div
          v-html="contentStorage['vue-test']"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import microApps from "../config/config"
import actions from "@/common/utils/actions"

export default {
  name: "layout",
  data() {
    return {
      microApps,
      test: "点击我变更",
      contentStorage: {},
      navList: [],
    };
  },
  computed: {},
  props: {
    //  子系统html
    content: String,
  },
  watch: {
    content: {
      handler(val, oldVal) {
        console.log("handler", oldVal, val);
        const systemName = window.location.pathname.split("/")[2];
        if (systemName && !this.contentStorage[systemName]) {
          this.$set(this.contentStorage, systemName, this.content);
        }
      },
      immediate: true,
    },
    '$route': {
      handler({ path }) {
        this.$nextTick(() => {
          this.microApps.forEach(item => {
            item.isActive = false
            if (path.includes(item.activeRule)) {
              item.isActive = true
            }
          })
          this.getList(path)
        })
      },
      immediate: true
    }
  },
  components: {},
  methods: {
    // 变更数据
    clickTest() {
      actions.setGlobalState({ test: 'main-initGlobalState发生了变更（main=>子系统）' })
    },
    getList(path) {
      if (path.includes("vue-app")) {
          this.navList = [
            { id: "1", title: "导航一",  name: 'about', type: 'vue-app' },
            { id: "2", title: "导航二", name: 'home', type: 'vue-app' },
          ];
        } else {
            this.navList = [
              { id: "3", title: "导航三", name: 'about', type: 'vue-test' },
              { id: "4", title: "导航四", name: 'home', type: 'vue-test' },
            ];
        }
    },
    handleOpen(item) {
      if (!this.contentStorage[item.name]) {
        this.$router.push({ path: `/app/${item.type}/${item.name}` })
      }
      window.RXGW.subject.next({
        target: [item.type],
        type: 'router',
        data: { path: '/' + item.name }
      })
    },
    handleClose(e) {
      console.log("handleClose", e);
    },
    goto(item) {
      for (const citem of this.microApps) {
        citem.isActive = false
      }
      item.isActive = true
      this.getList(item.activeRule)
      // if (item.name === "vue-app") {
      //   this.navList = [
      //     { id: "1", title: "导航一",  name: 'about', type: 'vue-app' },
      //     { id: "2", title: "导航二", name: 'home', type: 'vue-app' },
      //   ];
      // } else {
      //   this.navList = [
      //     { id: "3", title: "导航三", name: 'about', type: 'vue-test' },
      //     { id: "4", title: "导航四", name: 'home', type: 'vue-test' },
      //   ];
      // }
      // this.$router.push({ path: item.activeRule });
    }
  },
  created() {
    // this.goto({})
  },
  mounted() {
    actions.onGlobalStateChange((state) => {
      this.test = state.test;
    }, false) // true为立即执行
    // 接收通知
    window.RXGW.subject
      .filter((subjectData) => subjectData.target.includes('changeMain') && subjectData.type === "main")
      .subscribe({
        next: (subjectData) => {
          this.test = subjectData.data.test
          console.log('window', window.test)
        }
      });
  },
};
</script>

<style lang="scss">
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
.layout-content {
  height: calc(100% - 50px);
  display: flex;
  .layout-left {
    .el-menu {
      height: calc(100vh - 50px);
    }
  }
  .content {
    height: calc(100vh - 96px);
    overflow-y: auto;
    width: 100%;
    border-radius: 0 5px 5px 5px;
  }
}
</style>
