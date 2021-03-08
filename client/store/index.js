export const state = () => ({
  employees: [
    {
      personalDetails: {
        fullName: "Raju"
      },
      employeeInformation: {
        employeeId: "123",
        department: "IT",
        designation: "software engineer",
        unit: "shurjoERP",
        team: "ERP",
        employmentType: "fulltime",
        project: "shurjoERP",
        dateOfJoin: "2021-2-1",
        reportingTo: "Rock",
        jobLocation: "Dhaka"
      }
    }
  ]
});

export const getters = {
  employees: state => state.employees,
};

export const actions = {
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






