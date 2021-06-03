<template>
  <div>
    <img id="logo" src="./assets/logo.png">
    <div class="pageSide" v-if="loggedin">
      <img id="meme" :src="image">
      <MazBtn 
        class="maz-btn--mini"
        @click="logout"
      >
        Logout
      </MazBtn>
    </div>
    <Login v-else id="login" @auth="auth" />
  </div>
</template>

<script>
import axios from 'axios';
import Login from './components/Login.vue'
import { MazBtn } from 'maz-ui';

export default {
  name: 'App',
  components: {
    Login,
    MazBtn
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
        history.pushState(
          {},
          'logged in'
        )
      }
    },
    logout() {
      axios.post('http://127.0.0.1:3000/api/logout').then(() => {
        this.loggedin = false
        history.pushState(
          {},
          'logged out'
        )
      });
    }
  }
}
</script>

<style>
body {
  background-color: #343a40;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#logo {
  width: 100px;
  padding: 50px;
  margin: auto;
  display: block;
  border-radius: 50%;
}

#meme {
  width: 100%;
  margin-bottom: 3em;
}

.pageSide {
  padding: 1.5rem;
  background-color: #FFF;
  border-radius: .3rem;
  text-align: center;
  max-width: 600px;
  margin: auto;
}

@media screen and (max-width: 600px) {
  
}
</style>
