export const state = () => ({
    educationalLevels: [
        {
            level:'B.Sc'
      },
    ]
    
  });
  
  export const getters = {
    educationalLevels: state => state.educationalLevels
  };
  
  export const actions = {
    async addEduLevel({ commit }, level) {
      commit("ADD_EDULEVEL", level);
    },
    async removeEduLevel({ commit }, id) {
      commit("REMOVE_EDULEVEL", id);
    },
    async updateEduLevel({ commit }, level) {
      commit("UPDATE_EDULEVEL", level);
    }
  };
  
  export const mutations = {
    ADD_EDULEVEL(state, payload) {
      state.educationalLevels.push(payload);
    },
    REMOVE_EDULEVEL(state, payload) {
      state.educationalLevels = state.educationalLevels.filter(edulevel => {
        edulevel.id !== payload;
        console.log(empstatus.name);
        console.log("payload", payload);
      });
    },
    UPDATE_EDULEVEL(state, payload) {
      const edulevel = state.educationalLevels.find(
        edulevel => edulevel.id == payload.id
      );
      const index = state.educationalLevels.indexOf(edulevel);
      state.educationalLevels.splice(index, 1, payload);
    }
  };
  
  
  
  