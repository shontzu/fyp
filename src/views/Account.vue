<template>
  <div>
    <h1>Account</h1>
    <hr />
    <!-- register / login / logout -->
    <h2 @click="content = 1">
      <div v-if="(login = true)">LOGOUT</div>
      <!-- <div>></div> -->
    <!-- </h2> -->
    <!-- <h2 @click="content = 1"> -->
      <div v-else>LOGIN</div>
      <!-- <div>></div> -->
    </h2>
    <hr />
    <!-- change username / password -->
    <h2 @click="content = 3">
      <div>SETTING</div>
      <div>></div>
    </h2>
    <hr />
    <!-- FYP details -->
    <h2 @click="content = 4">
      <div>FAQ</div>
      <div>></div>
    </h2>
    <hr />
    <Login v-if="content == 1" />
    <Setting v-if="content == 3" />
    <Faq v-if="content == 4" />
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import Setting from "../components/Setting.vue";
import Faq from "../components/Faq.vue";

export default {
  name: "Account",
  data: function () {
    return {
      content: 0,
      // login: process.env.login,
    };
  },
  components: {
    Login,
    Setting,
    Faq,
  },
};
</script>

<style scoped>
h2 {
  margin-left: 20%;
  margin-right: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>