export const state = () => ({
  turnovertypes: [],
});

export const getters = {
  turnovertypes: (state) => state.turnovertypes,
};

export const actions = {
  async loadTurnover({ commit }) {
    let res = await this.$axios.get("/employee-management/turnover");
    console.log(res)
    if (res.status == 200) {
      commit("SET_TURNOVER", res.data);
    }
  },
  async addTurnOver({ commit }, turnovertype) {
    let res = await this.$axios.post(
      "/employee-management/turnover",
      turnovertype
    );
    if (res.status == 201) {
      commit("ADD_TURNOVER", res.data);
    }
  },
  async removeTurnOver({ commit }, id) {
    let res = await this.$axios.delete(`/employee-management/turnover/${id}`);
    if (res.status == 200) {
      commit("REMOVE_TURNOVER", id);
    }
  },
  async updateTurnOver({ commit }, turnovertype) {
    let res = await this.$axios.put(
      `/employee-management/turnover/${turnovertype.id}`,
      turnovertype
    );
    commit("UPDATE_TURNOVER", turnovertype);
  },
};

export const mutations = {
  SET_TURNOVER(state, payload) {
    state.turnovertypes = payload;
  },
  ADD_TURNOVER(state, payload) {
    state.turnovertypes.push(payload);
  },
  REMOVE_TURNOVER(state, payload) {
    state.turnovertypes = state.turnovertypes.filter((turnover) => {
      turnover.id !== payload;
    });
  },
  UPDATE_TURNOVER(state, payload) {
    const turnover = state.turnovertypes.find(
      (turnover) => turnover.id == payload.id
    );
    const index = state.turnovertypes.indexOf(turnover);
    state.turnovertypes.splice(index, 1, payload);
  },
};
