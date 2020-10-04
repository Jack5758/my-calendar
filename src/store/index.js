import { createStore } from "vuex";

export default createStore({
  state: {
      renderNewDate: new Date(),
      today: new Date().getDate(),
      dayOfWeek: ['日', '月', '火', '水', '木', '金', '土'],
      reRenderKey: 1,
  },
  mutations: {},
  actions: {},
  modules: {}
});
