<template>
  <div>
    <h4>Todos</h4>
    <hr />

    <div class="row justify-content-center">
      <Loading v-if="doLoading"></Loading>

      <Todo
        v-else-if="!doLoading && todos.length > 0"
        v-for="(todo, index) in todos"
        :key="todo.id"
        v-bind:todo="todo"
        v-bind:todoIndex="index"
      ></Todo>

      <p v-else>There is no todo yet, please add one.</p>
    </div>

    <br />
  </div>
</template>

<script>
import Todo from "./todo/Todo.vue";
import Loading from "../loading/Loading.vue";

import { mapState, mapActions } from "vuex";

export default {
  components: {
    Todo,
    Loading
  },
  created() {
    this.$store.dispatch("loadTodos");
  },
  computed: {
    ...mapState(["todos", "doLoading"])
  },
  methods: {}
};
</script>