export const state = () => ({
    educationalLevels: []
    
  });
  
  export const getters = {
    educationalLevels: state => state.educationalLevels
  };
  
  export const actions = {
    async loadEduLevel({commit}){
      let res = await this.$axios.get("/employee-management/education")
      if(res.status == 200){
        commit("SET_EDULEVEL",res.data)
      }
    },
    async addEduLevel({ commit }, educationalLevel) {
      console.log("add")
      let res = await this.$axios.post("/employee-management/education",educationalLevel)
      commit("ADD_EDULEVEL", res.data);
    },
    async removeEduLevel({ commit }, id) {
      console.log("remove")
      let res = await this.$axios.delete(`/employee-management/education/${id}`)
      console.log(res.data)
      if (res.status == 200) {
        commit("REMOVE_EDULEVEL", id)
      }
    },
    async updateEduLevel({ commit }, level) {
      commit("UPDATE_EDULEVEL", level);
    }
  };
  
  export const mutations = {
    SET_EDULEVEL(state,payload){
      state.educationalLevels = payload
    },
    ADD_EDULEVEL(state, payload) {
      state.educationalLevels.push(payload);
    },
    REMOVE_EDULEVEL(state, payload) {
      state.educationalLevels = state.educationalLevels.filter(edulevel => 
        edulevel.id !== payload
      );
    },
    UPDATE_EDULEVEL(state, payload) {
      const edulevel = state.educationalLevels.find(
        edulevel => edulevel.id == payload.id
      );
      const index = state.educationalLevels.indexOf(edulevel);
      state.educationalLevels.splice(index, 1, payload);
    }
  };
  
  
  
  