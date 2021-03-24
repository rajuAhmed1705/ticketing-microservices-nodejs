export const state = () => ({
  designations: [],
})

export const getters = {
  designations: state => state.designations,
}

export const actions = {
  async loadDesignation({ commit }) {
    let res = await this.$axios.get("/employee-management/designation")
    // console.log(res.data)
    if (res.status == 200) {
      commit("SET_DESIGNATION", res.data)
    }
    else
    {
      this.$notifier.showMessage({
        content: "Something went wrong!",
        color: "red",
      });
    }
  },
  async addDesignation({ commit }, designation) {
    let res = await this.$axios.post(
      "/employee-management/designation",
      designation
    )

    if (res.status == 201) {
      commit("ADD_DESIGNATION", res.data)
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
  async removeDesignation({ commit }, id) {
    let res = await this.$axios.delete(`/employee-management/designation/${id}`)
    if (res.status == 200) {
      commit("REMOVE_DESIGNATION", id)
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
  async updateDesignaton({ commit }, designation) {
    let res = await this.$axios.put(
      `/employee-management/designation/${designation.id}`,
      designation
    )
    console.log(res)
    if (res.status == 200) {
      commit("UPDATE_DESIGNATION", designation)
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
  SET_DESIGNATION(state, payload) {
    state.designations = payload
  },
  ADD_DESIGNATION(state, payload) {
    console.log(payload)
    state.designations.push(payload)
  },

  REMOVE_DESIGNATION(state, payload) {
    console.log(payload)
    state.designations = state.designations.filter(
      designation => designation.id !== payload
    )
  },
  UPDATE_DESIGNATION(state, payload) {
    const designation = state.designations.find(
      designation => designation.id === payload.id
    )
    const index = state.designations.indexOf(designation)
    state.designations.splice(index, 1, payload)
  },
}


