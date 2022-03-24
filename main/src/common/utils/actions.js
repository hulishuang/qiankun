import { initGlobalState } from "qiankun";

const initialState = {
  test: 'main'
};

// 初始化 state
const actions = initGlobalState(initialState);
actions.onGlobalStateChange((state, prev) => {
  console.log("主应用: 变更前");
  console.log(prev);
  console.log("主应用: 变更后");
  console.log(state);
});

export default actions