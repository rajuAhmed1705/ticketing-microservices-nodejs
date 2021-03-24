export const state = () => ({
  departments: [],
})

export const getters = {
  departments: state => state.departments,
}

export const actions = {
  async loadDepartment({ commit }) {
    let res = await this.$axios.get("/employee-management/department")
    if (res.status == 200) {
      commit("SET_DEPARTMENT", res.data)
    }
    else
    {
      this.$notifier.showMessage({
        content: "Something went wrong!",
        color: "red",
      });
    }
  },
  async addDepartment({ commit }, department) {
    let res = await this.$axios.post(
      "/employee-management/department",
      department
    )

    if (res.status == 201) {
      commit("ADD_DEPARTMENT", res.data)
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
  async removeDepartment({ commit }, id) {
    let res = await this.$axios.delete(`/employee-management/department/${id}`)
    if (res.status == 200) {
      commit("REMOVE_DEPARTMENT", id)
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
  async updateDepartment({ commit }, department) {
    let res = await this.$axios.put(
      `/employee-management/department/${department.id}`,
      department
    )
    
    if (res.status == 200) {
      commit("UPDATE_DEPARTMENT", department)
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
}

export const mutations = {
  SET_DEPARTMENT(state, payload) {
    state.departments = payload
  },
  ADD_DEPARTMENT(state, payload) {
    // console.log(payload)
    state.departments.push(payload)
  },

  REMOVE_DEPARTMENT(state, payload) {
    // console.log(payload)
    state.departments = state.departments.filter(
      department => department.id !== payload
    )
  },
  UPDATE_DEPARTMENT(state, payload) {
    const department = state.departments.find(
      department => department.id === payload.id
    )
    const index = state.departments.indexOf(department)
    state.departments.splice(index, 1, payload)
  },
}
