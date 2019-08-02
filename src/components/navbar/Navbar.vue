<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link tag="a" to="/" class="navbar-brand">Todo List</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <router-link tag="li" to="/add" exact-active-class="active" class="nav-item">
            <a class="nav-link">Add Todo</a>
          </router-link>

          <router-link tag="li" to="/todos" exact-active-class="active" class="nav-item">
            <a class="nav-link">Todos</a>
          </router-link>

          <router-link tag="li" to="/about" exact-active-class="active" class="nav-item">
            <a class="nav-link">About</a>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
