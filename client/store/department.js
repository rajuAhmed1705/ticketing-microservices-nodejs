export const state = () => ({
  departments: [],
});

export const getters = {
  departments: (state) => state.departments,
};

export const actions = {
  async loadDepartment({ commit }) {
    let res = await this.$axios.get("/employee-management/department");
    if (res.status == 200) {
      commit("SET_DEPARTMENT", res.data);
    }
  },
  async addDepartment({ commit }, department) {
    // console.log();
    let res = await this.$axios.post(
      "/employee-management/department",
      department
    );

    if (res.status == 201) {
      // consol.log("add :");
      // console.log(res);
      commit("ADD_DEPARTMENT", department);
    }
  },
  async removeDepartment({ commit }, id) {
    console.log("hello");
    let res = await this.$axios.delete(`/employee-management/department/${id}`);
    console.log("remove :");
    // console.log(res);
    if (res.status == 200) {
      console.log("Department removed");
      commit("REMOVE_DEPARTMENT", id);
    }
  },
  async updateDepartment({ commit }, department) {
    let res = await this.$axios.put(
      `/employee-management/department/${department.id}`,
      department
    );
    console.log(res);
    if (res.status == 200) {
      commit("UPDATE_DEPARTMENT", department);
    }
  },
};

export const mutations = {
  SET_DEPARTMENT(state, payload) {
    // console.log("Pyload : ");
    // console.log(payload);
    state.departments = payload;
  },
  ADD_DEPARTMENT(state, payload) {
    state.departments.push(payload);
  },

  REMOVE_DEPARTMENT(state, payload) {
    state.departments = state.departments.filter((department) => {
      department.id !== payload;
    });
    // console.log(department.title);
  },
  UPDATE_DEPARTMENT(state, payload) {
    const department = state.departments.find(
      (department) => department.id === payload.id
    );
    // console.log(department.id);
    const index = state.departments.indexOf(department);
    state.departments.splice(index, 1, payload);
  },
};
