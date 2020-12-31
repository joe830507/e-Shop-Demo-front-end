import req from "../../requests/purchaseRecord";
const purchaseRecord = {
  state: {},
  mutations: {},
  actions: {
    getPurchaseRecords({ commit }, payload) {
      commit("displayLoading", false);
      req.getPurchaseRecords(payload).then((res) => {
        console.log(res);
        commit("displayLoading", true);
      });
    },
  },
  getters: {},
};
export default purchaseRecord;
