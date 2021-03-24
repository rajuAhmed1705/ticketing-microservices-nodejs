export const state = () => ({
    skills: []
});

export const getters = {
    skills: state => state.skills
};

export const actions = {
  async loadSkill({commit}){

    let res = await this.$axios.get("/employee-management/skill")
    if(res.status == 200){
      commit("SET_SKILL",res.data)
    }
  },
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
  SET_SKILL(state,payload){
    state.skills = payload
  },
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
