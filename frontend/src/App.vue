<template>
  <div>
    <img id="logo" src="./assets/logo.png">
    <div class="pageSide" v-if="loggedin">
      <img :src="image" >
    </div>
    <Login v-else id="login" @auth="auth" />
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
      loggedin: false,
    }
  },
  methods: {
    auth(image) {
      if (image) {
        this.loggedin = true
        this.image = image
      }
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

#logo {
  width: 100px;
  padding: 50px;
  margin: auto;
  display: block;
  border-radius: 50%;
}

.pageSide {
  padding: 1.5rem;
  background-color: #FFF;
  border-radius: .3rem;
  text-align: center;
}
</style>
