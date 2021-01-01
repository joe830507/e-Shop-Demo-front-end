const loading = {
  state: {
    displayLoading: true,
  },
  mutations: {
    displayLoading(state, value) {
      state.displayLoading = value;
    },
  },
  getters: {
    displayLoading(state) {
      return state.displayLoading;
    },
  },
};

export default loading;
