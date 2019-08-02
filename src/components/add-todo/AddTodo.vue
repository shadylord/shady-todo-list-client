<template>
  <div>
    <h4>Add Todo</h4>
    <hr />

    <div class="row justify-content-center">
      <!-- lakukan loading jika data sudah disubmitted -->
      <div v-if="doLoading" class="col-12 col-sm-6 col-md-8">
        <Loading></Loading>
      </div>

      <!-- selain itu tampilkan form -->
      <div v-else class="col-12 col-sm-6 col-md-8">
        <AlertSuccess v-if="showAlert" v-bind:message="'Todo was created successfully!'"></AlertSuccess>

        <form v-on:submit.prevent="addNewTodo" class="mt-3">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              v-model="newTodo.title"
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
                v-if="!$v.newTodo.title.required"
              >Title is required</small>

              <small
                id="errorTitle"
                class="form-text text-danger"
                v-if="!$v.newTodo.title.maxLength"
              >Title max characters are 255!</small>
            </div>
          </div>

          <div class="form-group">
            <label for="todo">Todo</label>
            <input
              v-model="newTodo.todo"
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
                v-if="!$v.newTodo.todo.required"
              >Todo is required</small>

              <small
                id="errorTodo"
                class="form-text text-danger"
                v-if="!$v.newTodo.todo.maxLength"
              >Todo max characters are 255!</small>
            </div>
          </div>

          <div class="form-group">
            <label for="author">Author</label>
            <input
              v-model="newTodo.author"
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
                v-if="!$v.newTodo.author.required"
              >Author is required</small>

              <small
                id="errorTodo"
                class="form-text text-danger"
                v-if="!$v.newTodo.author.maxLength"
              >Author max characters are 255!</small>
            </div>
          </div>

          <button type="submit" class="btn btn-primary float-right">Add Todo</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

import Loading from "../loading/Loading.vue";
import AlertSuccess from "../alert/AlertSuccess.vue";

export default {
  data() {
    return {
      newTodo: {
        title: "",
        todo: "",
        author: ""
      }
    };
  },
  validations: {
    newTodo: {
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
    ...mapActions(["addTodo", "setSubmitted"]),

    addNewTodo() {
      // set submitted menadi true agar vuelidate bisa bekerja

      this.setSubmitted(true);

      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      // add todo, lalu ubah submitted menjadi false agar saat form empty
      // pesan error tidak muncul

      this.addTodo(this.newTodo);
      this.setSubmitted(false);

      // buat form menjadi empty

      this.newTodo.title = "";
      this.newTodo.todo = "";
      this.newTodo.author = "";
    }
  },
  computed: {
    ...mapState(["doLoading", "submitted", "showAlert"])
  },
  components: {
    Loading,
    AlertSuccess
  }
};
</script>