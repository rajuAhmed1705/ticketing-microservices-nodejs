export const strict = false
export const state = () => ({
  employees: []
});

export const getters = {
  employees: state => state.employees,
};

export const actions = {
  // async loadDepartment(){
  //   let res = await this.$axios.get("/employee-management/department")
  //   console.log(res.data)
  // },
  async loadEmployee({commit}){
    let res = await this.$axios.get("/employee-management/employees")
    // console.log(res.data)
    if(res.status == 200){
      commit("SET_EMPLOYEE",res.data)
    }
  },
  async addEmployee({ commit }, employee) {
    console.log("New:")
    let res = await this.$axios.post("/employee-management/employee",employee)
    console.log(res.data)
    if(res.status == 201){
    commit("ADD_EMPLOYEE", res.data);
    this.$notifier.showMessage({ content: "Congrats!Successfully added one value!", color: "green" });
    }
    else{
      this.$notifier.showMessage({ content: "Something went wrong ☹", color: "red" });
    }
  },
  async removeEmployee({ commit }, id) {
    console.log("deleted")
    let res = await this.$axios.delete(`/employee-management/employee/${id}`)
    console.log(res.data)
    if(res.status == 200){
    commit("REMOVE_EMPLOYEE", id);
    this.$notifier.showMessage({ content: "Congrats!Successfully deleted one value!", color: "red" });
    }else{
      this.$notifier.showMessage({ content: "Something went wrong ☹", color: "red" });
    }
  },
   async updateEmployee({ commit }, employee) {
    console.log("Updated:")
    let res = await this.$axios.put(`/employee-management/employee/${employee.id}`,employee)
    console.log(res.data)
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
    state.employees = state.employees.filter(employee => 
      employee.id !== payload
    );
  },
  UPDATE_EMPLOYEE(state, payload) {
    const employee = state.employees.find(
      employee => employee.id == payload.id
    );
    const index = state.employees.indexOf(employee);
    state.employees.splice(index, 1, payload);
  }
};






