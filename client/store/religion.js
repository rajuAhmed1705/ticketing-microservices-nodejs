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
    else
    {
      this.$notifier.showMessage({ content: "Something went wrong!", color: "red" });
    }
  },
  async addReligion({ commit }, religion) {
    let res = await this.$axios.post("/employee-management/religion",religion)
    if(res.status == 201){
    commit("ADD_RELIGION", res.data);
    this.$notifier.showMessage({ content: "Congrats!Successfully added one value!", color: "green" });
    }
    else
    {
      this.$notifier.showMessage({ content: "Something went wrong!", color: "red" });
    }
  },
  async removeReligion({ commit }, id) {
    let res = await this.$axios.delete(`/employee-management/religion/${id}`)
    if(res.status == 200){
    commit("REMOVE_RELIGION", id);
    this.$notifier.showMessage({ content: "Congrats!Successfully deleted one value!", color: "red" });
    }
    else
    {
      this.$notifier.showMessage({ content: "Something went wrong!", color: "red" });
    }
  },
  async updateReligion({ commit }, religion) {
    console.log("updated")
    let res = await this.$axios.put(`/employee-management/religion/${religion.id}`,religion)
    console.log(res.data)
    if(res.data == 200){
    commit("UPDATE_RELIGION", religion);
    this.$notifier.showMessage({ content: "Congrats!Successfully updated one value!", color: "warning" });
    }
    else
    {
      this.$notifier.showMessage({ content: "Something went wrong!", color: "red" });
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
