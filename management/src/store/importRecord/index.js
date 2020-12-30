import req from "../../requests/importRecord";
const importRecord = {
  state: {
    importRecords: [],
    importRecordPages: {
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
    },
  },
  mutations: {
    importRecords(state, value) {
      state.importRecords = value;
    },
    importRecordPages(state, value) {
      state.importRecordPages = value;
    },
  },
  actions: {
    addImportRecord({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.addImportRecord(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    updateImportRecord({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.updateImportRecord(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    getImportRecords({ commit }, payload) {
      commit("displayLoading", false);
      req.getImportRecords(payload).then((res) => {
        commit("importRecords", res.body);
        commit("importRecordPages", res.pages);
        commit("products", res.products);
        commit("displayLoading", true);
      });
    },
  },
  getters: {
    importRecords: (state) => {
      return state.importRecords;
    },
    importRecordPages: (state) => {
      return state.importRecordPages;
    },
  },
};

export default importRecord;
