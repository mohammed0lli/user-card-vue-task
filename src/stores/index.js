import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      employee: [
        {
          id: "1",
          firstName: "Sammy",
          lastName: "Sad ali",
          birthdate: "1999/9/12",
          phoneNumber: "0775648837",
          country: "Iraq",
          city: "Baghdad",
          bloodType: "O+",
        },
      ],
      lastId: 1,
    };
  },
  mutations: {
    setEmployee(state, payload) {
      const index = state.employee.findIndex((emp) => emp.id === payload.id);
      if (index !== -1) {
        state.employee[index] = { ...state.employee[index], ...payload };
      } else {
        state.employee.push(payload);
      }
    },

    setNewId(state, payload) {
      state.lastId = payload;
    },

    deleteEmployee(state, employeeId) {
      state.employee = state.employee.filter((emp) => emp.id !== employeeId);
    },
  },
  actions: {
    updateEmployee({ commit }, employee) {
      commit("setEmployee", employee);
    },
    updateSetNewId({ commit }, lastId) {
      commit("setNewId", lastId);
    },
    deleteEmployee({ commit }, employeeId) {
      commit("deleteEmployee", employeeId);
    },
  },
  getters: {
    employee(state) {
      return state.employee;
    },
    lastId(state) {
      return state.lastId;
    },
  },
});

export default store;
