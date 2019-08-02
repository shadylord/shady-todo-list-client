<template>
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    {{ message }}
    <router-link tag="a" to="/todos" class="alert-link">Click here to see todos</router-link>

    <button v-on:click="hideAlert" type="button" class="close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["message"],
  methods: {
    ...mapActions(["setShowAlert"]),
    hideAlert: function() {
      this.setShowAlert(false);
    }
  }
};
</script>
