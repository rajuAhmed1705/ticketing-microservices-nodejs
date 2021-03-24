export const state = () => ({
  rules: []
});

export const getters = {
  rules: (state) => state.rules,
};

export const actions = {
  async loadRule({ commit }) {
    let res = await this.$axios.get("/employee-management/confirmation-rule");
    if (res.status == 200) {
      commit("SET_RULE",res.data);
    }
    else
    {
      this.$notifier.showMessage({
        content: "Something went wrong!",
        color: "red",
      });
    }
  },
  async addRule({ commit }, rule) {
    let res = await this.$axios.post(
      "/employee-management/confirmation-rule",
      rule
    );
    if (res.status == 201) {
      commit("ADD_RULE", res.data);
      this.$notifier.showMessage({
        content: "Congrats!Successfully added one value!",
        color: "success",
      });
    }
    else
    {
      this.$notifier.showMessage({
        content: "Something went wrong!",
        color: "red",
      });
    }
  },
  async removeRule({ commit }, id) {
    let res = await this.$axios.delete(
      `/employee-management/confirmation-rule/${id}`
    );
    if(res.status == 200){
    commit("REMOVE_RULE", id);
    this.$notifier.showMessage({
      content: "Congrats!Successfully deleted one value!",
      color: "red",
    });
  }
  else
  
    {
      this.$notifier.showMessage({
        content: "Something went wrong!",
        color: "red",
      });
    }
  },
  async updateRule({ commit }, rule) {
    let res = await this.$axios.put(
      `/employee-management/confirmation-rule/${rule.id}`,
      rule
    );
    if(res.status == 200){
    commit("UPDATE_RULE", rule);
    this.$notifier.showMessage({
      content: "Congrats!Successfully updated one value!",
      color: "warning",
    });
    }
    else
    {
      this.$notifier.showMessage({
        content: "Something went wrong!",
        color: "red",
      });
    }
  },
};

export const mutations = {
  SET_RULE(state, payload) {
    state.rules = payload;
  },
  ADD_RULE(state, payload) {
    state.rules.push(payload);
  },
  REMOVE_RULE(state, payload) {
    state.rules = state.rules.filter(rule => 
      rule.id !== payload
    );
  },
  UPDATE_RULE(state, payload) {
    const rule = state.rules.find(rule => rule.id == payload.id);

    const index = state.rules.indexOf(rule);
    state.rules.splice(index, 1, payload);
  },
};
