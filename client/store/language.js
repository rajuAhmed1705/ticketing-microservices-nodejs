export const state = () => ({
    languages: [
    { 
      id:1,
      languageName:'Bangla'
    }
  ]
  
});

export const getters = {
    languages: state => state.languages
};

export const actions = {
  // async fetchRule({commit}){
  //     commit("SET_RULE")
  // },
  async addLanguage({ commit }, languageName) {
    commit("ADD_LANGUAGE", languageName);
  },
  async removeLanguage({ commit }, id) {
    commit("REMOVE_LANGUAGE", id);
  },
  async updateLanguage({ commit },languageName) {
    commit("UPDATE_LANGUAGE",languageName);
  }
};

export const mutations = {
    ADD_LANGUAGE(state, payload) {
    state.languages.push(payload);
  },
  REMOVE_LANGUAGE(state, payload) {
    state.languages = state.languages.filter(langtype => {
        langtype.id !== payload;
    });
  },
  UPDATE_LANGUAGE(state, payload) {
    const languagetype = state.languages.find(
        langtype => langtype.name == payload.name
    );
    const index = state.languages.indexOf(languagetype);
    state.languages.splice(index, 1, payload);
  }
};
