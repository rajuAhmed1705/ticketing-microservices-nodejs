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

    commit("SET_PROJECT", res.data);
  },

  async addProject({ commit }, project) {
    // console.log("hello");
    let res = await this.$axios.post("/employee-management/project", project);
    // console.log(res.data);
    if (res.status == 201) {
      commit("ADD_PROJECT", project);
    }
  },
  async removeProject({ commit }, id) {
    let res = await this.$axios.delete(`/employee-management/project/${id}`);
    // console.log(res);
    if (res.status == 200) {
      commit("REMOVE_PROJECT", id);
    }
  },
  async updateProject({ commit }, project) {
    let res = await this.$axios.put(
      `/employee-management/project/${project.id}`,
      project
    );
    // console.log(res);
    if (res.status == 200) {
      commit("UPDATE_PROJECT", project);
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
    state.projects = state.projects.filter((project) => {
      project.id !== payload;
    });
  },
  UPDATE_PROJECT(state, payload) {
    const project = state.projects.find((project) => project.id === payload.id);
    console.log(project.id);
    const index = state.projects.indexOf(project);
    state.projects.splice(index, 1, payload);
  },
};
