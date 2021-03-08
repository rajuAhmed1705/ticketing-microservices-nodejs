export const state = () => ({
    skills: [
    { 
      id:1,
      skillName:'Vue'
    }
  ]
  
});

export const getters = {
    skills: state => state.skills
};

export const actions = {
  // async fetchRule({commit}){
  //     commit("SET_RULE")
  // },
  async addSkill({ commit }, skillName) {
    commit("ADD_SKILL", skillName);
  },
  async removeSkill({ commit }, id) {
    commit("REMOVE_SKILL", id);
  },
  async updateSkill({ commit },skillName) {
    commit("UPDATE_SKILL",skillName);
  }
};

export const mutations = {
    ADD_SKILL(state, payload) {
    state.skills.push(payload);
  },
  REMOVE_SKILL(state, payload) {
    state.skills = state.skills.filter(skill => {
        skill.id !== payload;
    });
  },
  UPDATE_SKILL(state, payload) {
    const skill = state.skills.find(
        skill => skill.id == payload.id
    );
    const index = state.skills.indexOf(skill);
    state.skills.splice(index, 1, payload);
  }
};
