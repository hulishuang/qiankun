<template>
  <div class="login">
    <div class="l-text">登录</div>
    <el-input v-model="inputName" placeholder="请输入内容"></el-input>
    <el-input v-model="inputPwd" placeholder="请输入内容"></el-input>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      inputName: "",
      inputPwd: "",
    };
  },
  computed: {},
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions(['LOGIN_INIT']),
    login() {
      console.log('this.LOGIN_INIT', this.LOGIN_INIT)
      const user = 'test'
      const token = '1212122'
      this.LOGIN_INIT({ user, token }).then((res) => {
        console.log('res', res)
        // 跳转路由
        this.$router.push({ path: "/index" });
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
.login {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 150px;
  .l-text {
    width: 100%;
    text-align: center;
    margin-bottom: 50px;
  }
  .el-input {
    width: 60%;
    margin-bottom: 10px;
  }
  .el-button {
    width: 60%;
  }
}
</style>
