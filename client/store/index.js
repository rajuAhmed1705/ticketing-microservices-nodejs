export const state = () => ({
  employees: []
});

export const getters = {
  employees: state => state.employees,
};

export const actions = {
  async loadEmployee({commit}){
    let res = await this.$axios.get("/employee-management/employees")
    console.log(res.data)
    console.log(res.data.religion)
    commit("SET_EMPLOYEE",res.data)
  },
  async addEmployee({ commit }, employee) {
    commit("ADD_EMPLOYEE", employee);
  },
  async removeEmployee({ commit }, id) {
    commit("REMOVE_EMPLOYEE", id);
  },
  async updateEmployee({ commit }, employee) {
    commit("UPDATE_EMPLOYEE", employee);
  }
};

export const mutations = {
  SET_EMPLOYEE(state,payload){
    state.employees = payload
  },
  ADD_EMPLOYEE(state, payload) {
    state.employees.push(payload);
  },
  REMOVE_EMPLOYEE(state, payload) {
    state.employees = state.employees.filter(employee => {
      employee.employeeInformation.employeeId !== payload;
      console.log(employee.employeeInformation.employeeId);
      console.log("payload", payload);
    });
  },
  UPDATE_EMPLOYEE(state, payload) {
    const employee = state.employees.find(
      employee => employee.id == payload.id
    );
    const index = state.employees.indexOf(employee);
    state.employees.splice(index, 1, payload);
  }
};






