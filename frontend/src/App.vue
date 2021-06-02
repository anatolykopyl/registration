<template>
  <div>
    <img src="./assets/logo.png">
    <h2 v-if="loggedin">
      Прикол
    </h2>
    <Login v-else id="login" />
  </div>
</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  },
  data() {
    return {
      loggedin: false
    }
  }
}
</script>

<style>
body {
  background-color: #343a40;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 100px;
  padding: 50px;
  margin: auto;
  display: block;
  border-radius: 50%;
}
</style>
