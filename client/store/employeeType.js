export const state = () => ({
  employeetypes: [],
})

export const getters = {
  employeetypes: state => state.employeetypes,
}

export const actions = {
  async fetchEmpType({ commit }) {
    let res = await this.$axios.get("/employee-management/employment-type")
    if (res.status == 200) {
      // console.log(res.data)
      commit("SET_EMPTYPE", res.data)
    }
    else
    {
      this.$notifier.showMessage({
        content: "Something went wrong!",
        color: "red",
      });
    }
  },
  async addEmpType({ commit }, employeetype) {
    let res = await this.$axios.post(
      "/employee-management/employment-type",
      employeetype
    )
    if (res.status == 201) {
      commit("ADD_EMPTYPE", res.data)
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
  async removeEmpType({ commit }, id) {
    let res = await this.$axios.delete(
      `/employee-management/employment-type/${id}`
    )
    if (res.status == 200) {
      commit("REMOVE_EMPTYPE", id)
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
  async updateEmpType({ commit }, employeetype) {
    let res = await this.$axios.put(
      `/employee-management/employment-type/${employeetype.id}`,
      employeetype
    )
    if (res.status == 200) {
      commit("UPDATE_EMPTYPE", employeetype)
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
  SET_EMPTYPE(state, payload) {
    state.employeetypes = payload
  },
  ADD_EMPTYPE(state, payload) {
    state.employeetypes.push(payload)
  },
  REMOVE_EMPTYPE(state, payload) {
    state.employeetypes = state.employeetypes.filter(employeetype => 
      employeetype.id !== payload
    )
  },
  UPDATE_EMPTYPE(state, payload) {
    const employeetype = state.employeetypes.find(
      employeetype => employeetype.id == payload.id
    )
    const index = state.employeetypes.indexOf(employeetype)
    state.employeetypes.splice(index, 1, payload)
  },
}
