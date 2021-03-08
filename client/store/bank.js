export const state = () => ({
    bankDetails: [
    {
        name:'City Bank',
        branch:'Gulshan',
        country: 'Bangladesh'
      }
    
  ]
  
});

export const getters = {
  bankDetails: state => state.bankDetails
};

export const actions = {
  // async fetchRule({commit}){
  //     commit("SET_RULE")
  // },
  async addBank({ commit }, name) {
    commit("ADD_BANK", name);
  },
  async removeBank({ commit }, id) {
    commit("REMOVE_BANK", id);
  },
  async updateBank({ commit },name) {
    commit("UPDATE_BANK",name);
  }
};

export const mutations = {
    ADD_BANK(state, payload) {
    state.bankDetails.push(payload);
  },
  REMOVE_BANK(state, payload) {
    state.bankDetails = state.bankDetails.filter(rule => {
      rule.ruleInfo.id !== payload;
    });
  },
  UPDATE_BANK(state, payload) {
    const bank = state.bankDetails.find(
      bank => bank.name == payload.name
    );
    const index = state.rule.indexOf(bank);
    state.bankDetails.splice(index, 1, payload);
  }
};



