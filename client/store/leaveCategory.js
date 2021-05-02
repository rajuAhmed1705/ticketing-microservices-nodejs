export const state = () => ({
  categories: [],
});

export const getters = {
  categories: (state) => state.categories,
};

export const actions = {
  async loadCategory({ commit }) {
    let res = await this.$axios.get('/leave/category');
    if (res.status == 200) {
      commit('SET_CATEGORY', res.data);
    } else {
      this.$notifier.showMessage({
        content: 'Something went wrong!',
        color: 'red',
      });
    }
  },
  async addCategory({ commit }, category) {
    let res = await this.$axios.post('/leave/category', category);

    if (res.status == 201) {
      commit('ADD_CATEGORY', res.data);
      this.$notifier.showMessage({
        content: 'Congrats!Successfully added new leave category!',
        color: 'success',
      });
    } else {
      this.$notifier.showMessage({
        content: 'Something went wrong!',
        color: 'red',
      });
    }
  },
  async removeCategory({ commit }, id) {
    let res = await this.$axios.delete(`/leave/category/${id}`);
    if (res.status == 200) {
      commit('REMOVE_CATEGORY', id);
      this.$notifier.showMessage({
        content: 'Congrats!Successfully deleted one category!',
        color: 'red',
      });
    } else {
      this.$notifier.showMessage({
        content: 'Something went wrong!',
        color: 'red',
      });
    }
  },
  async updateCategory({ commit }, category) {
    let res = await this.$axios.put(`/leave/category/${category.id}`, category);

    if (res.status == 200) {
      commit('UPDATE_CATEGORY', category);
      this.$notifier.showMessage({
        content: `Congrats!Successfully updated one ${category}!`,
        color: 'warning',
      });
    } else {
      this.$notifier.showMessage({
        content: 'Something went wrong!',
        color: 'red',
      });
    }
  },
};

export const mutations = {
  SET_CATEGORY(state, payload) {
    state.categories = payload;
  },
  ADD_CATEGORY(state, payload) {
    // console.log(payload)
    state.categories.push(payload);
  },

  REMOVE_CATEGORY(state, payload) {
    // console.log(payload)
    state.categories = state.categories.filter(
      (category) => category.id !== payload
    );
  },
  UPDATE_CATEGORY(state, payload) {
    const category = state.categories.find(
      (category) => category.id === payload.id
    );
    const index = state.categories.indexOf(category);
    state.categories.splice(index, 1, payload);
  },
};
