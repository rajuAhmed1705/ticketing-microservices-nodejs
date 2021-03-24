export const state = () => ({
  projects: [],
});

export const getters = {
  projects: (state) => state.projects,
};

export const actions = {
  async loadProject({ commit }) {
    // console.log("hello");
    let res = await this.$axios.get("/employee-management/project");
    if(res.status == 200){
    commit("SET_PROJECT", res.data);
    }
    else
    {
      this.$notifier.showMessage({
        content: "Something went wrong!",
        color: "red",
      });
    }
  },

  async addProject({ commit }, project) {
    // console.log("hello");
    let res = await this.$axios.post("/employee-management/project", project);
    // console.log(res.data);
    if (res.status == 201) {
      commit("ADD_PROJECT", res.data);
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
  async removeProject({ commit }, id) {
    let res = await this.$axios.delete(`/employee-management/project/${id}`);
    // console.log(res);
    if (res.status == 200) {
      commit("REMOVE_PROJECT", id);
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
  async updateProject({ commit }, project) {
    let res = await this.$axios.put(
      `/employee-management/project/${project.id}`,
      project
    );
    
    if (res.status == 200) {
      commit("UPDATE_PROJECT", project);
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
  SET_PROJECT(state, payload) {
    // console.log(payload);
    state.projects = payload;
  },
  ADD_PROJECT(state, payload) {
    state.projects.push(payload);
  },
  REMOVE_PROJECT(state, payload) {
    state.projects = state.projects.filter(project => 
      project.id !== payload
    );
  },
  UPDATE_PROJECT(state, payload) {
    const project = state.projects.find((project) => project.id === payload.id);
    console.log(project.id);
    const index = state.projects.indexOf(project);
    state.projects.splice(index, 1, payload);
  },
};
