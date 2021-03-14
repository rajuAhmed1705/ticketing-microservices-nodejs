export const state = () => ({
  religions: [],
});

export const getters = {
  religions: (state) => state.religions,
};

export const actions = {
  async loadReligion({ commit }) {
    let res = await this.$axios.get("/employee-management/religion");
    if(res.status == 200){
    commit("SET_RELIGION",res.data);
    }
  },
  async addReligion({ commit }, religion) {
    let res = await this.$axios.post("/employee-management/religion",religion)
    if(res.status == 201){
    commit("ADD_RELIGION", res.data);
    }
  },
  async removeReligion({ commit }, id) {
    let res = await this.$axios.delete(`/employee-management/religion/${id}`)
    if(res.status == 200){
    commit("REMOVE_RELIGION", id);
    }
  },
  async updateReligion({ commit }, religion) {
    let res = await this.$axios.put(`/employee-management/religion/${religion.id}`,religion)
    if(res.data == 200){
    commit("UPDATE_RELIGION", religion);
    }
  },
};

export const mutations = {
  SET_RELIGION(state, payload) {
    state.religions = payload;
  },
  ADD_RELIGION(state, payload) {
    state.religions.push(payload);
  },
  REMOVE_RELIGION(state, payload) {
    state.religions = state.religions.filter(religion => 
      religion.id !== payload
    );
  },
  UPDATE_RELIGION(state, payload) {
    const religion = state.religions.find(
      (religion) => religion.id == payload.id
    );
    const index = state.religions.indexOf(religion);
    state.religions.splice(index, 1, payload);
  },
};
