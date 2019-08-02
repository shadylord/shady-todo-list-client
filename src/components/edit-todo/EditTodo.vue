<template>
  <div>
    <h4>Update Todo</h4>
    <hr />

    <div class="row justify-content-center">
      <!-- lakukan loading jika data sudah disubmitted -->
      <div v-if="doLoading" class="col-12 col-sm-6 col-md-8">
        <Loading></Loading>
      </div>

      <!-- selain itu tampilkan form -->
      <div v-else class="col-12 col-sm-6 col-md-8">
        <AlertSuccess v-if="showAlert" v-bind:message="'Todo was updated successfully!'"></AlertSuccess>

        <form v-on:submit.prevent="updateTodo" class="mt-3">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              v-model="todo.title"
              type="text"
              class="form-control"
              id="title"
              placeholder="Enter todo title"
            />

            <!-- error handler untuk title -->
            <div v-if="submitted">
              <small
                id="errorTitle"
                class="form-text text-danger"
                v-if="!$v.todo.title.required"
              >Title is required</small>

              <small
                id="errorTitle"
                class="form-text text-danger"
                v-if="!$v.todo.title.maxLength"
              >Title max characters are 255!</small>
            </div>
          </div>

          <div class="form-group">
            <label for="todo">Todo</label>
            <input
              v-model="todo.todo"
              type="text"
              class="form-control"
              id="todo"
              placeholder="Enter todo"
            />

            <!-- error handler untuk todo -->
            <div v-if="submitted">
              <small
                id="errorTodo"
                class="form-text text-danger"
                v-if="!$v.todo.todo.required"
              >Todo is required</small>

              <small
                id="errorTodo"
                class="form-text text-danger"
                v-if="!$v.todo.todo.maxLength"
              >Todo max characters are 255!</small>
            </div>
          </div>

          <div class="form-group">
            <label for="author">Author</label>
            <input
              v-model="todo.author"
              type="text"
              class="form-control"
              id="author"
              placeholder="Enter todo author"
            />

            <!-- error handler untuk todo -->
            <div v-if="submitted">
              <small
                id="errorTodo"
                class="form-text text-danger"
                v-if="!$v.todo.author.required"
              >Author is required</small>

              <small
                id="errorTodo"
                class="form-text text-danger"
                v-if="!$v.todo.author.maxLength"
              >Author max characters are 255!</small>
            </div>
          </div>

          <button type="submit" class="btn btn-primary float-right">Update Todo</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

import axios from "axios";

import Loading from "../loading/Loading.vue";
import AlertSuccess from "../alert/AlertSuccess.vue";

export default {
  data() {
    return {};
  },
  validations: {
    todo: {
      title: {
        required,
        maxLength: maxLength(255)
      },
      todo: {
        required,
        maxLength: maxLength(255)
      },
      author: {
        required,
        maxLength: maxLength(255)
      }
    }
  },
  methods: {
    ...mapActions(["setSubmitted", "updateTodoByID"]),

    updateTodo() {
      // set submitted menadi true agar vuelidate bisa bekerja

      this.setSubmitted(true);

      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      // add todo, lalu ubah submitted menjadi false agar saat form empty
      // pesan error tidak muncul

      const newTodo = { ...this.todo };

      this.updateTodoByID(newTodo, this.$route.params.index);
      this.setSubmitted(false);

      // kembali ke halaman todos

      //   this.$router.push("/todos");
    }
  },
  computed: {
    ...mapState(["doLoading", "submitted", "todo", "showAlert"])
  },
  components: {
    Loading,
    AlertSuccess
  },
  created() {
    this.$store.dispatch("setTodo", this.$route.params.id);
  }
};
</script>
