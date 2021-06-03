<template>
  <div id="main">
    <transition name="flip" mode="out-in">
      <div v-if="!usePhone" class="pageSide" key="emailForm">
        <MazInput
          v-model="email"
          placeholder="E-mail"
          autocomplete="email"
          left-icon-name="email"
          class="maz-mb-2"
          :color=validateEmail()
          clearable
        />
        <PassNBtns loginMethod="phone" @flip="usePhone = !usePhone" @auth="auth" />
      </div>
      <div v-else class="pageSide" key="phoneForm" >
        <MazPhoneNumberInput 
          v-model="phone" 
          default-country-code="RU" 
          no-country-selector 
          autocomplete="tel"
          class="maz-mb-2"
          left-icon-name="phone"
          clearable
        />
        <PassNBtns loginMethod="email" @flip="usePhone = !usePhone" @auth="auth" />
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import { MazInput, MazPhoneNumberInput } from 'maz-ui';
import PassNBtns from './PassNBtns.vue';

export default {
  name: 'Login',
  components: {
    MazInput,
    MazPhoneNumberInput,
    PassNBtns
  },
  data() {
    return {
      usePhone: false,
      email: '',
      phone: '',
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    validateEmail() {
      if (this.reg.test(this.email)) {
        return 'success'
      } else {
        return 'primary'
      }
    },
    async auth(pass) {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/api/login",
        withCredentials: true,
        responseType: 'arraybuffer',
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          login: this.usePhone ? this.phone : this.email,
          pass: pass
        }
      }).then((response) => {
        var bytes = new Uint8Array(response.data);
        var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
        this.src = "data:image/jpeg;base64," + btoa(binary);
        this.$emit('auth', this.src)
      });
    }
  },
  mounted() {
    this.auth()
  }
}
</script>

<style scoped>
  .flip-enter-active {
    transition: all 0.4s ease;
  }
  
  .flip-enter, .flip-leave {
    transform: perspective(1000px) rotateY(180deg);
    opacity: 0;
  }
</style>