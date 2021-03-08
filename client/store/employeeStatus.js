export const state = () => ({
    employeestatus: []
    
  });
  
  export const getters = {
    employeestatus: state => state.employeestatus
  };
  
  export const actions = {
    async loadEmpstatus({commit}){
      let res = await this.$axios.get("/employee-management/employee-status")
      if(res.status == 200){
        commit("LOAD_EMPSTATUS",res.data)
      }
    },
    async addEmpSts({ commit }, employeeStatus) {
      let res = await this.$axios.post("/employee-management/employee-status",employeeStatus)
      console.log(res.data)
      if(res.status == 201){
      commit("ADD_EMP_STS", employeeStatus);
      }
    },
    async removeEmpSts({ commit }, id) {
      let res = await this.$axios.delete(`/employee-management/employee-status/${id}`)
      if(res.status == 200){
      commit("REMOVE_EMP_STS", id);
      }
    },
    async updateEmpSts({ commit }, employeeStatus) {
      let res = await this.$axios.put(`/employee-management/employee-status/${employeeStatus.id}`,employeeStatus)
      if(res.status == 200){
      commit("UPDATE_EMP_STS", employeeStatus);
      }
    }
  };
  
  export const mutations = {
    LOAD_EMPSTATUS(state,payload){
      state.employeestatus = payload
    },
    ADD_EMP_STS(state, payload) {
      state.employeestatus.push(payload);
    },
    REMOVE_EMP_STS(state, payload) {
      state.employeestatus = state.employeestatus.filter(empstatus => {
        empstatus.id !== payload;
        
      });
    },
    UPDATE_EMP_STS(state, payload) {
      const empstatus = state.employeestatus.find(
        empstatus => empstatus.id == payload.id
      );
      const index = state.employeestatus.indexOf(empstatus);
      state.employeestatus.splice(index, 1, payload);
    }
  };
  
  
  
  