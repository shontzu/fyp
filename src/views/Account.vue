<template>
  <div>
    <header class="navbar navbar-light bg-warning">
      <img
        src="../assets/Account.png"
        alt="Account"
        style="width: 40%; height: auto"
      />
    </header>
    <button type="button" class="btn btn-outline-success" @click="login()">Login</button>
    <button type="button" class="btn btn-outline-danger" @click="logout()">Logout</button>
  </div>
</template>

<script>
import * as authentication from "../auth-me.js";

export default {
  name: "Account",
  methods: {
    logout() {
      authentication
        .logout()
        .then(() => alert("signed out succesfully"))
        .catch((error) => alert("sign out failed" + error))
        console.log(authentication.logout)
    },
    login(){
      authentication
      .tryToAuth()
      .then(() => alert("signed in succesfully"))
      .catch((error) => alert("signed in failed" + error))
      console.log(authentication.loggedIn)
    }
  },
};
</script>

<style scoped>
</style>