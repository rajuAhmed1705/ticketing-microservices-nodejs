export const state = () => ({
    bankDetails: [],
  
});

export const getters = {
  bankDetails: state => state.bankDetails
}

export const actions = {
  async loadBank({ commit }) {
    let res = await this.$axios.get("/employee-management/bank")
    if (res.status == 200) {
      commit("SET_BANK", res.data)
    }
  },
  async addBank({ commit }, bankDetail) {
    let res = await this.$axios.post("/employee-management/bank",bankDetail)
    console.log(res.data)
    if(res.status == 201){
    commit("ADD_BANK", res.data);
    }
  },
  async removeBank({ commit }, id) {
    let res = await this.$axios.delete(`/employee-management/bank/${id}`)
    if(res.status == 200){
    commit("REMOVE_BANK", id);
    }
  },
  async updateBank({ commit },bankDetail) {
    let res = await this.$axios.put(`/employee-management/bank/${bankDetail.id}`)
    if(res.status == 200){
    commit("UPDATE_BANK",bankDetail);
    }
  }
};

export const mutations = {
  SET_BANK(state,payload){
    state.bankDetails = payload
  },
  ADD_BANK(state, payload) {
    state.bankDetails.push(payload);
  },
  REMOVE_BANK(state, payload) {
    state.bankDetails = state.bankDetails.filter(bank => {
      bank.id !== payload;
    });
  },
  UPDATE_BANK(state, payload) {
    const bank = state.bankDetails.find(
      bank => bank.id == payload.name
    );
    const index = state.bankDetails.indexOf(bank);
    state.bankDetails.splice(index, 1, payload);
  }
};



