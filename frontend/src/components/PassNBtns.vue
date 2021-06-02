<template>
  <div>
    <MazInput
      v-model="pass"
      placeholder="Password"
      type="password"
      autocomplete="new-password"
      left-icon-name="lock"
      class="maz-mb-2"
      clearable
    />
    <MazBtn 
      v-on:click="$emit('auth', pass)"
      class="maz-btn--mini maz-mr-2 maz-mt-2"
    >
      Login
    </MazBtn>
    <MazBtn
      v-on:click="$emit('flip')"
      class="maz-btn--mini maz-ml-2 maz-mt-2 maz-btn--default"
    >
      Use {{loginMethod}} to login
    </MazBtn>
  </div>
</template>

<script>
import { MazInput, MazBtn } from 'maz-ui';

export default {
  name: 'Login',
  components: {
    MazInput,
    MazBtn
  },
  data() {
    return {
      pass: ''
    }
  },
  methods: {
    auth() {
      this.$emit('auth', this.pass)
    }
  },
  props: {
    loginMethod: String
  }
}
</script>
