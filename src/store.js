import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    doLoading: false,
    submitted: false,
    showAlert: false,
    todos: [],
    todo: {}
  },
  getters: {},
  mutations: {
    SET_LOADING(state, value) {
      state.doLoading = value;
    },
    SET_SUBMITTED(state, value) {
      state.submitted = value;
    },
    SET_ALERT(state, value) {
      state.showAlert = value;
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    DELETE_TODO(state, index) {
      state.todos.splice(index, 1);
    },
    SET_TODO(state, todo) {
      state.todo = todo;
    },
    UPDATE_TODO(state, index, newTodo) {
      state.todos[index] = newTodo;
    }
  },
  actions: {
    setSubmitted({ commit }, value) {
      commit("SET_SUBMITTED", value);
    },
    setShowAlert({ commit }, value) {
      commit("SET_ALERT", value);
    },
    loadTodos({ commit }) {
      commit("SET_LOADING", true);
      commit("SET_ALERT", false);

      axios
        .get("https://shady-todo-list-backend.herokuapp.com/api/todos")
        .then(todos => {
          commit("SET_TODOS", todos.data.todo);
          commit("SET_LOADING", false);
        });
    },
    addTodo({ commit }, todo) {
      commit("SET_LOADING", true);
      commit("SET_SUBMITTED", true);

      axios
        .post("https://shady-todo-list-backend.herokuapp.com/api/todos", {
          ...todo
        })
        .then(() => {
          commit("ADD_TODO", todo);
          commit("SET_LOADING", false);
          commit("SET_ALERT", true);
          commit("SET_SUBMITTED", false);
        });
    },
    deleteTodo({ commit }, id, index) {
      commit("SET_LOADING", true);

      axios
        .delete(`https://shady-todo-list-backend.herokuapp.com/api/todos/${id}`)
        .then(() => {
          commit("DELETE_TODO", index);
          commit("SET_LOADING", false);
        });
    },
    setTodo({ commit }, id) {
      commit("SET_LOADING", true);

      axios
        .get(`https://shady-todo-list-backend.herokuapp.com/api/todos/${id}`)
        .then(todo => {
          commit("SET_TODO", todo.data.todo);
          commit("SET_LOADING", false);
        });
    },
    updateTodoByID({ commit }, newTodo, index) {
      commit("SET_LOADING", true);
      commit("SET_ALERT", false);

      axios
        .patch(
          `https://shady-todo-list-backend.herokuapp.com/api/todos/${
            newTodo.id
          }`,
          newTodo
        )
        .then(() => {
          commit("UPDATE_TODO", index, newTodo);
          commit("SET_LOADING", false);
          commit("SET_ALERT", true);
        });
    }
  }
});
