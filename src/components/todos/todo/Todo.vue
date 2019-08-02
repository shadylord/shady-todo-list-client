<template>
  <div class="col-12 col-md-4 col-sm-6 mb-3">
    <div class="card border-primary">
      <div class="card-header">Created at {{ todo.createdAt | dateToString }}</div>
      <div class="card-body">
        <h4 class="card-title">{{ todo.title }}</h4>

        <h6 class="card-subtitle mb-2 text-muted">@{{ todo.author }}</h6>

        <hr />

        <p class="card-text">{{ todo.todo }}</p>

        <hr />

        <div class="float-right">
          <router-link
            tag="button"
            v-bind:to="'/todos/edit/' + todoIndex + '/' + todo.id"
            class="btn btn-warning btn-sm mr-2"
          >Edit</router-link>
          <button v-on:click="deleteTodoByID" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["todo", "todoIndex"],
  filters: {
    dateToString: function(value) {
      return new Date(value).toDateString();
    }
  },
  methods: {
    ...mapActions(["deleteTodo"]),
    deleteTodoByID: function() {
      this.deleteTodo(this.todo.id, this.todoIndex);
    }
  }
};
</script>

<style scoped>
</style>
